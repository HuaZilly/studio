'use server';
/**
 * @fileOverview A code description generator AI agent.
 *
 * - generateCodeDescription - A function that handles the code description generation process.
 * - GenerateCodeDescriptionInput - The input type for the generateCodeDescription function.
 * - GenerateCodeDescriptionOutput - The return type for the generateCodeDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateCodeDescriptionInputSchema = z.object({
  codeSnippet: z.string().describe('The code snippet to generate a description for.'),
  language: z.string().describe('The programming language of the code snippet.'),
});
export type GenerateCodeDescriptionInput = z.infer<typeof GenerateCodeDescriptionInputSchema>;

const GenerateCodeDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated description for the code snippet.'),
});
export type GenerateCodeDescriptionOutput = z.infer<typeof GenerateCodeDescriptionOutputSchema>;

export async function generateCodeDescription(input: GenerateCodeDescriptionInput): Promise<GenerateCodeDescriptionOutput> {
  return generateCodeDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCodeDescriptionPrompt',
  input: {
    schema: z.object({
      codeSnippet: z.string().describe('The code snippet to generate a description for.'),
      language: z.string().describe('The programming language of the code snippet.'),
    }),
  },
  output: {
    schema: z.object({
      description: z.string().describe('The generated description for the code snippet.'),
    }),
  },
  prompt: `You are an AI expert in generating descriptions for code snippets.

You will use the provided code snippet and its language to create a concise and informative description.

Language: {{{language}}}
Code Snippet:
{{{
codeSnippet
}}}

Description:`, // Removed the extra newline character here
});

const generateCodeDescriptionFlow = ai.defineFlow<
  typeof GenerateCodeDescriptionInputSchema,
  typeof GenerateCodeDescriptionOutputSchema
>({
  name: 'generateCodeDescriptionFlow',
  inputSchema: GenerateCodeDescriptionInputSchema,
  outputSchema: GenerateCodeDescriptionOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
