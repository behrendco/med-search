import { openai } from "@ai-sdk/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { streamText } from "ai";
import { NextResponse } from "next/server";

const TEMPLATE = `
You are a world class medical professional and academic.

You specialize in taking a health related question/query from a user, and generating a detailed answer to that
question using several given sources (medical research papers) as context.

I will give you a question and sources for you to refer to, and you will create a consise and comprehensive summary of 
the correct answer to that question while adhering to these guidelines:
1. Craft an answer that is detailed, thorough, in-depth, and complex, while maintaining clarity and conciseness.
2. Incorporate main ideas and essential information, eliminating extraneous language and focusing on critical aspects.
3. Rely strictly on the provided text, without including external information.
4. You must write at least 2-4 paragraphs with no surrounding labels, whitespace, or other text.

Here is the question to answer and sources for context:
{query}
`;

export async function POST(req: Request) {
    if (req.method !== "POST") return NextResponse.json({ error: "Error: Not allowed" }, { status: 405 });

    try {
        const body = await req.json();
        const query = body.prompt;

        const model = openai("gpt-4o");

        const promptTemplate = PromptTemplate.fromTemplate(TEMPLATE);
        const prompt = await promptTemplate.format({ query: query });

        const result = streamText({
          model,
          prompt,
        });

        return result.toTextStreamResponse();
    } catch (e) {
        return NextResponse.json({ error: `Error: ${e instanceof Error ? e.message : "Unknown Error"}` }, { status: 500 });
    }
}