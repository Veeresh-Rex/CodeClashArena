

"use client";

import Link from "next/link";
import { Bell, Search, UserPlus, Users, Trophy, User, ShieldX, UserX, MessageSquare, Check, X } from "lucide-react";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { friendsList } from "@/lib/friends";

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/leaderboards': 'Leaderboards',
  '/dashboard/alliance': 'Alliance',
  '/dashboard/chat': 'Chat',
  '/dashboard/social': 'Social',
  '/dashboard/recommendations': 'AI Mentor',
  '/dashboard/profile': 'My Profile',
  '/dashboard/notifications': 'Notifications',
};

const friendRequests = [
    { id: 'fr1', name: 'Syntax Samurai', username: 'syntax_samurai', avatar: 'https://picsum.photos/seed/11/100/100', allianceCode: 'BINB' },
    { id: 'fr2', name: 'Boolean Bard', username: 'boolean_bard', avatar: 'https://picsum.photos/seed/12/100/100', allianceCode: 'PYPH' },
    { id: 'fr3', name: 'Kernel Knight', username: 'kernel_knight', avatar: 'https://picsum.photos/seed/15/100/100', allianceCode: 'JAVA' },
];

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'CodeClash Arena';
  const [isClient, setIsClient] = useState(false);
  const [requests, setRequests] = useState(friendRequests);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const sortedFriends = [...friendsList].sort((a, b) => {
    if (a.online && !b.online) return -1;
    if (!a.online && b.online) return 1;
    return a.name.localeCompare(b.name);
  });

  const handleRequest = (requestId: string) => {
    setRequests(prev => prev.filter(r => r.id !== requestId));
  }

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className={cn(!isClient && "hidden")} />
        <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
      </div>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
         <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Users className="h-5 w-5" />
              <span className="sr-only">Toggle friends list</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Friends</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-96">
              {sortedFriends.map(friend => (
                  <DropdownMenuSub key={friend.name}>
                      <DropdownMenuSubTrigger>
                          <div className="flex items-center justify-between w-full">
                              <div className="flex items-center gap-3">
                                  <Avatar className="h-8 w-8">
                                      <AvatarImage src={friend.avatar} alt={friend.name} />
                                      <AvatarFallback>{friend.name.substring(0,2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                      <span className="text-muted-foreground mr-1 text-sm">[{friend.allianceCode}]</span>
                                      <span className="font-medium ml-1">{friend.name}</span>
                                  </div>
                              </div>
                              {friend.online && <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />}
                          </div>
                      </DropdownMenuSubTrigger>
                       <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                               <DropdownMenuItem asChild>
                                 <Link href={`/dashboard/chat?user=${encodeURIComponent(friend.name)}`}>
                                   <MessageSquare className="mr-2 h-4 w-4" />
                                   <span>Chat</span>
                                 </Link>
                               </DropdownMenuItem>
                               <DropdownMenuItem asChild>
                                 <Link href={`/dashboard/profile?user=${friend.username}`}>
                                   <User className="mr-2 h-4 w-4" />
                                   <span>See Profile</span>
                                 </Link>
                               </DropdownMenuItem>
                               <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                 <UserX className="mr-2 h-4 w-4" />
                                 <span>Unfriend</span>
                                </DropdownMenuItem>
                               <DropdownMenuItem className="text-red-500 focus:text-red-500">
                                  <ShieldX className="mr-2 h-4 w-4" />
                                  <span>Block</span>
                                </DropdownMenuItem>
                          </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                  </DropdownMenuSub>
              ))}
            </ScrollArea>
             <DropdownMenuSeparator />
             <Dialog>
                <DialogTrigger asChild>
                    <DropdownMenuItem 
                        onSelect={(e) => e.preventDefault()} 
                        className="justify-center text-sm text-muted-foreground hover:text-primary focus:bg-accent focus:text-primary"
                    >
                        See Friend Requests
                    </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Friend Requests</DialogTitle>
                        <DialogDescription>
                            Accept or decline requests from other coders.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        {requests.length > 0 ? requests.map(req => (
                            <div key={req.id} className="flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={req.avatar} alt={req.name} />
                                        <AvatarFallback>{req.name.substring(0,2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{req.name}</p>
                                        <p className="text-sm text-muted-foreground">@{req.username}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" onClick={() => handleRequest(req.id)}><Check className="h-4 w-4 mr-1" /> Accept</Button>
                                    <Button size="icon" variant="ghost" onClick={() => handleRequest(req.id)}><X className="h-4 w-4" /></Button>
                                </div>
                            </div>
                        )) : <p className="text-sm text-muted-foreground text-center">No new friend requests.</p>}
                    </div>
                </DialogContent>
             </Dialog>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <UserPlus className="mr-3 h-5 w-5 text-primary" />
                <div className="flex flex-col">
                  <span className="font-medium">New friend request</span>
                  <span className="text-xs text-muted-foreground">From @syntax_samurai</span>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem>
                <Users className="mr-3 h-5 w-5 text-primary" />
                 <div className="flex flex-col">
                  <span className="font-medium">Alliance Announcement</span>
                  <span className="text-xs text-muted-foreground">New event starting soon!</span>
                </div>
            </DropdownMenuItem>
             <DropdownMenuItem>
                <Trophy className="mr-3 h-5 w-5 text-accent" />
                 <div className="flex flex-col">
                  <span className="font-medium">You've been promoted!</span>
                  <span className="text-xs text-muted-foreground">New rank: #1200</span>
                </div>
            </DropdownMenuItem>
             <DropdownMenuSeparator />
             <DropdownMenuItem asChild className="justify-center text-sm text-muted-foreground hover:text-primary">
                <Link href="/dashboard/notifications">
                    See all notifications
                </Link>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
               <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/seed/1/100/100" data-ai-hint="profile avatar" alt="User Avatar" />
                <AvatarFallback>CA</AvatarFallback>
              </Avatar>
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><Link href="/dashboard/profile">Profile</Link></DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
