
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  LayoutDashboard,
  Terminal,
  Trophy,
  User,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leaderboards", label: "Leaderboards", icon: Trophy },
  { href: "/dashboard/alliances", label: "Alliances", icon: Users },
  { href: "/dashboard/recommendations", label: "AI Mentor", icon: BrainCircuit },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Terminal className="w-8 h-8 text-primary" />
          <h1 className="text-xl font-semibold font-headline">CodeClash Arena</h1>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <div>
                    <item.icon />
                    <span>{item.label}</span>
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
         <Link href="/dashboard/profile">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent cursor-pointer">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://picsum.photos/seed/1/100/100" data-ai-hint="profile avatar" alt="User Avatar" />
              <AvatarFallback>CA</AvatarFallback>
            </Avatar>
            <div className="overflow-hidden">
              <p className="font-semibold truncate">Cody Clash</p>
              <Badge variant="outline" className="border-primary/50 text-primary">Pro</Badge>
            </div>
          </div>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
