
'use server';

import { suggestLayout as suggestLayoutFlow, type SuggestLayoutInput, type SuggestLayoutOutput } from '@/ai/flows/suggest-layout';

export async function suggestLayout(input: SuggestLayoutInput): Promise<{ success: boolean; data?: SuggestLayoutOutput, error?: string }> {
  try {
    const result = await suggestLayoutFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error('Error suggesting layout:', error);
    // In a real app, you might want to log this error to a monitoring service.
    return { success: false, error: 'An unexpected error occurred while generating layout suggestions. Please try again.' };
  }
}
