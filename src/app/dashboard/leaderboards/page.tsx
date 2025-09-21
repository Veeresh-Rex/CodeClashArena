import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function LeaderboardsPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Leaderboards</CardTitle>
          <CardDescription>See how you and your alliance rank against the world.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Leaderboards for top individuals and alliances (weekly, monthly, all-time) will be shown here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
