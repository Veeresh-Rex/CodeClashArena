
"use client";

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
import { Flame, Search, Star, Users, MessageSquare, User, ShieldX } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import Link from "next/link";
import { cn } from "@/lib/utils";


const myAlliance = {
  name: "The Code Crusaders",
  members: 24,
  rank: 12,
  powerScore: 125800,
  description: "A group of dedicated coders aiming for the top.",
  membersList: [
    { name: "Cody Clash", role: "Leader", avatar: "https://picsum.photos/seed/1/100/100", powerScore: 2900, online: true, isCurrentUser: true },
    { name: "Syntax Slayer", role: "Co-Leader", avatar: "https://picsum.photos/seed/2/100/100", powerScore: 2750, online: false },
    { name: "Algo Queen", role: "Member", avatar: "https://picsum.photos/seed/3/100/100", powerScore: 2600, online: true },
    { name: "Byte Baron", role: "Member", avatar: "https://picsum.photos/seed/4/100/100", powerScore: 2550, online: false },
    { name: "Pixel Pioneer", role: "Member", avatar: "https://picsum.photos/seed/5/100/100", powerScore: 2400, online: true },
  ],
};

const otherAlliances = [
  { name: "Binary Brigade", members: 42, powerScore: 210500 },
  { name: "Java Jesters", members: 15, powerScore: 98200 },
  { name: "Python Phantoms", members: 33, powerScore: 180300 },
  { name: "Recursive Renegades", members: 50, powerScore: 250000 },
  { name: "CSS Sorcerers", members: 18, powerScore: 85400 },
];


const MemberRow = ({ member }: { member: (typeof myAlliance.membersList)[0] }) => {
  const content = (
    <TableRow className="cursor-pointer">
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
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FindAlliancesDialog = () => (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="outline" className="w-full">Find an Alliance</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
             <DialogHeader>
                <DialogTitle>Find Alliances</DialogTitle>
                <DialogDescription>Search for an alliance to join or browse the list.</DialogDescription>
            </DialogHeader>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-8" />
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
                        <TableCell className="font-medium">{alliance.name}</TableCell>
                        <TableCell>{alliance.members}</TableCell>
                        <TableCell>{alliance.powerScore.toLocaleString()}</TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DialogContent>
    </Dialog>
)

export default function AlliancesPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                <CardTitle className="text-2xl">{myAlliance.name}</CardTitle>
                <CardDescription>{myAlliance.description}</CardDescription>
                </div>
                <Button>Manage Alliance</Button>
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
                    {myAlliance.membersList.map((member) => (
                        <MemberRow key={member.name} member={member} />
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
                <CardContent>
                    <FindAlliancesDialog />
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
