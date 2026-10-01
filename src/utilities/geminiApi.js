/**
 * Calls the /api/gemini serverless function to compare
 * a resume against a job description.
 *
 * @param {string} resumeText  - Extracted resume text
 * @param {string} jobDescription - Job description text
 * @returns {Promise<{ matchScore: number, strengths: string[], gaps: string[] }>}
 */
export async function checkMatch(resumeText, jobDescription) {
  const response = await fetch("/api/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resumeText, jobDescription }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(
      errData.error || `Match check failed (status ${response.status})`
    );
  }

  const result = await response.json();

  // Defensive validation
  if (
    typeof result.matchScore !== "number" ||
    !Array.isArray(result.strengths) ||
    !Array.isArray(result.gaps)
  ) {
    throw new Error("Received an invalid response from the match service.");
  }

  return result;
}
