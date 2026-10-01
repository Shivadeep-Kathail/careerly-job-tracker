import * as pdfjsLib from "pdfjs-dist";
import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";

// Use the worker bundled in node_modules (Vite resolves the ?url import)
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

/**
 * Extracts all text content from a PDF File object.
 * @param {File} file - A .pdf File from an <input type="file">
 * @returns {Promise<{ text: string, pageCount: number }>}
 * @throws {Error} with user-friendly message on failure
 */
export async function extractTextFromPdf(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const pageCount = pdf.numPages;

  const textParts = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    textParts.push(pageText);
  }

  const fullText = textParts.join("\n\n").trim();

  // Detect scanned / image-only PDFs
  // If the PDF has pages but almost no extractable text, it's likely scanned
  if (!fullText || fullText.replace(/\s/g, "").length < 50) {
    throw new Error(
      "Couldn't extract text from this PDF. It may be a scanned or image-only file — try a different PDF."
    );
  }

  return { text: fullText, pageCount };
}
