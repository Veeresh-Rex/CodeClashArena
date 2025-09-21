
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { MoreVertical, MessageSquare, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const individualData = [
  { id: 'u10', rank: 1, name: "Alpha Coder", powerScore: 5200, problems: 950, avatar: "https://picsum.photos/seed/10/100/100" },
  { id: 'u11', rank: 2, name: "Syntax Samurai", powerScore: 5150, problems: 920, avatar: "https://picsum.photos/seed/11/100/100" },
  { id: 'u12', rank: 3, name: "Boolean Bard", powerScore: 4980, problems: 880, avatar: "https://picsum.photos/seed/12/100/100" },
  { id: 'u1', rank: 1234, name: "Cody Clash", powerScore: 2900, problems: 573, isCurrentUser: true, avatar: "https://picsum.photos/seed/1/100/100" },
  { id: 'u13', rank: 4, name: "Logic Lord", powerScore: 4950, problems: 875, avatar: "https://picsum.photos/seed/13/100/100" },
  { id: 'u14', rank: 5, name: "Data Diva", powerScore: 4800, problems: 850, avatar: "https://picsum.photos/seed/14/100/100" },
  { id: 'u15', rank: 6, name: "Kernel Knight", powerScore: 4750, problems: 840, avatar: "https://picsum.photos/seed/15/100/100" },
  { id: 'u16', rank: 7, name: "Script Savant", powerScore: 4700, problems: 830, avatar: "https://picsum.photos/seed/16/100/100" },
  { id: 'u17', rank: 8, name: "Bit Bender", powerScore: 4650, problems: 820, avatar: "https://picsum.photos/seed/17/100/100" },
  { id: 'u18', rank: 9, name: "Code Conjurer", powerScore: 4600, problems: 810, avatar: "https://picsum.photos/seed/18/100/100" },
  { id: 'u19', rank: 10, name: "Function Fox", powerScore: 4550, problems: 800, avatar: "https://picsum.photos/seed/19/100/100" },
].sort((a,b) => a.rank - b.rank);

const allianceData = [
  { rank: 1, name: "Recursive Renegades", powerScore: 250000, members: 50 },
  { rank: 2, name: "Binary Brigade", powerScore: 210500, members: 42 },
  { rank: 3, name: "Python Phantoms", powerScore: 180300, members: 33 },
  { rank: 12, name: "The Code Crusaders", powerScore: 125800, members: 24, isCurrentAlliance: true },
  { rank: 4, name: "Java Jesters", powerScore: 98200, members: 15 },
  { rank: 5, name: "CSS Sorcerers", powerScore: 85400, members: 18 },
  { rank: 6, name: "Terminal Titans", powerScore: 82000, members: 20 },
  { rank: 7, name: "Git Gurus", powerScore: 79500, members: 22 },
  { rank: 8, name: "API Avengers", powerScore: 75000, members: 12 },
  { rank: 9, name: "Data Dragons", powerScore: 72300, members: 28 },
  { rank: 10, name: "Stack Survivors", powerScore: 68000, members: 35 },
].sort((a,b) => a.rank - b.rank);

const IndividualUserRow = ({ user, isSticky = false }: { user: typeof individualData[0], isSticky?: boolean }) => {
    return (
        <TableRow className={cn(user.isCurrentUser && 'bg-primary/10', isSticky && 'sticky bottom-0 z-10 bg-card shadow-lg')}>
            <TableCell className="font-medium text-lg">#{user.rank}</TableCell>
            <TableCell>
                <Link href={`/dashboard/profile?user=${user.name}`} className="flex items-center gap-3 hover:underline">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                    {user.isCurrentUser && <Badge>You</Badge>}
                </Link>
            </TableCell>
            <TableCell className="text-right">{user.problems}</TableCell>
            <TableCell className="text-right font-semibold">{user.powerScore.toLocaleString()}</TableCell>
            <TableCell className="text-right">
                {!user.isCurrentUser && !isSticky && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/chat?user=${encodeURIComponent(user.name)}`}>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    <span>Chat</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href={`/dashboard/profile?user=${user.name}`}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>See Profile</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            </TableCell>
        </TableRow>
    );
}

export default function LeaderboardsPage() {
    const currentUser = individualData.find(user => user.isCurrentUser);

  return (
    <div className="p-4 md:p-6 lg:p-8">
        <Card>
        <CardHeader>
            <CardTitle>Leaderboards</CardTitle>
            <CardDescription>
            See how you and your alliance rank against the world.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="individual">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="alliance">Alliance</TabsTrigger>
            </TabsList>
            <TabsContent value="individual" className="relative">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead className="text-right">Problems Solved</TableHead>
                    <TableHead className="text-right">Power Score</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {individualData.filter(u => !u.isCurrentUser).map((user) => (
                        <IndividualUserRow key={user.rank} user={user} />
                    ))}
                </TableBody>
                </Table>
                 {currentUser && (
                    <div className="sticky bottom-0 -mx-6 -mb-6 mt-4">
                        <Table>
                            <TableBody>
                                 <IndividualUserRow user={currentUser} isSticky />
                            </TableBody>
                        </Table>
                    </div>
                )}
            </TabsContent>
            <TabsContent value="alliance">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[80px]">Rank</TableHead>
                    <TableHead>Alliance</TableHead>
                    <TableHead className="text-right">Members</TableHead>
                    <TableHead className="text-right">Total Power</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allianceData.map((alliance) => (
                    <TableRow key={alliance.rank} className={cn(alliance.isCurrentAlliance && 'bg-primary/10')}>
                        <TableCell className="font-medium text-lg">#{alliance.rank}</TableCell>
                        <TableCell>
                        <Link href="/dashboard/alliance" className="flex items-center gap-3 hover:underline">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{alliance.name.substring(0,1)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{alliance.name}</span>
                            {alliance.isCurrentAlliance && <Badge>Your Alliance</Badge>}
                        </Link>
                        </TableCell>
                        <TableCell className="text-right">{alliance.members}</TableCell>
                        <TableCell className="text-right font-semibold">{alliance.powerScore.toLocaleString()}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TabsContent>
            </Tabs>
        </CardContent>
        </Card>
    </div>
  );
}
