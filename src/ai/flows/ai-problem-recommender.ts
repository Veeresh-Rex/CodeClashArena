'use server';
/**
 * @fileOverview An AI tool that analyzes user coding stats and recommends problems based on weaknesses.
 *
 * - recommendProblems - A function that handles the problem recommendation process.
 * - RecommendProblemsInput - The input type for the recommendProblems function.
 * - RecommendProblemsOutput - The return type for the recommendProblems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendProblemsInputSchema = z.object({
  codingStats: z
    .string()
    .describe(
      'A string containing the coding statistics of the user, including problems solved by difficulty, daily streak, contests, and rank.'
    ),
  connectedAccounts: z
    .string()
    .describe('A string containing the connected coding accounts of the user.'),
  preferredDifficulty: z
    .string()
    .optional()
    .describe('The preferred difficulty level for the recommended problems.'),
});
export type RecommendProblemsInput = z.infer<typeof RecommendProblemsInputSchema>;

const RecommendProblemsOutputSchema = z.object({
  problemRecommendations: z
    .string()
    .describe(
      'A list of recommended coding problems based on the user coding statistics and preferred difficulty.'
    ),
});
export type RecommendProblemsOutput = z.infer<typeof RecommendProblemsOutputSchema>;

export async function recommendProblems(input: RecommendProblemsInput): Promise<RecommendProblemsOutput> {
  return recommendProblemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendProblemsPrompt',
  input: {schema: RecommendProblemsInputSchema},
  output: {schema: RecommendProblemsOutputSchema},
  prompt: `You are an AI coding mentor. Analyze the user's coding statistics and connected accounts to recommend coding problems that target their weaknesses and help them improve.

Coding Statistics: {{{codingStats}}}
Connected Accounts: {{{connectedAccounts}}}
Preferred Difficulty: {{{preferredDifficulty}}}

Based on this information, provide a list of recommended coding problems with links and a brief explanation of why each problem is recommended.
`,
});

const recommendProblemsFlow = ai.defineFlow(
  {
    name: 'recommendProblemsFlow',
    inputSchema: RecommendProblemsInputSchema,
    outputSchema: RecommendProblemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
