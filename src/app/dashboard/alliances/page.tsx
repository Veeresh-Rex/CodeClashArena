import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function AlliancesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Alliances</CardTitle>
           <CardDescription>Create or join an alliance to compete with others.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Alliance details, member lists, and management tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
