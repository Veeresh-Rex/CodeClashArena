
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Check, User, UserPlus, UserX, X } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from 'lucide-react';

const friendsList = [
    { name: "Byte Baron", username: 'byte_baron', allianceCode: "TCC", avatar: "https://picsum.photos/seed/4/100/100", online: true },
    { name: "Syntax Slayer", username: 'syntax_slayer', allianceCode: "TCC", avatar: "https://picsum.photos/seed/2/100/100", online: false },
    { name: "Algo Queen", username: 'algo_queen', allianceCode: "TCC", avatar: "https://picsum.photos/seed/3/100/100", online: true },
    { name: "Pixel Pioneer", username: 'pixel_pioneer', allianceCode: "TCC", avatar: "https://picsum.photos/seed/5/100/100", online: false },
    { name: "Data Diva", username: 'data_diva', allianceCode: "PYPH", avatar: "https://picsum.photos/seed/14/100/100", online: true },
];

const friendRequests = [
    { id: 'fr1', name: "Syntax Samurai", username: "syntax_samurai", powerScore: 5150, avatar: "https://picsum.photos/seed/11/100/100", allianceCode: "BINB" },
    { id: 'fr2', name: "Boolean Bard", username: "boolean_bard", powerScore: 4980, avatar: "https://picsum.photos/seed/12/100/100", allianceCode: "PYPH" },
];


const FriendListTab = () => {
    const sortedFriends = [...friendsList].sort((a, b) => {
        if (a.online && !b.online) return -1;
        if (!a.online && b.online) return 1;
        return a.name.localeCompare(b.name);
    });

    return (
        <div className="space-y-4">
            {sortedFriends.map(friend => (
                <Card key={friend.name}>
                    <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                             <div className="relative">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={friend.avatar} alt={friend.name} />
                                    <AvatarFallback>{friend.name.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                {friend.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
                            </div>
                            <div>
                                <p className="font-semibold">{friend.name}</p>
                                <p className="text-sm text-muted-foreground">@{friend.username}</p>
                                {friend.allianceCode && <p className="text-xs text-muted-foreground">[{friend.allianceCode}]</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/dashboard/profile?user=${friend.username}`}>
                                    <User className="mr-2 h-4 w-4" />
                                    Profile
                                </Link>
                            </Button>
                             <Button variant="destructive" size="sm">
                                <UserX className="mr-2 h-4 w-4" />
                                Unfriend
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

const FriendRequestsTab = () => {
    const [requests, setRequests] = useState(friendRequests);

    const handleRequest = (requestId: string) => {
        setRequests(prev => prev.filter(req => req.id !== requestId));
    }

    if (requests.length === 0) {
        return (
            <div className="text-center text-muted-foreground py-12">
                <UserPlus className="mx-auto h-12 w-12" />
                <p className="mt-4">No new friend requests.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            {requests.map(req => (
                <Card key={req.id}>
                    <CardContent className="p-4 flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={req.avatar} alt={req.name} />
                                <AvatarFallback>{req.name.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{req.name}</p>
                                <p className="text-sm text-muted-foreground">@{req.username}</p>
                                {req.allianceCode && <p className="text-xs text-muted-foreground">[{req.allianceCode}]</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                             <Button size="sm" onClick={() => handleRequest(req.id)}>
                                <Check className="mr-2 h-4 w-4" />
                                Accept
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleRequest(req.id)}>
                                <X className="mr-2 h-4 w-4" />
                                Decline
                            </Button>
                             <Button asChild variant="outline" size="icon" className="h-9 w-9">
                                <Link href={`/dashboard/profile?user=${req.username}`}>
                                    <User className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}


export default function SocialPage() {

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <Card>
                <CardHeader>
                    <CardTitle>Social</CardTitle>
                    <CardDescription>Manage your friends and view pending requests.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Tabs defaultValue="friends">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="friends">Friends</TabsTrigger>
                            <TabsTrigger value="requests">Requests</TabsTrigger>
                        </TabsList>
                        <TabsContent value="friends" className="mt-6">
                            <FriendListTab />
                        </TabsContent>
                        <TabsContent value="requests" className="mt-6">
                           <FriendRequestsTab />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

