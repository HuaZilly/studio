'use server';
/**
 * @fileOverview An AI agent that suggests clothing or code snippets based on user preferences and history.
 *
 * - suggestItems - A function that handles the item suggestion process.
 * - SuggestItemsInput - The input type for the suggestItems function.
 * - SuggestItemsOutput - The return type for the suggestItems function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {Product, getProducts} from '@/services/products';

const SuggestItemsInputSchema = z.object({
  userId: z.string().describe('The ID of the user.'),
  purchaseHistory: z
    .array(z.string())
    .describe('An array of product IDs representing the user\'s purchase history.'),
  browsingHistory:
    z.array(z.string()).describe('An array of product IDs representing the user\'s browsing history.'),
});
export type SuggestItemsInput = z.infer<typeof SuggestItemsInputSchema>;

const SuggestItemsOutputSchema = z.array(z.object({
  id: z.string().describe('The ID of the suggested product.'),
  name: z.string().describe('The name of the suggested product.'),
  description: z.string().describe('A short description of the suggested product.'),
  price: z.number().describe('The price of the suggested product.'),
  imageUrl: z.string().describe('The URL of the suggested product image.'),
  category: z.string().describe('The category of the suggested product.'),
  attributes: z.record(z.string()).describe('Additional attributes of the suggested product.'),
}));
export type SuggestItemsOutput = z.infer<typeof SuggestItemsOutputSchema>;

export async function suggestItems(input: SuggestItemsInput): Promise<SuggestItemsOutput> {
  return suggestItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestItemsPrompt',
  input: {
    schema: z.object({
      userId: z.string().describe('The ID of the user.'),
      purchaseHistory:
        z.array(z.string()).describe('An array of product IDs representing the user\'s purchase history.'),
      browsingHistory:
        z.array(z.string()).describe('An array of product IDs representing the user\'s browsing history.'),
    }),
  },
  output: {
    schema: z.array(z.object({
      id: z.string().describe('The ID of the suggested product.'),
      name: z.string().describe('The name of the suggested product.'),
      description: z.string().describe('A short description of the suggested product.'),
      price: z.number().describe('The price of the suggested product.'),
      imageUrl: z.string().describe('The URL of the suggested product image.'),
      category: z.string().describe('The category of the suggested product.'),
      attributes: z.record(z.string()).describe('Additional attributes of the suggested product.'),
    })),
  },
  prompt: `You are a personal shopping assistant. Based on the user's purchase history and browsing history,
you will suggest items that the user might be interested in.  The items can be clothing or code snippets.

User ID: {{{userId}}}
Purchase History: {{#each purchaseHistory}}{{{this}}}, {{/each}}
Browsing History: {{#each browsingHistory}}{{{this}}}, {{/each}}

Suggest up to 5 items.

Return the suggestions as a JSON array.
`,
});

const suggestItemsFlow = ai.defineFlow<
  typeof SuggestItemsInputSchema,
  typeof SuggestItemsOutputSchema
>(
  {
    name: 'suggestItemsFlow',
    inputSchema: SuggestItemsInputSchema,
    outputSchema: SuggestItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);

    // Fetch product details for the suggested item IDs
    const suggestedItems = output || [];

    return suggestedItems!;
  }
);
