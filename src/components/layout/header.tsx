

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
    { id: 'fr4', name: 'Request User 4', username: 'req_user_4', avatar: 'https://picsum.photos/seed/204/100/100', allianceCode: 'RECR' },
    { id: 'fr5', name: 'Request User 5', username: 'req_user_5', avatar: 'https://picsum.photos/seed/205/100/100', allianceCode: 'CSSS' },
    { id: 'fr6', name: 'Request User 6', username: 'req_user_6', avatar: 'https://picsum.photos/seed/206/100/100', allianceCode: 'TCC' },
    { id: 'fr7', name: 'Request User 7', username: 'req_user_7', avatar: 'https://picsum.photos/seed/207/100/100', allianceCode: 'BINB' },
    { id: 'fr8', name: 'Request User 8', username: 'req_user_8', avatar: 'https://picsum.photos/seed/208/100/100', allianceCode: 'PYPH' },
    { id: 'fr9', name: 'Request User 9', username: 'req_user_9', avatar: 'https://picsum.photos/seed/209/100/100', allianceCode: 'JAVA' },
    { id: 'fr10', name: 'Request User 10', username: 'req_user_10', avatar: 'https://picsum.photos/seed/210/100/100', allianceCode: 'RECR' },
    { id: 'fr11', name: 'Request User 11', username: 'req_user_11', avatar: 'https://picsum.photos/seed/211/100/100', allianceCode: 'CSSS' },
    { id: 'fr12', name: 'Request User 12', username: 'req_user_12', avatar: 'https://picsum.photos/seed/212/100/100', allianceCode: 'TCC' },
    { id: 'fr13', name: 'Request User 13', username: 'req_user_13', avatar: 'https://picsum.photos/seed/213/100/100', allianceCode: 'BINB' },
    { id: 'fr14', name: 'Request User 14', username: 'req_user_14', avatar: 'https://picsum.photos/seed/214/100/100', allianceCode: 'PYPH' },
    { id: 'fr15', name: 'Request User 15', username: 'req_user_15', avatar: 'https://picsum.photos/seed/215/100/100', allianceCode: 'JAVA' },
    { id: 'fr16', name: 'Request User 16', username: 'req_user_16', avatar: 'https://picsum.photos/seed/216/100/100', allianceCode: 'RECR' },
    { id: 'fr17', name: 'Request User 17', username: 'req_user_17', avatar: 'https://picsum.photos/seed/217/100/100', allianceCode: 'CSSS' },
    { id: 'fr18', name: 'Request User 18', username: 'req_user_18', avatar: 'https://picsum.photos/seed/218/100/100', allianceCode: 'TCC' },
    { id: 'fr19', name: 'Request User 19', username: 'req_user_19', avatar: 'https://picsum.photos/seed/219/100/100', allianceCode: 'BINB' },
    { id: 'fr20', name: 'Request User 20', username: 'req_user_20', avatar: 'https://picsum.photos/seed/220/100/100', allianceCode: 'PYPH' },
    { id: 'fr21', name: 'Request User 21', username: 'req_user_21', avatar: 'https://picsum.photos/seed/221/100/100', allianceCode: 'JAVA' },
    { id: 'fr22', name: 'Request User 22', username: 'req_user_22', avatar: 'https://picsum.photos/seed/222/100/100', allianceCode: 'RECR' },
    { id: 'fr23', name: 'Request User 23', username: 'req_user_23', avatar: 'https://picsum.photos/seed/223/100/100', allianceCode: 'CSSS' },
    { id: 'fr24', name: 'Request User 24', username: 'req_user_24', avatar: 'https://picsum.photos/seed/224/100/100', allianceCode: 'TCC' },
    { id: 'fr25', name: 'Request User 25', username: 'req_user_25', avatar: 'https://picsum.photos/seed/225/100/100', allianceCode: 'BINB' },
    { id: 'fr26', name: 'Request User 26', username: 'req_user_26', avatar: 'https://picsum.photos/seed/226/100/100', allianceCode: 'PYPH' },
    { id: 'fr27', name: 'Request User 27', username: 'req_user_27', avatar: 'https://picsum.photos/seed/227/100/100', allianceCode: 'JAVA' },
    { id: 'fr28', name: 'Request User 28', username: 'req_user_28', avatar: 'https://picsum.photos/seed/228/100/100', allianceCode: 'RECR' },
    { id: 'fr29', name: 'Request User 29', username: 'req_user_29', avatar: 'https://picsum.photos/seed/229/100/100', allianceCode: 'CSSS' },
    { id: 'fr30', name: 'Request User 30', username: 'req_user_30', avatar: 'https://picsum.photos/seed/230/100/100', allianceCode: 'TCC' },
    { id: 'fr31', name: 'Request User 31', username: 'req_user_31', avatar: 'https://picsum.photos/seed/231/100/100', allianceCode: 'BINB' },
    { id: 'fr32', name: 'Request User 32', username: 'req_user_32', avatar: 'https://picsum.photos/seed/232/100/100', allianceCode: 'PYPH' },
    { id: 'fr33', name: 'Request User 33', username: 'req_user_33', avatar: 'https://picsum.photos/seed/233/100/100', allianceCode: 'JAVA' },
    { id: 'fr34', name: 'Request User 34', username: 'req_user_34', avatar: 'https://picsum.photos/seed/234/100/100', allianceCode: 'RECR' },
    { id: 'fr35', name: 'Request User 35', username: 'req_user_35', avatar: 'https://picsum.photos/seed/235/100/100', allianceCode: 'CSSS' },
    { id: 'fr36', name: 'Request User 36', username: 'req_user_36', avatar: 'https://picsum.photos/seed/236/100/100', allianceCode: 'TCC' },
    { id: 'fr37', name: 'Request User 37', username: 'req_user_37', avatar: 'https://picsum.photos/seed/237/100/100', allianceCode: 'BINB' },
    { id: 'fr38', name: 'Request User 38', username: 'req_user_38', avatar: 'https://picsum.photos/seed/238/100/100', allianceCode: 'PYPH' },
    { id: 'fr39', name: 'Request User 39', username: 'req_user_39', avatar: 'https://picsum.photos/seed/239/100/100', allianceCode: 'JAVA' },
    { id: 'fr40', name: 'Request User 40', username: 'req_user_40', avatar: 'https://picsum.photos/seed/240/100/100', allianceCode: 'RECR' },
    { id: 'fr41', name: 'Request User 41', username: 'req_user_41', avatar: 'https://picsum.photos/seed/241/100/100', allianceCode: 'CSSS' },
    { id: 'fr42', name: 'Request User 42', username: 'req_user_42', avatar: 'https://picsum.photos/seed/242/100/100', allianceCode: 'TCC' },
    { id: 'fr43', name: 'Request User 43', username: 'req_user_43', avatar: 'https://picsum.photos/seed/243/100/100', allianceCode: 'BINB' },
    { id: 'fr44', name: 'Request User 44', username: 'req_user_44', avatar: 'https://picsum.photos/seed/244/100/100', allianceCode: 'PYPH' },
    { id: 'fr45', name: 'Request User 45', username: 'req_user_45', avatar: 'https://picsum.photos/seed/245/100/100', allianceCode: 'JAVA' },
    { id: 'fr46', name: 'Request User 46', username: 'req_user_46', avatar: 'https://picsum.photos/seed/246/100/100', allianceCode: 'RECR' },
    { id: 'fr47', name: 'Request User 47', username: 'req_user_47', avatar: 'https://picsum.photos/seed/247/100/100', allianceCode: 'CSSS' },
    { id: 'fr48', name: 'Request User 48', username: 'req_user_48', avatar: 'https://picsum.photos/seed/248/100/100', allianceCode: 'TCC' },
    { id: 'fr49', name: 'Request User 49', username: 'req_user_49', avatar: 'https://picsum.photos/seed/249/100/100', allianceCode: 'BINB' },
    { id: 'fr50', name: 'Request User 50', username: 'req_user_50', avatar: 'https://picsum.photos/seed/250/100/100', allianceCode: 'PYPH' },
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
                    <ScrollArea className="h-96">
                        <div className="space-y-4 py-4 pr-6">
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
                    </ScrollArea>
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
