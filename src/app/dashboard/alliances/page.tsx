
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Flame, Search, Star, Users, MessageSquare, User, ShieldX, ArrowLeft, Megaphone, Pencil, UserMinus, ArrowUpCircle, ArrowDownCircle, Upload, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
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
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";


const myAlliance = {
  name: "The Code Crusaders",
  members: 24,
  rank: 12,
  powerScore: 125800,
  description: "A group of dedicated coders aiming for the top.",
  notice: "The next Alliance War starts this Friday! Be ready to crush it. We will be focusing on graph problems.",
  noticeLastModifiedBy: "Syntax Slayer",
  noticeLastModifiedTime: "2 hours ago",
  avatar: "https://picsum.photos/seed/1/100/100",
  membersList: [
    { name: "Syntax Slayer", role: "Leader", avatar: "https://picsum.photos/seed/2/100/100", powerScore: 2750, online: false },
    { name: "Cody Clash", role: "Member", avatar: "https://picsum.photos/seed/1/100/100", powerScore: 2900, online: true, isCurrentUser: true },
    { name: "Algo Queen", role: "Member", avatar: "https://picsum.photos/seed/3/100/100", powerScore: 2600, online: true },
    { name: "Byte Baron", role: "Member", avatar: "https://picsum.photos/seed/4/100/100", powerScore: 2550, online: false },
    { name: "Pixel Pioneer", role: "Member", avatar: "https://picsum.photos/seed/5/100/100", powerScore: 2400, online: true },
  ],
};

const otherAlliances = [
  { name: "Binary Brigade", members: 42, powerScore: 210500, description: "Masters of the bit, we operate in 0s and 1s.", rank: 2, avatar: "https://picsum.photos/seed/20/100/100", code: "BINB" },
  { name: "Java Jesters", members: 15, powerScore: 98200, description: "Coding with a smile, one cup at a time.", rank: 4, avatar: "https://picsum.photos/seed/21/100/100", code: "JAVA" },
  { name: "Python Phantoms", members: 33, powerScore: 180300, description: "Elegant code that strikes from the shadows.", rank: 3, avatar: "https://picsum.photos/seed/22/100/100", code: "PYPH" },
  { name: "Recursive Renegades", members: 50, powerScore: 250000, description: "To understand us, you must first understand us.", rank: 1, avatar: "https://picsum.photos/seed/23/100/100", code: "RECR" },
  { name: "CSS Sorcerers", members: 18, powerScore: 85400, description: "Weaving magic into the web's visual fabric.", rank: 5, avatar: "https://picsum.photos/seed/24/100/100", code: "CSSS" },
];

const dummyMembers = [
    { name: "Gadget Guru", role: "Member", avatar: "https://picsum.photos/seed/31/100/100", powerScore: 2100 },
    { name: "Loop Legend", role: "Member", avatar: "https://picsum.photos/seed/32/100/100", powerScore: 2050 },
    { name: "Function Fox", role: "Member", avatar: "https://picsum.photos/seed/33/100/100", powerScore: 1980 },
    { name: "Pointer Prodigy", role: "Member", avatar: "https://picsum.photos/seed/34/100/100", powerScore: 1950 },
];


