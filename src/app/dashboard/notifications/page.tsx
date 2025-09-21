
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Check, UserPlus, Users, Trophy, X, ShieldAlert } from "lucide-react";
import Link from "next/link";

const notifications = {
  today: [
    {
      id: 1,
      type: "friend_request",
      icon: UserPlus,
      title: "New friend request",
      description: "Syntax Samurai wants to be your friend.",
      time: "15m ago",
      read: false,
    },
    {
      id: 2,
      type: "alliance_invite",
      icon: Users,
      title: "Alliance Invitation",
      description: "The 'Binary Brigade' has invited you to join their alliance.",
      time: "1h ago",
      read: false,
    },
  ],
  yesterday: [
    {
      id: 3,
      type: "rank_update",
      icon: Trophy,
      title: "You've been promoted!",
      description: "Your new global rank is #1,200.",
      time: "20h ago",
      read: true,
    },
    {
      id: 4,
      type: "alliance_announcement",
      icon: Users,
      title: "Alliance Announcement",
      description: "'The Code Crusaders' has a new event starting soon!",
      time: "1d ago",
      read: false,
    },
  ],
  thisWeek: [
    {
      id: 5,
      type: "system_alert",
      icon: ShieldAlert,
      title: "Scheduled Maintenance",
      description: "The arena will be down for maintenance on Sunday at 2 AM.",
      time: "3d ago",
      read: true,
    },
    {
      id: 6,
      type: "friend_accept",
      icon: UserPlus,
      title: "Friend Request Accepted",
      description: "Data Diva accepted your friend request.",
      time: "5d ago",
      read: true,
    },
  ]
};

const NotificationItem = ({ notification }: { notification: any }) => (
    <div className={`flex items-start gap-4 p-4 rounded-lg ${!notification.read ? 'bg-muted/50' : ''}`}>
        <div className="bg-muted p-2 rounded-full">
            <notification.icon className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
            <p className="font-semibold">{notification.title}</p>
            <p className="text-sm text-muted-foreground">{notification.description}</p>
            <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
        </div>
        {notification.type === 'friend_request' || notification.type === 'alliance_invite' ? (
            <div className="flex gap-2 items-center">
                <Button size="sm" variant="outline"><Check className="h-4 w-4 mr-1" /> Accept</Button>
                <Button size="sm" variant="ghost"><X className="h-4 w-4" /></Button>
            </div>
        ) : !notification.read ? (
             <Button size="sm" variant="ghost">Mark as read</Button>
        ) : null}
    </div>
);


export default function NotificationsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>Manage and view all your recent notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Today</h3>
                <div className="space-y-2">
                    {notifications.today.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
            </div>
            <Separator />
            <div>
                <h3 className="text-lg font-semibold mb-2">Yesterday</h3>
                <div className="space-y-2">
                    {notifications.yesterday.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
            </div>
            <Separator />
             <div>
                <h3 className="text-lg font-semibold mb-2">This Week</h3>
                <div className="space-y-2">
                    {notifications.thisWeek.map(n => <NotificationItem key={n.id} notification={n} />)}
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
