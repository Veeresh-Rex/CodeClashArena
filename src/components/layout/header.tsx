
"use client";

import Link from "next/link";
import { Bell, Search, UserPlus, Users, Trophy } from "lucide-react";
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
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const pageTitles: { [key: string]: string } = {
  '/dashboard': 'Dashboard',
  '/dashboard/leaderboards': 'Leaderboards',
  '/dashboard/alliances': 'Alliances',
  '/dashboard/chat': 'Chat',
  '/dashboard/recommendations': 'AI Mentor',
  '/dashboard/profile': 'My Profile',
};

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
             <DropdownMenuItem className="justify-center text-sm text-muted-foreground hover:text-primary">
                See all notifications
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
