
"use client";

import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Github, Gitlab, Linkedin, MessageCircle, Moon, Sun, Trash2, Twitter, Upload, Users } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


export default function SettingsPage() {
    const { setTheme, theme } = useTheme();

    const codingAccounts = [
        { name: 'GitHub', icon: Github, handle: 'cody-clash-gh', connected: true },
        { name: 'LeetCode', icon: Code, handle: 'cody_clash', connected: true },
        { name: 'GitLab', icon: Gitlab, handle: null, connected: false },
    ]

    const socialAccounts = [
        { name: 'LinkedIn', icon: Linkedin, handle: 'cody-clash-li', connected: true },
        { name: 'Twitter', icon: Twitter, handle: null, connected: false },
    ]

    const notificationSettings = [
        { id: 'friendRequests', label: 'Friend Requests', description: 'Notify me when someone sends me a friend request.' },
        { id: 'allianceInvites', label: 'Alliance Invites', description: 'Notify me when I receive an invitation to an alliance.' },
        { id: 'allianceAnnouncements', label: 'Alliance Announcements', icon: Users, description: 'Get notifications for announcements in my alliance.' },
        { id: 'directMessages', label: 'Direct Messages', icon: MessageCircle, description: 'Notify me when I receive a new direct message.' },
    ]

    const AccountConnection = ({ account }: { account: { name: string, icon: React.ElementType, handle: string | null, connected: boolean } }) => (
         <div className="flex items-center justify-between p-3 rounded-lg border">
            <div className="flex items-center gap-3">
                <account.icon className="h-6 w-6" />
                <div>
                    <p className="font-medium">{account.name}</p>
                    {account.handle && <p className="text-sm text-muted-foreground">{account.handle}</p>}
                </div>
            </div>
            <Button variant={account.connected ? "secondary" : "default"}>
                {account.connected ? 'Disconnect' : 'Connect'}
            </Button>
        </div>
    );

  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
                <p className="text-muted-foreground">Manage your account settings and set e-mail preferences.</p>
            </div>
            <Separator />

            <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="appearance">Appearance</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                    <Card>
                        <CardHeader>
                            <CardTitle>Public Profile</CardTitle>
                            <CardDescription>This is how others will see you on the site.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-20 w-20">
                                    <AvatarImage src="https://picsum.photos/seed/1/200/200" alt="Cody Clash" />
                                    <AvatarFallback>CC</AvatarFallback>
                                </Avatar>
                                <div className="flex gap-2">
                                    <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Change Photo</Button>
                                    <Button variant="ghost"><Trash2 className="mr-2 h-4 w-4 text-red-500" /> Remove</Button>
                                </div>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" defaultValue="Cody Clash" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="username">Username</Label>
                                    <Input id="username" defaultValue="cody_clash" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" defaultValue="Full-stack developer with a passion for competitive programming and open-source." className="min-h-24" />
                            </div>
                            <Button>Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>Manage your account settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="cody.clash@example.com" />
                            </div>
                             <Separator />
                             <div className="space-y-2">
                                <Label>Password</Label>
                                <p className="text-sm text-muted-foreground">For security, you may be logged out of other sessions when you change your password.</p>
                                <Button variant="outline">Change Password</Button>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-medium">Coding Platforms</h3>
                                <p className="text-sm text-muted-foreground">Connect your accounts from various coding platforms.</p>
                                <div className="space-y-4 mt-4">
                                    {codingAccounts.map(account => (
                                       <AccountConnection key={account.name} account={account} />
                                    ))}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h3 className="text-lg font-medium">Social Media</h3>
                                <p className="text-sm text-muted-foreground">Connect your social accounts to display on your profile.</p>
                                <div className="space-y-4 mt-4">
                                    {socialAccounts.map(account => (
                                        <AccountConnection key={account.name} account={account} />
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="mt-6 border-destructive">
                        <CardHeader>
                            <CardTitle className="text-destructive">Danger Zone</CardTitle>
                             <CardDescription>These actions are permanent and cannot be undone.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive">Delete Account</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete my account</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="notifications">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>Choose how you want to be notified.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {notificationSettings.map(setting => (
                                <div key={setting.id} className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">{setting.label}</Label>
                                        <p className="text-sm text-muted-foreground">{setting.description}</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="appearance">
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>Customize the look and feel of the application.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="text-base">Theme</Label>
                                <p className="text-sm text-muted-foreground">Select the theme for the dashboard.</p>
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>
                                        <Sun className="mr-2 h-4 w-4" /> Light
                                    </Button>
                                    <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>
                                        <Moon className="mr-2 h-4 w-4" /> Dark
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    </div>
  );
}
