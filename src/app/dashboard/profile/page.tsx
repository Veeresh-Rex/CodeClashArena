
"use client";

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Github, Linkedin, Medal, Star, Target, Trophy, Twitter, Users, UserPlus, UserX, MessageSquare, Check } from "lucide-react";
import Link from "next/link";
import { cn } from '@/lib/utils';
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


const userProfileData = {
    'cody_clash': {
        name: 'Cody Clash',
        username: 'cody_clash',
        isCurrentUser: true,
        avatar: 'https://picsum.photos/seed/1/100/100',
        bio: 'Full-stack developer with a passion for competitive programming and open-source.',
        powerScore: 2900,
        globalRank: 1234,
        problemsSolved: 573,
        dailyStreak: 128,
        alliance: 'The Code Crusaders',
        allianceCode: 'TCC',
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
    },
    'syntax_slayer': {
        name: 'Syntax Slayer',
        username: 'syntax_slayer',
        isFriend: true,
        online: false,
        avatar: 'https://picsum.photos/seed/2/100/100',
        bio: 'Backend specialist, focusing on performance and scalability. Member of The Code Crusaders.',
        powerScore: 2750,
        globalRank: 1500,
        problemsSolved: 550,
        dailyStreak: 90,
        alliance: 'The Code Crusaders',
        allianceCode: 'TCC',
        codingStats: { easy: 200, medium: 250, hard: 100 },
        achievements: [ { icon: Medal, title: 'Top 5% Rank', description: 'Achieved a global rank in the top 5%.' } ],
        connectedAccounts: [ { icon: Github, handle: 'syntax-slayer', url: '#' } ],
    },
    'quantum_coder': {
        name: 'Quantum Coder',
        username: 'quantum_coder',
        isFriend: false,
        online: true,
        avatar: 'https://picsum.photos/seed/41/100/100',
        bio: 'Exploring the intersection of quantum computing and competitive programming.',
        powerScore: 3100,
        globalRank: 980,
        problemsSolved: 620,
        dailyStreak: 45,
        alliance: null,
        allianceCode: null,
        codingStats: { easy: 250, medium: 250, hard: 120 },
        achievements: [ { icon: Trophy, title: 'Contest Finalist', description: 'Reached the finals in a major contest.' } ],
        connectedAccounts: [ { icon: Github, handle: 'quantum_coder', url: '#' } ],
    }
};

const ProfileContent = () => {
    const searchParams = useSearchParams();
    const username = searchParams.get('user');
    const [friendRequestSent, setFriendRequestSent] = useState(false);
    
    // @ts-ignore
    const userProfile = userProfileData[username] || userProfileData['cody_clash'];

    const handleFriendRequest = () => {
        setFriendRequestSent(prev => !prev);
    }


    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="grid gap-8 lg:grid-cols-3">

            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
                <Card className="text-center">
                    <CardContent className="pt-6">
                        <div className="relative inline-block">
                             <Avatar className="h-28 w-28 mx-auto mb-4 border-4 border-primary">
                                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                                <AvatarFallback>{userProfile.name.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            {userProfile.online && userProfile.isFriend && (
                                <div className="absolute bottom-4 right-4 w-5 h-5 bg-green-500 rounded-full border-4 border-card" />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                        <p className="text-muted-foreground">@{userProfile.username}</p>
                        <p className="text-muted-foreground mt-2">{userProfile.bio}</p>
                        <div className="mt-4">
                            {userProfile.isCurrentUser ? (
                                <Button>Edit Profile</Button>
                            ) : userProfile.isFriend ? (
                                <div className="flex flex-wrap gap-2 justify-center">
                                    <Button asChild variant="outline">
                                        <Link href={`/dashboard/chat?user=${encodeURIComponent(userProfile.name)}`}><MessageSquare className="mr-2 h-4 w-4" />Chat</Link>
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive"><UserX className="mr-2 h-4 w-4" />Unfriend</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Are you sure you want to unfriend {userProfile.name}?</AlertDialogTitle>
                                                <AlertDialogDescription>This action will remove them from your friends list.</AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Unfriend</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            ) : (
                                <div className="flex flex-wrap gap-2 justify-center">
                                     <Button onClick={handleFriendRequest} variant={friendRequestSent ? "secondary" : "default"}>
                                        {friendRequestSent ? (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Request Sent
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="mr-2 h-4 w-4" />
                                                Send Friend Request
                                            </>
                                        )}
                                    </Button>
                                    <Button asChild variant="secondary">
                                        <Link href={`/dashboard/chat?user=${encodeURIComponent(userProfile.name)}`}><MessageSquare className="mr-2 h-4 w-4" />Chat</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {userProfile.alliance && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Alliance</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-primary flex-shrink-0" />
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold">{userProfile.alliance}</span>
                                  {userProfile.allianceCode && <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">[{userProfile.allianceCode}]</span>}
                                </div>
                            </div>
                            <Button asChild variant="outline" size="sm" className="w-full">
                                <Link href="/dashboard/alliance">View Alliance</Link>
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {userProfile.connectedAccounts && userProfile.connectedAccounts.length > 0 && (
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
                )}

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

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading profile...</div>}>
            <ProfileContent />
        </Suspense>
    )
}

    