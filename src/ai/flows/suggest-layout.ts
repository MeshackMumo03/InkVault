'use server';

/**
 * @fileOverview AI-powered layout suggestion for zines.
 *
 * - suggestLayout - A function that suggests zine layouts based on content.
 * - SuggestLayoutInput - The input type for the suggestLayout function.
 * - SuggestLayoutOutput - The return type for the suggestLayout function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLayoutInputSchema = z.object({
  textContent: z.string().describe('The text content of the zine.'),
  imageCaptions: z.array(z.string()).describe('Captions for the images in the zine.'),
});
export type SuggestLayoutInput = z.infer<typeof SuggestLayoutInputSchema>;

const SuggestLayoutOutputSchema = z.object({
  layoutSuggestions: z.array(
    z.object({
      name: z.string().describe('The name of the layout suggestion.'),
      description: z.string().describe('A description of the layout suggestion.'),
      componentList: z.array(z.string()).describe('A list of the suggested components for the layout')
    })
  ).describe('A list of layout suggestions.'),
});
export type SuggestLayoutOutput = z.infer<typeof SuggestLayoutOutputSchema>;

export async function suggestLayout(input: SuggestLayoutInput): Promise<SuggestLayoutOutput> {
  return suggestLayoutFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLayoutPrompt',
  input: {schema: SuggestLayoutInputSchema},
  output: {schema: SuggestLayoutOutputSchema},
  prompt: `You are an AI expert in zine layouts.

  Based on the text content and image captions provided, suggest several visually appealing zine layouts.

  Text Content: {{{textContent}}}
  Image Captions: {{#each imageCaptions}}- {{{this}}}\n{{/each}}

  Consider the following:
  - Balance of text and images
  - Visual hierarchy
  - Readability

  Return multiple layout suggestions. Each layout should include a name, a description, and a list of suggested components (e.g., "image", "text block", "header", "footer").
  `,
});

const suggestLayoutFlow = ai.defineFlow(
  {
    name: 'suggestLayoutFlow',
    inputSchema: SuggestLayoutInputSchema,
    outputSchema: SuggestLayoutOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
