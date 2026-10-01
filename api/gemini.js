// Vercel serverless function – thin proxy to Gemini API
// Keeps the API key on the server, never exposed to the browser.

const GEMINI_MODEL = "gemini-3.8-flash";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const { resumeText, jobDescription } = req.body || {};

  if (!resumeText || !jobDescription) {
    return res
      .status(400)
      .json({ error: "Both resumeText and jobDescription are required" });
  }

  const prompt = `Compare this resume against this job description. Return ONLY valid JSON with no markdown formatting, no code fences, no explanation — just the raw JSON object:
{ "matchScore": <number 0-100>, "strengths": [<string>, ...] (max 5), "gaps": [<string>, ...] (max 5) }

RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Gemini API error:", response.status, errBody);
      return res
        .status(502)
        .json({ error: "Gemini API request failed", detail: errBody });
    }

    const data = await response.json();

    // Extract the text from the Gemini response
    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Strip possible markdown code fences
    const cleaned = rawText
      .replace(/```json\s*/gi, "")
      .replace(/```\s*/g, "")
      .trim();

    // Parse the JSON
    const result = JSON.parse(cleaned);

    // Validate shape
    if (
      typeof result.matchScore !== "number" ||
      !Array.isArray(result.strengths) ||
      !Array.isArray(result.gaps)
    ) {
      return res.status(502).json({
        error: "Unexpected response shape from Gemini",
        raw: rawText,
      });
    }

    // Clamp values
    result.matchScore = Math.max(0, Math.min(100, Math.round(result.matchScore)));
    result.strengths = result.strengths.slice(0, 5);
    result.gaps = result.gaps.slice(0, 5);

    return res.status(200).json(result);
  } catch (err) {
    console.error("Gemini proxy error:", err);
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
}
