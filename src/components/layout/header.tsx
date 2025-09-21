

"use client";

import Link from "next/link";
import { Bell, Search, UserPlus, Users, Trophy, User, ShieldX, UserX, MessageSquare, Heart } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

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

const friendsList = [
    { name: "Byte Baron", username: 'byte_baron', allianceCode: "TCC", avatar: "https://picsum.photos/seed/4/100/100", online: true },
    { name: "Syntax Slayer", username: 'syntax_slayer', allianceCode: "TCC", avatar: "https://picsum.photos/seed/2/100/100", online: false },
    { name: "Algo Queen", username: 'algo_queen', allianceCode: "TCC", avatar: "https://picsum.photos/seed/3/100/100", online: true },
    { name: "Pixel Pioneer", username: 'pixel_pioneer', allianceCode: "TCC", avatar: "https://picsum.photos/seed/5/100/100", online: false },
    { name: "Data Diva", username: 'data_diva', allianceCode: "PYPH", avatar: "https://picsum.photos/seed/14/100/100", online: true },
    { name: "Friend 6", username: "friend_6", allianceCode: "RECR", avatar: "https://picsum.photos/seed/106/100/100", online: true },
    { name: "Friend 7", username: "friend_7", allianceCode: "BINB", avatar: "https://picsum.photos/seed/107/100/100", online: false },
    { name: "Friend 8", username: "friend_8", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/108/100/100", online: true },
    { name: "Friend 9", username: "friend_9", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/109/100/100", online: false },
    { name: "Friend 10", username: "friend_10", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/110/100/100", online: true },
    { name: "Friend 11", username: "friend_11", allianceCode: "TCC", avatar: "https://picsum.photos/seed/111/100/100", online: false },
    { name: "Friend 12", username: "friend_12", allianceCode: "RECR", avatar: "https://picsum.photos/seed/112/100/100", online: true },
    { name: "Friend 13", username: "friend_13", allianceCode: "BINB", avatar: "https://picsum.photos/seed/113/100/100", online: false },
    { name: "Friend 14", username: "friend_14", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/114/100/100", online: true },
    { name: "Friend 15", username: "friend_15", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/115/100/100", online: false },
    { name: "Friend 16", username: "friend_16", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/116/100/100", online: true },
    { name: "Friend 17", username: "friend_17", allianceCode: "TCC", avatar: "https://picsum.photos/seed/117/100/100", online: false },
    { name: "Friend 18", username: "friend_18", allianceCode: "RECR", avatar: "https://picsum.photos/seed/118/100/100", online: true },
    { name: "Friend 19", username: "friend_19", allianceCode: "BINB", avatar: "https://picsum.photos/seed/119/100/100", online: false },
    { name: "Friend 20", username: "friend_20", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/120/100/100", online: true },
    { name: "Friend 21", username: "friend_21", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/121/100/100", online: false },
    { name: "Friend 22", username: "friend_22", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/122/100/100", online: true },
    { name: "Friend 23", username: "friend_23", allianceCode: "TCC", avatar: "https://picsum.photos/seed/123/100/100", online: false },
    { name: "Friend 24", username: "friend_24", allianceCode: "RECR", avatar: "https://picsum.photos/seed/124/100/100", online: true },
    { name: "Friend 25", username: "friend_25", allianceCode: "BINB", avatar: "https://picsum.photos/seed/125/100/100", online: false },
    { name: "Friend 26", username: "friend_26", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/126/100/100", online: true },
    { name: "Friend 27", username: "friend_27", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/127/100/100", online: false },
    { name: "Friend 28", username: "friend_28", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/128/100/100", online: true },
    { name: "Friend 29", username: "friend_29", allianceCode: "TCC", avatar: "https://picsum.photos/seed/129/100/100", online: false },
    { name: "Friend 30", username: "friend_30", allianceCode: "RECR", avatar: "https://picsum.photos/seed/130/100/100", online: true },
    { name: "Friend 31", username: "friend_31", allianceCode: "BINB", avatar: "https://picsum.photos/seed/131/100/100", online: false },
    { name: "Friend 32", username: "friend_32", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/132/100/100", online: true },
    { name: "Friend 33", username: "friend_33", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/133/100/100", online: false },
    { name: "Friend 34", username: "friend_34", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/134/100/100", online: true },
    { name: "Friend 35", username: "friend_35", allianceCode: "TCC", avatar: "https://picsum.photos/seed/135/100/100", online: false },
    { name: "Friend 36", username: "friend_36", allianceCode: "RECR", avatar: "https://picsum.photos/seed/136/100/100", online: true },
    { name: "Friend 37", username: "friend_37", allianceCode: "BINB", avatar: "https://picsum.photos/seed/137/100/100", online: false },
    { name: "Friend 38", username: "friend_38", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/138/100/100", online: true },
    { name: "Friend 39", username: "friend_39", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/139/100/100", online: false },
    { name: "Friend 40", username: "friend_40", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/140/100/100", online: true },
    { name: "Friend 41", username: "friend_41", allianceCode: "TCC", avatar: "https://picsum.photos/seed/141/100/100", online: false },
    { name: "Friend 42", username: "friend_42", allianceCode: "RECR", avatar: "https://picsum.photos/seed/142/100/100", online: true },
    { name: "Friend 43", username: "friend_43", allianceCode: "BINB", avatar: "https://picsum.photos/seed/143/100/100", online: false },
    { name: "Friend 44", username: "friend_44", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/144/100/100", online: true },
    { name: "Friend 45", username: "friend_45", allianceCode: "JAVA", avatar: "https://picsum.photos/seed/145/100/100", online: false },
    { name: "Friend 46", username: "friend_46", allianceCode: "CSSS", avatar: "https://picsum.photos/seed/146/100/100", online: true },
    { name: "Friend 47", username: "friend_47", allianceCode: "TCC", avatar: "https://picsum.photos/seed/147/100/100", online: false },
    { name: "Friend 48", username: "friend_48", allianceCode: "RECR", avatar: "https://picsum.photos/seed/148/100/100", online: true },
    { name: "Friend 49", username: "friend_49", allianceCode: "BINB", avatar: "https://picsum.photos/seed/149/100/100", online: false },
    { name: "Friend 50", username: "friend_50", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/150/100/100", online: true },
];

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'CodeClash Arena';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const sortedFriends = [...friendsList].sort((a, b) => {
    if (a.online && !b.online) return -1;
    if (!a.online && b.online) return 1;
    return a.name.localeCompare(b.name);
  });

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
              <Heart className="h-5 w-5" />
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
             <DropdownMenuItem className="justify-center text-sm text-muted-foreground hover:text-primary">
                <Link href="#">
                    See Friend Requests
                </Link>
             </DropdownMenuItem>
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
