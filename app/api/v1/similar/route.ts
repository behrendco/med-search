import { openai } from "@ai-sdk/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from 'zod';

const TEMPLATE = `
You are a world class medical professional and academic.

You specialize in taking a health related question/query from a user, and helping the user generate related questions,
based on the original question. Please identify worthwhile topics that can be follow-ups, and write 3 questions no longer than 20 words each. 
Please make sure that specifics, like events, names, locations, are included in follow up questions so they can be asked standalone. 
For example, if the original question asks about a specific author, in the follow up question, do not just say "the author", 
but use the full name provided in the original query. Your related questions must be in the same language as the original question.

I will give you a question, and you will create 3 related questions as a JSON array of 3 strings. 
Do NOT repeat the original question. ONLY return the JSON array, I will get fired if you don't return JSON.

Here is the user's original question:
{query}
`;

export async function POST(req: Request) {
    if (req.method !== "POST") return NextResponse.json({ error: "Error: Not allowed" }, { status: 405 });

    try {
        const body = await req.json();
        const query = body.prompt;

        const model = openai("gpt-4o", { structuredOutputs: true });

        const promptTemplate = PromptTemplate.fromTemplate(TEMPLATE);
        const prompt = await promptTemplate.format({ query: query });

        const result = await generateObject({
          model,
          schemaName: 'questions',
          schemaDescription: 'A list of questions.',
          schema: z.object({
            questions: z.array(z.string()),
          }),
          prompt,
        });

        return NextResponse.json({ result }, { status: 200 });
    } catch (e) {
        return NextResponse.json({ error: `Error: ${e instanceof Error ? e.message : "Unknown Error"}` }, { status: 500 });
    }
}