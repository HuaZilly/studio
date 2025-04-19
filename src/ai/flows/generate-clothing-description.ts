'use server';
/**
 * @fileOverview An AI agent that generates engaging and informative descriptions for clothing items.
 *
 * - generateClothingDescription - A function that generates clothing descriptions.
 * - GenerateClothingDescriptionInput - The input type for the generateClothingDescription function.
 * - GenerateClothingDescriptionOutput - The return type for the generateClothingDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateClothingDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the clothing item.'),
  category: z.string().describe('The category of the clothing item (e.g., shirt, pants, dress).'),
  attributes: z.record(z.string(), z.string()).describe('A key-value object containing the attributes of the clothing item (e.g., color, size, material).'),
});
export type GenerateClothingDescriptionInput = z.infer<typeof GenerateClothingDescriptionInputSchema>;

const GenerateClothingDescriptionOutputSchema = z.object({
  description: z.string().describe('A detailed and engaging description of the clothing item.'),
});
export type GenerateClothingDescriptionOutput = z.infer<typeof GenerateClothingDescriptionOutputSchema>;

export async function generateClothingDescription(input: GenerateClothingDescriptionInput): Promise<GenerateClothingDescriptionOutput> {
  return generateClothingDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateClothingDescriptionPrompt',
  input: {
    schema: z.object({
      name: z.string().describe('The name of the clothing item.'),
      category: z.string().describe('The category of the clothing item (e.g., shirt, pants, dress).'),
      attributes: z.record(z.string(), z.string()).describe('A key-value object containing the attributes of the clothing item (e.g., color, size, material).'),
    }),
  },
  output: {
    schema: z.object({
      description: z.string().describe('A detailed and engaging description of the clothing item.'),
    }),
  },
  prompt: `You are a fashion copywriter. Generate an engaging and informative description for the following clothing item:

Name: {{{name}}}
Category: {{{category}}}
Attributes:
{{#each (each attributes)}}
  {{@key}}: {{{this}}}
{{/each}}

Description:`, // Removed 'handlebars'
});

const generateClothingDescriptionFlow = ai.defineFlow<
  typeof GenerateClothingDescriptionInputSchema,
  typeof GenerateClothingDescriptionOutputSchema
>({
  name: 'generateClothingDescriptionFlow',
  inputSchema: GenerateClothingDescriptionInputSchema,
  outputSchema: GenerateClothingDescriptionOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
