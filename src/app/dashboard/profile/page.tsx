
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BarChart, Github, Linkedin, Medal, Star, Target, Trophy, Twitter, Users } from "lucide-react";
import Link from "next/link";

const userProfile = {
    name: 'Cody Clash',
    avatar: 'https://picsum.photos/seed/1/100/100',
    bio: 'Full-stack developer with a passion for competitive programming and open-source.',
    powerScore: 2900,
    globalRank: 1234,
    problemsSolved: 573,
    dailyStreak: 128,
    alliance: 'The Code Crusaders',
    codingStats: {
        easy: 250,
        medium: 200,
        hard: 123
    },
    achievements: [
        { icon: Medal, title: 'Top 1% Rank', description: 'Achieved a global rank in the top 1%.' },
        { icon: Target, title: '500 Problems Solved', description: 'Solved over 500 coding problems.' },
        { icon: Star, title: 'Perfect Month', description: 'Completed every daily challenge in a month.' },
        { icon: Trophy, title: 'Contest Winner', description: 'Won 1st place in a weekly contest.' },
    ],
    connectedAccounts: [
        { icon: Github, handle: 'cody-clash-gh', url: '#' },
        { icon: Linkedin, handle: 'cody-clash-li', url: '#' },
        { icon: Twitter, handle: 'cody_clash_tw', url: '#' },
    ]
}


export default function ProfilePage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-3">

        {/* Left Column */}
        <div className="lg:col-span-1 space-y-6">
            <Card className="text-center">
                <CardContent className="pt-6">
                    <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-primary">
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                        <AvatarFallback>{userProfile.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.bio}</p>
                    <div className="mt-4">
                        <Button>Edit Profile</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Alliance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3 flex-shrink min-w-0">
                            <Users className="h-6 w-6 text-primary flex-shrink-0" />
                            <span className="font-semibold">{userProfile.alliance}</span>
                        </div>
                        <Button asChild variant="outline" size="sm" className="flex-shrink-0">
                            <Link href="/dashboard/alliances">View Alliance</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Connected Accounts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {userProfile.connectedAccounts.map(account => (
                        <a key={account.handle} href={account.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary transition-colors">
                           <account.icon className="h-5 w-5" />
                           <span className="font-medium">{account.handle}</span>
                        </a>
                    ))}
                </CardContent>
            </Card>

        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Overall Statistics</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Star className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Power Score</p>
                            <p className="text-xl font-bold">{userProfile.powerScore.toLocaleString()}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Trophy className="h-8 w-8 text-primary" />
                        <div>
                            <p className="text-sm text-muted-foreground">Global Rank</p>
                            <p className="text-xl font-bold">#{userProfile.globalRank.toLocaleString()}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 rounded-lg border p-4">
                        <Target className="h-8 w-8 text-accent" />
                        <div>
                            <p className="text-sm text-muted-foreground">Problems Solved</p>
                            <p className="text-xl font-bold">{userProfile.problemsSolved}</p>
                        </div>
                    </div>
                     <div className="flex items-center gap-4 rounded-lg border p-4">
                        <BarChart className="h-8 w-8 text-accent" />
                        <div>
                            <p className="text-sm text-muted-foreground">Solved Breakdown</p>
                            <p className="text-sm font-semibold">
                                E: {userProfile.codingStats.easy},
                                M: {userProfile.codingStats.medium},
                                H: {userProfile.codingStats.hard}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Badges earned from various accomplishments.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                   {userProfile.achievements.map(ach => (
                       <div key={ach.title} className="flex items-start gap-4 p-4 rounded-lg border">
                           <div className="p-2 bg-muted rounded-full">
                            <ach.icon className="h-6 w-6 text-primary" />
                           </div>
                           <div>
                               <p className="font-semibold">{ach.title}</p>
                               <p className="text-sm text-muted-foreground">{ach.description}</p>
                           </div>
                       </div>
                   ))}
                </CardContent>
            </Card>
        </div>
        </div>
    </div>
  );
}
