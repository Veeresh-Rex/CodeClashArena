
"use client";

import { useState } from "react";
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
import { MoreVertical, MessageSquare, User, Users, Flame, Star, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const individualData = [
  { id: 'u10', rank: 1, name: "Alpha Coder", username: "alpha_coder", powerScore: 5200, problems: 950, avatar: "https://picsum.photos/seed/10/100/100", allianceCode: "RECR" },
  { id: 'u11', rank: 2, name: "Syntax Samurai", username: "syntax_samurai", powerScore: 5150, problems: 920, avatar: "https://picsum.photos/seed/11/100/100", allianceCode: "BINB" },
  { id: 'u12', rank: 3, name: "Boolean Bard", username: "boolean_bard", powerScore: 4980, problems: 880, avatar: "https://picsum.photos/seed/12/100/100", allianceCode: "PYPH" },
  { id: 'u13', rank: 4, name: "Logic Lord", username: "logic_lord", powerScore: 4950, problems: 875, avatar: "https://picsum.photos/seed/13/100/100", allianceCode: "RECR" },
  { id: 'u14', rank: 5, name: "Data Diva", username: "data_diva", powerScore: 4800, problems: 850, avatar: "https://picsum.photos/seed/14/100/100", allianceCode: "PYPH" },
  { id: 'u15', rank: 6, name: "Kernel Knight", username: "kernel_knight", powerScore: 4750, problems: 840, avatar: "https://picsum.photos/seed/15/100/100", allianceCode: "JAVA" },
  { id: 'u16', rank: 7, name: "Script Savant", username: "script_savant", powerScore: 4700, problems: 830, avatar: "https://picsum.photos/seed/16/100/100", allianceCode: "CSSS" },
  { id: 'u17', rank: 8, name: "Bit Bender", username: "bit_bender", powerScore: 4650, problems: 820, avatar: "https://picsum.photos/seed/17/100/100", allianceCode: "BINB" },
  { id: 'u18', rank: 9, name: "Code Conjurer", username: "code_conjurer", powerScore: 4600, problems: 810, avatar: "https://picsum.photos/seed/18/100/100", allianceCode: "JAVA" },
  { id: 'u19', rank: 10, name: "Function Fox", username: "function_fox", powerScore: 4550, problems: 800, avatar: "https://picsum.photos/seed/19/100/100", allianceCode: null },
  { id: 'u20', rank: 11, name: 'Cache King', username: 'cache_king', powerScore: 4500, problems: 790, avatar: 'https://picsum.photos/seed/20/100/100', allianceCode: "RECR" },
  { id: 'u21', rank: 12, name: 'Pointer Prince', username: 'pointer_prince', powerScore: 4450, problems: 780, avatar: 'https://picsum.photos/seed/21/100/100', allianceCode: null },
  { id: 'u22', rank: 13, name: 'Stream Sorceress', username: 'stream_sorceress', powerScore: 4400, problems: 770, avatar: 'https://picsum.photos/seed/22/100/100', allianceCode: "PYPH" },
  { id: 'u23', rank: 14, name: 'Async Ace', username: 'async_ace', powerScore: 4350, problems: 760, avatar: 'https://picsum.photos/seed/23/100/100', allianceCode: "BINB" },
  { id: 'u24', rank: 15, name: 'React Ranger', username: 'react_ranger', powerScore: 4300, problems: 750, avatar: 'https://picsum.photos/seed/24/100/100', allianceCode: null },
  { id: 'u25', rank: 16, name: 'Vue Virtuoso', username: 'vue_virtuoso', powerScore: 4250, problems: 740, avatar: 'https://picsum.photos/seed/25/100/100', allianceCode: "CSSS" },
  { id: 'u26', rank: 17, name: 'Docker Duke', username: 'docker_duke', powerScore: 4200, problems: 730, avatar: 'https://picsum.photos/seed/26/100/100', allianceCode: "RECR" },
  { id: 'u27', rank: 18, name: 'Kube Kingpin', username: 'kube_kingpin', powerScore: 4150, problems: 720, avatar: 'https://picsum.photos/seed/27/100/100', allianceCode: null },
  { id: 'u28', rank: 19, name: 'Go Guru', username: 'go_guru', powerScore: 4100, problems: 710, avatar: 'https://picsum.photos/seed/28/100/100', allianceCode: "JAVA" },
  { id: 'u29', rank: 20, name: 'Rust Rockstar', username: 'rust_rockstar', powerScore: 4050, problems: 700, avatar: 'https://picsum.photos/seed/29/100/100', allianceCode: "BINB" },
  { id: 'u30', rank: 21, name: 'Swift Shogun', username: 'swift_shogun', powerScore: 4000, problems: 690, avatar: 'https://picsum.photos/seed/30/100/100', allianceCode: null },
  { id: 'u31', rank: 22, name: 'Kotlin Commander', username: 'kotlin_commander', powerScore: 3950, problems: 680, avatar: 'https://picsum.photos/seed/31/100/100', allianceCode: "RECR" },
  { id: 'u32', rank: 23, name: 'API Admiral', username: 'api_admiral', powerScore: 3900, problems: 670, avatar: 'https://picsum.photos/seed/32/100/100', allianceCode: "PYPH" },
  { id: 'u33', rank: 24, name: 'DB Dominator', username: 'db_dominator', powerScore: 3850, problems: 660, avatar: 'https://picsum.photos/seed/33/100/100', allianceCode: null },
  { id: 'u34', rank: 25, name: 'ML Maestro', username: 'ml_maestro', powerScore: 3800, problems: 650, avatar: 'https://picsum.photos/seed/34/100/100', allianceCode: "BINB" },
  { id: 'u35', rank: 26, name: 'AI Artisan', username: 'ai_artisan', powerScore: 3750, problems: 640, avatar: 'https://picsum.photos/seed/35/100/100', allianceCode: "JAVA" },
  { id: 'u36', rank: 27, name: 'DevOps Dynamo', username: 'devops_dynamo', powerScore: 3700, problems: 630, avatar: 'https://picsum.photos/seed/36/100/100', allianceCode: null },
  { id: 'u37', rank: 28, name: 'Security Sage', username: 'security_sage', powerScore: 3650, problems: 620, avatar: 'https://picsum.photos/seed/37/100/100', allianceCode: "CSSS" },
  { id: 'u38', rank: 29, name: 'Cloud Captain', username: 'cloud_captain', powerScore: 3600, problems: 610, avatar: 'https://picsum.photos/seed/38/100/100', allianceCode: "RECR" },
  { id: 'u39', rank: 30, name: 'Serverless Sensei', username: 'serverless_sensei', powerScore: 3550, problems: 600, avatar: 'https://picsum.photos/seed/39/100/100', allianceCode: null },
  { id: 'u40', rank: 31, name: 'Frontend Flash', username: 'frontend_flash', powerScore: 3500, problems: 590, avatar: 'https://picsum.photos/seed/40/100/100', allianceCode: "PYPH" },
  { id: 'u41', rank: 32, name: 'Backend Baron', username: 'backend_baron', powerScore: 3450, problems: 580, avatar: 'https://picsum.photos/seed/41/100/100', allianceCode: "BINB" },
  { id: 'u42', rank: 33, name: 'Fullstack Phantom', username: 'fullstack_phantom', powerScore: 3400, problems: 570, avatar: 'https://picsum.photos/seed/42/100/100', allianceCode: null },
  { id: 'u43', rank: 34, name: 'Agile Alchemist', username: 'agile_alchemist', powerScore: 3350, problems: 560, avatar: 'https://picsum.photos/seed/43/100/100', allianceCode: "JAVA" },
  { id: 'u44', rank: 35, name: 'Scrum Sovereign', username: 'scrum_sovereign', powerScore: 3300, problems: 550, avatar: 'https://picsum.photos/seed/44/100/100', allianceCode: null },
  { id: 'u45', rank: 36, name: 'Kanban Knight', username: 'kanban_knight', powerScore: 3250, problems: 540, avatar: 'https://picsum.photos/seed/45/100/100', allianceCode: "RECR" },
  { id: 'u46', rank: 37, name: 'TDD Titan', username: 'tdd_titan', powerScore: 3200, problems: 530, avatar: 'https://picsum.photos/seed/46/100/100', allianceCode: "CSSS" },
  { id: 'u47', rank: 38, name: 'BDD Baroness', username: 'bdd_baroness', powerScore: 3150, problems: 520, avatar: 'https://picsum.photos/seed/47/100/100', allianceCode: null },
  { id: 'u48', rank: 39, name: 'CI/CD Crusader', username: 'cicd_crusader', powerScore: 3100, problems: 510, avatar: 'https://picsum.photos/seed/48/100/100', allianceCode: "BINB" },
  { id: 'u49', rank: 40, name: 'Git Gladiator', username: 'git_gladiator', powerScore: 3050, problems: 500, avatar: 'https://picsum.photos/seed/49/100/100', allianceCode: "PYPH" },
  { id: 'u50', rank: 41, name: 'Version Voyager', username: 'version_voyager', powerScore: 3000, problems: 490, avatar: 'https://picsum.photos/seed/50/100/100', allianceCode: null },
  { id: 'u51', rank: 42, name: 'Shell Shaman', username: 'shell_shaman', powerScore: 2950, problems: 480, avatar: 'https://picsum.photos/seed/51/100/100', allianceCode: "JAVA" },
  { id: 'u1', rank: 43, name: "Cody Clash", username: "cody_clash", powerScore: 2900, problems: 573, isCurrentUser: true, avatar: "https://picsum.photos/seed/1/100/100", allianceCode: "TCC" },
  { id: 'u52', rank: 44, name: 'PowerShell Paladin', username: 'powershell_paladin', powerScore: 2850, problems: 470, avatar: 'https://picsum.photos/seed/52/100/100', allianceCode: null },
  { id: 'u53', rank: 45, name: 'Regex Ruler', username: 'regex_ruler', powerScore: 2800, problems: 460, avatar: 'https://picsum.photos/seed/53/100/100', allianceCode: "RECR" },
  { id: 'u54', rank: 46, name: 'Markup Master', username: 'markup_master', powerScore: 2750, problems: 450, avatar: 'https://picsum.photos/seed/54/100/100', allianceCode: "CSSS" },
  { id: 'u55', rank: 47, name: 'CSS Centurion', username: 'css_centurion', powerScore: 2700, problems: 440, avatar: 'https://picsum.photos/seed/55/100/100', allianceCode: "CSSS" },
  { id: 'u56', rank: 48, name: 'Sass Specialist', username: 'sass_specialist', powerScore: 2650, problems: 430, avatar: 'https://picsum.photos/seed/56/100/100', allianceCode: null },
  { id: 'u57', rank: 49, name: 'LESS Leader', username: 'less_leader', powerScore: 2600, problems: 420, avatar: 'https://picsum.photos/seed/57/100/100', allianceCode: null },
  { id: 'u58', rank: 50, name: 'Web Wizard', username: 'web_wizard', powerScore: 2550, problems: 410, avatar: 'https://picsum.photos/seed/58/100/100', allianceCode: "BINB" },
].sort((a,b) => a.rank - b.rank);

const allianceData = [
  { rank: 1, name: "Recursive Renegades", code: "RECR", powerScore: 250000, members: 50, avatar: "https://picsum.photos/seed/23/100/100", description: "To understand us, you must first understand us." },
  { rank: 2, name: "Binary Brigade", code: "BINB", powerScore: 210500, members: 42, avatar: "https://picsum.photos/seed/20/100/100", description: "Masters of the bit, we operate in 0s and 1s." },
  { rank: 3, name: "Python Phantoms", code: "PYPH", powerScore: 180300, members: 33, avatar: "https://picsum.photos/seed/22/100/100", description: "Elegant code that strikes from the shadows." },
  { rank: 12, name: "The Code Crusaders", code: "TCC", powerScore: 125800, members: 24, isCurrentAlliance: true, avatar: "https://picsum.photos/seed/1/100/100", description: "A group of dedicated coders aiming for the top." },
  { rank: 4, name: "Java Jesters", code: "JAVA", powerScore: 98200, members: 15, avatar: "https://picsum.photos/seed/21/100/100", description: "Coding with a smile, one cup at a time." },
  { rank: 5, name: "CSS Sorcerers", code: "CSSS", powerScore: 85400, members: 18, avatar: "https://picsum.photos/seed/24/100/100", description: "Weaving magic into the web's visual fabric." },
  { rank: 6, name: "Terminal Titans", code: "TERM", powerScore: 82000, members: 20, avatar: "https://picsum.photos/seed/60/100/100", description: "Commanding the command line." },
  { rank: 7, name: "Git Gurus", code: "GITG", powerScore: 79500, members: 22, avatar: "https://picsum.photos/seed/61/100/100", description: "Masters of version control." },
  { rank: 8, name: "API Avengers", code: "APIA", powerScore: 75000, members: 12, avatar: "https://picsum.photos/seed/62/100/100", description: "Connecting the world, one endpoint at a time." },
  { rank: 9, name: "Data Dragons", code: "DATA", powerScore: 72300, members: 28, avatar: "https://picsum.photos/seed/63/100/100", description: "Taming big data with fire." },
  { rank: 10, name: "Stack Survivors", code: "STCK", powerScore: 68000, members: 35, avatar: "https://picsum.photos/seed/64/100/100", description: "Overflowing with knowledge." },
].sort((a,b) => a.rank - b.rank);

const dummyMembers = [
    { name: "Gadget Guru", username: "gadget_guru", role: "Member", avatar: "https://picsum.photos/seed/31/100/100", powerScore: 2100 },
    { name: "Loop Legend", username: "loop_legend", role: "Co-Leader", avatar: "https://picsum.photos/seed/32/100/100", powerScore: 2050 },
    { name: "Function Fox", username: "function_fox", role: "Member", avatar: "https://picsum.photos/seed/33/100/100", powerScore: 1980 },
    { name: "Pointer Prodigy", username: "pointer_prodigy", role: "Leader", avatar: "https://picsum.photos/seed/34/100/100", powerScore: 1950 },
];

const IndividualUserRow = ({ user, isSticky = false }: { user: typeof individualData[0], isSticky?: boolean }) => {
    return (
        <TableRow className={cn(
            isSticky && 'bg-secondary hover:bg-secondary'
        )}>
            <TableCell className="font-medium text-lg w-[80px]">#{user.rank}</TableCell>
            <TableCell>
                <Link href={`/dashboard/profile?user=${user.username}`} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center gap-2">
                           {user.allianceCode && <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">[{user.allianceCode}]</span>}
                           <span className="font-medium">{user.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">@{user.username}</p>
                    </div>
                    {user.isCurrentUser && <Badge>You</Badge>}
                </Link>
            </TableCell>
            <TableCell className="text-right">{user.problems}</TableCell>
            <TableCell className="text-right font-semibold">{user.powerScore.toLocaleString()}</TableCell>
            <TableCell className="text-right w-[50px]">
                {!user.isCurrentUser && (
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
                                <Link href={`/dashboard/profile?user=${user.username}`}>
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

type Alliance = typeof allianceData[0];

const AllianceRow = ({ alliance, isSticky = false, onViewDetails }: { alliance: Alliance, isSticky?: boolean, onViewDetails: (alliance: Alliance) => void }) => {
    return (
        <TableRow
            className={cn(
                "cursor-pointer",
                isSticky && 'bg-secondary hover:bg-secondary'
            )}
            onClick={() => onViewDetails(alliance)}
        >
            <TableCell className="font-medium text-lg w-[80px]">#{alliance.rank}</TableCell>
            <TableCell>
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={alliance.avatar} alt={alliance.name} />
                        <AvatarFallback>{alliance.name.substring(0,1)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{alliance.name}</span>
                        <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">[{alliance.code}]</span>
                    </div>
                    {alliance.isCurrentAlliance && <Badge>Your Alliance</Badge>}
                </div>
            </TableCell>
            <TableCell className="text-right">{alliance.members}</TableCell>
            <TableCell className="text-right font-semibold">{alliance.powerScore.toLocaleString()}</TableCell>
        </TableRow>
    );
}

const AllianceDetailsDialog = ({ alliance, open, onOpenChange, hasAlliance }: { alliance: Alliance | null, open: boolean, onOpenChange: (open: boolean) => void, hasAlliance: boolean }) => {
    const [view, setView] = useState<'details' | 'members'>('details');
    
    if (!alliance) return null;

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            setTimeout(() => {
                setView('details');
            }, 300);
        }
        onOpenChange(isOpen);
    }
    
    const DetailsView = () => (
        <>
            <DialogHeader>
                 <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src={alliance.avatar} alt={alliance.name} />
                        <AvatarFallback>{alliance.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <DialogTitle className="text-2xl flex items-center gap-2">{alliance.name} <span className="text-base font-mono text-muted-foreground bg-muted px-2 py-1 rounded-md">{alliance.code}</span></DialogTitle>
                        <DialogDescription>{alliance.description}</DialogDescription>
                    </div>
                </div>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 text-center my-4">
                <div>
                    <p className="text-sm text-muted-foreground">Rank</p>
                    <p className="text-lg font-bold">#{alliance.rank}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p className="text-lg font-bold">{alliance.members}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Total Power</p>
                    <p className="text-lg font-bold">{alliance.powerScore.toLocaleString()}</p>
                </div>
            </div>
             <DialogFooter className={cn("grid gap-2", (!hasAlliance || alliance.isCurrentAlliance) ? "grid-cols-2" : "grid-cols-1")}>
                 <Button variant="outline" onClick={() => setView('members')}>See Members</Button>
                {alliance.isCurrentAlliance ? (
                    <Button asChild>
                        <Link href="/dashboard/alliance">View Alliance Page</Link>
                    </Button>
                ) : !hasAlliance ? (
                    <Button>Request to Join</Button>
                ) : null }
            </DialogFooter>
        </>
    );

    const roleOrder: { [key: string]: number } = { 'Leader': 1, 'Co-Leader': 2, 'Member': 3 };

    const OtherAllianceMemberRow = ({ member }: { member: (typeof dummyMembers)[0] }) => {
        return (
             <TableRow>
                <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={member.avatar} alt={member.name} />
                            <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{member.name}</p>
                            <p className="text-sm text-muted-foreground">@{member.username}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                            <Star className="w-4 h-4 mr-1 text-primary" />
                            <span>{member.powerScore.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </TableCell>
                <TableCell className="text-right">
                    <Badge variant={member.role === "Leader" ? "default" : "secondary"}>{member.role}</Badge>
                </TableCell>
            </TableRow>
        );
    };

    const MembersView = () => (
        <>
            <DialogHeader>
                 <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => setView('details')}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <DialogTitle>Members of {alliance.name}</DialogTitle>
                 </div>
            </DialogHeader>
            <div className="max-h-[50vh] overflow-y-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Member</TableHead>
                            <TableHead className="text-right">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dummyMembers.slice().sort((a, b) => {
                            const roleA = roleOrder[a.role] || 99;
                            const roleB = roleOrder[b.role] || 99;
                            if (roleA !== roleB) {
                                return roleA - roleB;
                            }
                            return a.name.localeCompare(b.name);
                        }).map(member => (
                            <OtherAllianceMemberRow key={member.name} member={member} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    );

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                {view === 'details' ? <DetailsView /> : <MembersView />}
            </DialogContent>
        </Dialog>
    );
};

export default function LeaderboardsPage() {
    const currentUser = individualData.find(user => user.isCurrentUser);
    const currentAlliance = allianceData.find(alliance => alliance.isCurrentAlliance);

    const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
    const [isAllianceDetailsOpen, setIsAllianceDetailsOpen] = useState(false);

    const handleViewAllianceDetails = (alliance: Alliance) => {
        setSelectedAlliance(alliance);
        setIsAllianceDetailsOpen(true);
    };

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
                    {allianceData.filter(a => !a.isCurrentAlliance).map((alliance) => (
                        <AllianceRow key={alliance.rank} alliance={alliance} onViewDetails={handleViewAllianceDetails}/>
                    ))}
                </TableBody>
                </Table>
                {currentAlliance && (
                     <div className="sticky bottom-0 -mx-6 -mb-6 mt-4">
                        <Table>
                            <TableBody>
                                 <AllianceRow alliance={currentAlliance} isSticky onViewDetails={handleViewAllianceDetails} />
                            </TableBody>
                        </Table>
                    </div>
                )}
            </TabsContent>
            </Tabs>
        </CardContent>
        </Card>
        <AllianceDetailsDialog alliance={selectedAlliance} open={isAllianceDetailsOpen} onOpenChange={setIsAllianceDetailsOpen} hasAlliance={!!currentAlliance} />
    </div>
  );
}

    