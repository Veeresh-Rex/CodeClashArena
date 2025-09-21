
"use client";

import Link from "next/link";
import { Bell, Search, UserPlus, Users, Trophy, User, ShieldX, UserX, MessageSquare } from "lucide-react";
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

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/leaderboards': 'Leaderboards',
  '/dashboard/alliance': 'Alliance',
  '/dashboard/chat': 'Chat',
  '/dashboard/recommendations': 'AI Mentor',
  '/dashboard/profile': 'My Profile',
  '/dashboard/notifications': 'Notifications',
};

const friendsList = [
    { name: "Byte Baron", allianceCode: "TCC", avatar: "https://picsum.photos/seed/4/100/100", online: true },
    { name: "Syntax Slayer", allianceCode: "TCC", avatar: "https://picsum.photos/seed/2/100/100", online: false },
    { name: "Algo Queen", allianceCode: "TCC", avatar: "https://picsum.photos/seed/3/100/100", online: true },
    { name: "Pixel Pioneer", allianceCode: "TCC", avatar: "https://picsum.photos/seed/5/100/100", online: false },
    { name: "Data Diva", allianceCode: "PYPH", avatar: "https://picsum.photos/seed/14/100/100", online: true },
];

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'CodeClash Arena';
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
            {friendsList.map(friend => (
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
                               <Link href="/dashboard/profile">
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
             <DropdownMenuSeparator />
             <DropdownMenuItem asChild className="justify-center text-sm text-muted-foreground hover:text-primary">
                <Link href="/dashboard/notifications">
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

    