import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { question, context } = await request.json();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a context-aware AI assistant.

Rules:
- Use only the provided context.
- Never make assumptions.
- If the question requires information that is not present in the context, explain what information is missing.
- If the answer cannot be determined, say so clearly.
- Be concise.
- Prefer bullet points.
- Prefer tables when comparing.
- Maximum 150 words.
- For recommendation questions, end with:
  Verdict: Yes / No / Maybe

CONTEXT:
${context}

QUESTION:
${question}
`;

    console.log("API Key Exists:", !!process.env.GEMINI_API_KEY);

    const result = await model.generateContent(prompt);

    const response = result.response.text();

    return Response.json({
      answer: response,
    });
  } catch (error) {
  console.error(error);

  return Response.json(
    {
      answer:
        "The AI service is temporarily unavailable. Please try again in a few moments.",
    },
    {
      status: 500,
    }
  );
}
}
