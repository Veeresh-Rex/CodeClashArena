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
import { Flame, Search, Star, Users } from "lucide-react";

const myAlliance = {
  name: "The Code Crusaders",
  members: 24,
  rank: 12,
  powerScore: 125800,
  description: "A group of dedicated coders aiming for the top.",
  membersList: [
    { name: "Cody Clash", role: "Leader", avatar: "https://picsum.photos/seed/1/100/100", powerScore: 2900 },
    { name: "Syntax Slayer", role: "Co-Leader", avatar: "https://picsum.photos/seed/2/100/100", powerScore: 2750 },
    { name: "Algo Queen", role: "Member", avatar: "https://picsum.photos/seed/3/100/100", powerScore: 2600 },
    { name: "Byte Baron", role: "Member", avatar: "https://picsum.photos/seed/4/100/100", powerScore: 2550 },
    { name: "Pixel Pioneer", role: "Member", avatar: "https://picsum.photos/seed/5/100/100", powerScore: 2400 },
  ],
};

const otherAlliances = [
  { name: "Binary Brigade", members: 42, powerScore: 210500 },
  { name: "Java Jesters", members: 15, powerScore: 98200 },
  { name: "Python Phantoms", members: 33, powerScore: 180300 },
  { name: "Recursive Renegades", members: 50, powerScore: 250000 },
  { name: "CSS Sorcerers", members: 18, powerScore: 85400 },
];

export default function AlliancesPage() {
  return (
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
                  <TableRow key={member.name}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name}/>
                          <AvatarFallback>{member.name.substring(0,2)}</AvatarFallback>
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
                      <Badge variant={member.role === "Leader" ? "default" : "secondary"}>{member.role}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Find Alliances</CardTitle>
            <CardDescription>Search for an alliance to join.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="relative mb-4">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by name..." className="pl-8" />
              </div>
            <Table>
               <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="text-right">Members</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {otherAlliances.map((alliance) => (
                  <TableRow key={alliance.name}>
                    <TableCell className="font-medium">{alliance.name}</TableCell>
                    <TableCell className="text-right">{alliance.members}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">View</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create Alliance</CardTitle>
             <CardDescription>Can't find one? Create your own!</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <Input placeholder="Alliance Name" />
             <Button className="w-full">Create</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
