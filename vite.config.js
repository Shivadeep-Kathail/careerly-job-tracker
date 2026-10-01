import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev-only plugin: handles /api/gemini locally so `npm run dev` works
// without needing `vercel dev`. In production, Vercel serves api/gemini.js.
function geminiDevProxy() {
  let apiKey = ''

  return {
    name: 'gemini-dev-proxy',
    configResolved(config) {
      const env = loadEnv(config.mode, config.root, '')
      apiKey = env.GEMINI_API_KEY || ''
    },
    configureServer(server) {
      server.middlewares.use('/api/gemini', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          return res.end(JSON.stringify({ error: 'Method not allowed' }))
        }

        if (!apiKey) {
          res.statusCode = 500
          return res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not set in .env.local' }))
        }

        // Read request body
        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        const body = JSON.parse(Buffer.concat(chunks).toString())

        const { resumeText, jobDescription } = body || {}
        if (!resumeText || !jobDescription) {
          res.statusCode = 400
          return res.end(JSON.stringify({ error: 'Both resumeText and jobDescription are required' }))
        }

        const prompt = `Compare this resume against this job description. Return ONLY valid JSON with no markdown formatting, no code fences, no explanation — just the raw JSON object:
{ "matchScore": <number 0-100>, "strengths": [<string>, ...] (max 5), "gaps": [<string>, ...] (max 5) }

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`

        try {
          const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
              }),
            }
          )

          if (!response.ok) {
            const errBody = await response.text()
            console.error('Gemini API error:', response.status, errBody)
            res.statusCode = 502
            return res.end(JSON.stringify({ error: 'Gemini API request failed', detail: errBody }))
          }

          const data = await response.json()
          const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
          const cleaned = rawText.replace(/```json\s*/gi, '').replace(/```\s*/g, '').trim()
          const result = JSON.parse(cleaned)

          if (typeof result.matchScore !== 'number' || !Array.isArray(result.strengths) || !Array.isArray(result.gaps)) {
            res.statusCode = 502
            return res.end(JSON.stringify({ error: 'Unexpected response shape', raw: rawText }))
          }

          result.matchScore = Math.max(0, Math.min(100, Math.round(result.matchScore)))
          result.strengths = result.strengths.slice(0, 5)
          result.gaps = result.gaps.slice(0, 5)

          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        } catch (err) {
          console.error('Gemini proxy error:', err)
          res.statusCode = 500
          res.end(JSON.stringify({ error: 'Internal server error', message: err.message }))
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), geminiDevProxy()],
})
