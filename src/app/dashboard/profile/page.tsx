import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="space-y-6">
        <Card>
            <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>Manage your profile, connected accounts, and view your achievements.</CardDescription>
            </CardHeader>
            <CardContent>
            <p>User profile details, coding stats, connected accounts, and badges will be displayed here.</p>
            </CardContent>
        </Card>
        </div>
    </div>
  );
}
