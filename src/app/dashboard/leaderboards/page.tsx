
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
  { id: 'u13', rank: 4, name: "Logic Lord", powerScore: 4950, problems: 875, avatar: "https://picsum.photos/seed/13/100/100" },
  { id: 'u14', rank: 5, name: "Data Diva", powerScore: 4800, problems: 850, avatar: "https://picsum.photos/seed/14/100/100" },
  { id: 'u15', rank: 6, name: "Kernel Knight", powerScore: 4750, problems: 840, avatar: "https://picsum.photos/seed/15/100/100" },
  { id: 'u16', rank: 7, name: "Script Savant", powerScore: 4700, problems: 830, avatar: "https://picsum.photos/seed/16/100/100" },
  { id: 'u17', rank: 8, name: "Bit Bender", powerScore: 4650, problems: 820, avatar: "https://picsum.photos/seed/17/100/100" },
  { id: 'u18', rank: 9, name: "Code Conjurer", powerScore: 4600, problems: 810, avatar: "https://picsum.photos/seed/18/100/100" },
  { id: 'u19', rank: 10, name: "Function Fox", powerScore: 4550, problems: 800, avatar: "https://picsum.photos/seed/19/100/100" },
  { id: 'u20', rank: 11, name: 'Cache King', powerScore: 4500, problems: 790, avatar: 'https://picsum.photos/seed/20/100/100' },
  { id: 'u21', rank: 12, name: 'Pointer Prince', powerScore: 4450, problems: 780, avatar: 'https://picsum.photos/seed/21/100/100' },
  { id: 'u22', rank: 13, name: 'Stream Sorceress', powerScore: 4400, problems: 770, avatar: 'https://picsum.photos/seed/22/100/100' },
  { id: 'u23', rank: 14, name: 'Async Ace', powerScore: 4350, problems: 760, avatar: 'https://picsum.photos/seed/23/100/100' },
  { id: 'u24', rank: 15, name: 'React Ranger', powerScore: 4300, problems: 750, avatar: 'https://picsum.photos/seed/24/100/100' },
  { id: 'u25', rank: 16, name: 'Vue Virtuoso', powerScore: 4250, problems: 740, avatar: 'https://picsum.photos/seed/25/100/100' },
  { id: 'u26', rank: 17, name: 'Docker Duke', powerScore: 4200, problems: 730, avatar: 'https://picsum.photos/seed/26/100/100' },
  { id: 'u27', rank: 18, name: 'Kube Kingpin', powerScore: 4150, problems: 720, avatar: 'https://picsum.photos/seed/27/100/100' },
  { id: 'u28', rank: 19, name: 'Go Guru', powerScore: 4100, problems: 710, avatar: 'https://picsum.photos/seed/28/100/100' },
  { id: 'u29', rank: 20, name: 'Rust Rockstar', powerScore: 4050, problems: 700, avatar: 'https://picsum.photos/seed/29/100/100' },
  { id: 'u30', rank: 21, name: 'Swift Shogun', powerScore: 4000, problems: 690, avatar: 'https://picsum.photos/seed/30/100/100' },
  { id: 'u31', rank: 22, name: 'Kotlin Commander', powerScore: 3950, problems: 680, avatar: 'https://picsum.photos/seed/31/100/100' },
  { id: 'u32', rank: 23, name: 'API Admiral', powerScore: 3900, problems: 670, avatar: 'https://picsum.photos/seed/32/100/100' },
  { id: 'u33', rank: 24, name: 'DB Dominator', powerScore: 3850, problems: 660, avatar: 'https://picsum.photos/seed/33/100/100' },
  { id: 'u34', rank: 25, name: 'ML Maestro', powerScore: 3800, problems: 650, avatar: 'https://picsum.photos/seed/34/100/100' },
  { id: 'u35', rank: 26, name: 'AI Artisan', powerScore: 3750, problems: 640, avatar: 'https://picsum.photos/seed/35/100/100' },
  { id: 'u36', rank: 27, name: 'DevOps Dynamo', powerScore: 3700, problems: 630, avatar: 'https://picsum.photos/seed/36/100/100' },
  { id: 'u37', rank: 28, name: 'Security Sage', powerScore: 3650, problems: 620, avatar: 'https://picsum.photos/seed/37/100/100' },
  { id: 'u38', rank: 29, name: 'Cloud Captain', powerScore: 3600, problems: 610, avatar: 'https://picsum.photos/seed/38/100/100' },
  { id: 'u39', rank: 30, name: 'Serverless Sensei', powerScore: 3550, problems: 600, avatar: 'https://picsum.photos/seed/39/100/100' },
  { id: 'u40', rank: 31, name: 'Frontend Flash', powerScore: 3500, problems: 590, avatar: 'https://picsum.photos/seed/40/100/100' },
  { id: 'u41', rank: 32, name: 'Backend Baron', powerScore: 3450, problems: 580, avatar: 'https://picsum.photos/seed/41/100/100' },
  { id: 'u42', rank: 33, name: 'Fullstack Phantom', powerScore: 3400, problems: 570, avatar: 'https://picsum.photos/seed/42/100/100' },
  { id: 'u43', rank: 34, name: 'Agile Alchemist', powerScore: 3350, problems: 560, avatar: 'https://picsum.photos/seed/43/100/100' },
  { id: 'u44', rank: 35, name: 'Scrum Sovereign', powerScore: 3300, problems: 550, avatar: 'https://picsum.photos/seed/44/100/100' },
  { id: 'u45', rank: 36, name: 'Kanban Knight', powerScore: 3250, problems: 540, avatar: 'https://picsum.photos/seed/45/100/100' },
  { id: 'u46', rank: 37, name: 'TDD Titan', powerScore: 3200, problems: 530, avatar: 'https://picsum.photos/seed/46/100/100' },
  { id: 'u47', rank: 38, name: 'BDD Baroness', powerScore: 3150, problems: 520, avatar: 'https://picsum.photos/seed/47/100/100' },
  { id: 'u48', rank: 39, name: 'CI/CD Crusader', powerScore: 3100, problems: 510, avatar: 'https://picsum.photos/seed/48/100/100' },
  { id: 'u49', rank: 40, name: 'Git Gladiator', powerScore: 3050, problems: 500, avatar: 'https://picsum.photos/seed/49/100/100' },
  { id: 'u50', rank: 41, name: 'Version Voyager', powerScore: 3000, problems: 490, avatar: 'https://picsum.photos/seed/50/100/100' },
  { id: 'u51', rank: 42, name: 'Shell Shaman', powerScore: 2950, problems: 480, avatar: 'https://picsum.photos/seed/51/100/100' },
  { id: 'u1', rank: 1234, name: "Cody Clash", powerScore: 2900, problems: 573, isCurrentUser: true, avatar: "https://picsum.photos/seed/1/100/100" },
  { id: 'u52', rank: 43, name: 'PowerShell Paladin', powerScore: 2850, problems: 470, avatar: 'https://picsum.photos/seed/52/100/100' },
  { id: 'u53', rank: 44, name: 'Regex Ruler', powerScore: 2800, problems: 460, avatar: 'https://picsum.photos/seed/53/100/100' },
  { id: 'u54', rank: 45, name: 'Markup Master', powerScore: 2750, problems: 450, avatar: 'https://picsum.photos/seed/54/100/100' },
  { id: 'u55', rank: 46, name: 'CSS Centurion', powerScore: 2700, problems: 440, avatar: 'https://picsum.photos/seed/55/100/100' },
  { id: 'u56', rank: 47, name: 'Sass Specialist', powerScore: 2650, problems: 430, avatar: 'https://picsum.photos/seed/56/100/100' },
  { id: 'u57', rank: 48, name: 'LESS Leader', powerScore: 2600, problems: 420, avatar: 'https://picsum.photos/seed/57/100/100' },
  { id: 'u58', rank: 49, name: 'Web Wizard', powerScore: 2550, problems: 410, avatar: 'https://picsum.photos/seed/58/100/100' },
  { id: 'u59', rank: 50, name: 'Pixel Perfect', powerScore: 2500, problems: 400, avatar: 'https://picsum.photos/seed/59/100/100' },
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
