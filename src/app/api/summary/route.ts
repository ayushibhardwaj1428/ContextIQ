import { GoogleGenerativeAI }
  from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
  );

export async function POST(
  request: Request
) {
  try {
    const { context } =
      await request.json();

    const model =
      genAI.getGenerativeModel({
        model:
          "gemini-2.5-flash",
      });

    const prompt = `
Generate a concise summary
of this document.

Rules:
- Maximum 3 lines
- Easy to understand
- Focus on key information

DOCUMENT:

${context}
`;

    const result =
      await model.generateContent(
        prompt
      );

    return Response.json({
      summary:
        result.response.text(),
    });
  } catch {
    return Response.json(
      {
        summary:
          "Unable to generate summary.",
      },
      {
        status: 500,
      }
    );
  }
}