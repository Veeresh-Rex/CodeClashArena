import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RecommendationsForm } from "./recommendations-form";

export default function RecommendationsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
        <Card>
            <CardHeader>
            <CardTitle>AI Problem Recommender</CardTitle>
            <CardDescription>
                Get personalized problem recommendations from our AI Mentor based on your coding stats and weaknesses.
            </CardDescription>
            </CardHeader>
            <CardContent>
            <RecommendationsForm />
            </CardContent>
        </Card>
        </div>
    </div>
  );
}