const MemberRow = ({ member, currentUserRole }: { member: (typeof myAlliance.membersList)[0], currentUserRole?: string }) => {
  const content = (
    <TableRow className={cn("cursor-pointer", member.isCurrentUser && "bg-primary/10 hover:bg-primary/20")}>
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              {member.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />}
          </div>
          <div>
            <p className="font-semibold">{member.name}</p>
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

  if (member.isCurrentUser) {
      return content;
  }

  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            {content}
        </DropdownMenuTrigger>
        <DropdownMenuContent>
             <DropdownMenuItem asChild>
                <Link href={`/dashboard/chat?user=${encodeURIComponent(member.name)}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Chat</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    <span>See Profile</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                <ShieldX className="mr-2 h-4 w-4" />
                <span>Block</span>
            </DropdownMenuItem>
            {currentUserRole === 'Leader' && member.role !== 'Leader' && (
                <>
                    <DropdownMenuSeparator />
                    {member.role === 'Member' && (
                        <DropdownMenuItem>
                            <ArrowUpCircle className="mr-2 h-4 w-4" />
                            <span>Promote to Co-Leader</span>
                        </DropdownMenuItem>
                    )}
                    {member.role === 'Co-Leader' && (
                         <DropdownMenuItem>
                            <ArrowDownCircle className="mr-2 h-4 w-4" />
                            <span>Demote to Member</span>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:bg-red-500/10">
                        <UserMinus className="mr-2 h-4 w-4" />
                        <span>Remove from Alliance</span>
                    </DropdownMenuItem>
                </>
            )}
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

type Alliance = typeof otherAlliances[0];

const AllianceDetailsDialog = ({ alliance, open, onOpenChange }: { alliance: Alliance | null, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [view, setView] = useState<'details' | 'members'>('details');

    if (!alliance) return null;

    const handleClose = (isOpen: boolean) => {
        if (!isOpen) {
            setTimeout(() => setView('details'), 300); // reset view after dialog closes
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
            <DialogFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={() => setView('members')}>See Members</Button>
                <Button>Request to Join</Button>
            </DialogFooter>
        </>
    );

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
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Member</TableHead>
                        <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dummyMembers.map(member => (
                         <TableRow key={member.name}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={member.avatar} alt={member.name} />
                                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{member.name}</p>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                        <Star className="w-4 h-4 mr-1 text-primary" />
                                        <span>{member.powerScore.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge variant="secondary">{member.role}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
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


const FindAlliancesDialog = () => {
    const [selectedAlliance, setSelectedAlliance] = useState<Alliance | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleViewDetails = (alliance: Alliance) => {
        setSelectedAlliance(alliance);
        setIsDetailsOpen(true);
    };

    return (
    <>
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="w-full">Find an Alliance</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                 <DialogHeader>
                    <DialogTitle>Find Alliances</DialogTitle>
                    <DialogDescription>Search for an alliance to join or browse the list.</DialogDescription>
                </DialogHeader>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by name or code..." className="pl-8" />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Power Score</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {otherAlliances.map((alliance) => (
                        <TableRow key={alliance.name}>
                            <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={alliance.avatar} alt={alliance.name} />
                                        <AvatarFallback>{alliance.name.substring(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex items-center gap-2">
                                        <span>{alliance.name}</span>
                                        <span className="font-mono text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded-sm">[{alliance.code}]</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>{alliance.members}</TableCell>
                            <TableCell>{alliance.powerScore.toLocaleString()}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm" onClick={() => handleViewDetails(alliance)}>View Details</Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
        <AllianceDetailsDialog alliance={selectedAlliance} open={isDetailsOpen} onOpenChange={setIsDetailsOpen} />
    </>
    )
}

const ManageAllianceDialog = ({ alliance }: { alliance: typeof myAlliance }) => (
    <Dialog>
        <DialogTrigger asChild>
            <Button>Manage Alliance</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
                <DialogTitle>Manage Alliance</DialogTitle>
                <DialogDescription>Update your alliance settings here.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
                <div className="flex items-center gap-6">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={alliance.avatar} alt={alliance.name} />
                        <AvatarFallback>{alliance.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Change Avatar</Button>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="alliance-name">Alliance Name</Label>
                        <Input id="alliance-name" defaultValue={alliance.name} maxLength={20} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="alliance-code">Alliance Code</Label>
                        <Input id="alliance-code" defaultValue={alliance.name.substring(0,5).toUpperCase()} maxLength={5} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="alliance-description">Alliance Description</Label>
                    <Textarea id="alliance-description" defaultValue={alliance.description} className="min-h-24" />
                </div>
            </div>
            <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Save Changes</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

const LeaveAllianceDialog = () => (
    <AlertDialog>
        <AlertDialogTrigger asChild>
             <Button variant="destructive" className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Leave Alliance
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. You will be removed from the alliance and will lose any alliance-specific roles or permissions.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Leave</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
);


export default function AlliancesPage() {
  const currentUser = myAlliance.membersList.find(m => m.isCurrentUser);
  const canEditNotice = currentUser?.role === 'Leader' || currentUser?.role === 'Co-Leader';
  const isLeader = currentUser?.role === 'Leader';

  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
             <Card className="bg-primary/10 border-primary/30">
                <CardHeader className="flex flex-row items-start justify-between">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/20 rounded-full">
                            <Megaphone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <CardTitle>Alliance Notice</CardTitle>
                            <CardDescription className="text-primary-foreground/80">Last updated by {myAlliance.noticeLastModifiedBy} &bull; {myAlliance.noticeLastModifiedTime}</CardDescription>
                        </div>
                    </div>
                    {canEditNotice && (
                         <Button variant="ghost" size="icon">
                            <Pencil className="h-5 w-5 text-primary" />
                        </Button>
                    )}
                </CardHeader>
                <CardContent>
                    <p className="text-lg font-medium">{myAlliance.notice}</p>
                </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                <CardTitle className="text-2xl">{myAlliance.name}</CardTitle>
                <CardDescription>{myAlliance.description}</CardDescription>
                </div>
                {isLeader && <ManageAllianceDialog alliance={myAlliance} />}
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="flex items-center gap-4 rounded-lg border p-4">
                    <Users className="h-8 w-8 text-primary" />
                    <div>
                    <p className="text-sm text-muted-foreground">Members</p>
                    <p className="text-xl font-bold">{myAlliance.members}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                    <Flame className="h-8 w-8 text-primary" />
                    <div>
                    <p className="text-sm text-muted-foreground">Alliance Rank</p>
                    <p className="text-xl font-bold">#{myAlliance.rank}</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 rounded-lg border p-4">
                    <Star className="h-8 w-8 text-primary" />
                    <div>
                    <p className="text-sm text-muted-foreground">Total Power</p>
                    <p className="text-xl font-bold">{myAlliance.powerScore.toLocaleString()}</p>
                    </div>
                </div>
                </div>
                <h3 className="text-lg font-semibold mb-4">Members</h3>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead className="text-right">Role</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {myAlliance.membersList.slice().sort((a, b) => {
                        if (a.isCurrentUser) return -1;
                        if (b.isCurrentUser) return 1;
                        if (a.role === 'Leader') return -1;
                        if (b.role === 'Leader') return 1;
                        if (a.role === 'Co-Leader') return -1;
                        if (b.role === 'Co-Leader') return 1;
                        return 0;
                    }).map((member) => (
                        <MemberRow key={member.name} member={member} currentUserRole={currentUser?.role} />
                    ))}
                </TableBody>
                </Table>
            </CardContent>
            </Card>
        </div>

        <div className="space-y-6">
             <Card>
                <CardHeader>
                    <CardTitle>Alliance Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <FindAlliancesDialog />
                    {!isLeader && <LeaveAllianceDialog />}
                </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Create Alliance</CardTitle>
                <CardDescription>Can't find one? Create your own!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Input placeholder="Alliance Name (max 20 chars)" maxLength={20} />
                <Input placeholder="Alliance Code (max 5 chars)" maxLength={5} />
                <Button className="w-full">Create</Button>
            </CardContent>
            </Card>
        </div>
        </div>
    </div>
  );
}

    