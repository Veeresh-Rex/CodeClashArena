"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrainCircuit, Loader2 } from "lucide-react";

import { recommendProblems } from "@/ai/flows/ai-problem-recommender";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formSchema = z.object({
  codingStats: z.string().min(10, "Please provide more details about your coding stats."),
  connectedAccounts: z.string().min(1, "Please list your connected accounts."),
  preferredDifficulty: z.enum(["Easy", "Medium", "Hard", "Any"]),
});

type FormValues = z.infer<typeof formSchema>;

export function RecommendationsForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      codingStats: "Solved: 573 (Easy: 250, Med: 200, Hard: 123)\nDaily Streak: 128 Days\nContests: 42\nRank: #1,234",
      connectedAccounts: "LeetCode: cody_clash, GitHub: cody-clash",
      preferredDifficulty: "Medium",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setResult(null);
    try {
      const response = await recommendProblems(values);
      setResult(response.problemRecommendations);
      toast({
        title: "Success!",
        description: "Your AI-powered recommendations are ready.",
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get recommendations. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="codingStats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Coding Stats</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Solved: 500 (Easy: 300, Med: 150, Hard: 50), Streak: 30 days..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide a summary of your coding performance. The more detail, the better the recommendations.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="connectedAccounts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connected Accounts</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., LeetCode: user123, GitHub: user123"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="preferredDifficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Any">Any</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={loading} size="lg">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <BrainCircuit className="mr-2 h-4 w-4" />
            )}
            Get Recommendations
          </Button>
        </form>
      </Form>
      {loading && (
        <div className="flex items-center justify-center pt-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      {result && (
        <Card className="mt-8 bg-card">
          <CardHeader>
            <CardTitle>Your Recommended Problems</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="text-sm space-y-4"
              dangerouslySetInnerHTML={{ __html: result.replace(/\n/g, '<br />') }}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
