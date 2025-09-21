

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  PanelLeftClose,
  PanelRightClose,
  Settings,
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
  useSidebar,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const menuItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/leaderboards", label: "Leaderboards", icon: Trophy },
  { href: "/dashboard/alliance", label: "Alliance", icon: Users },
  { href: "/dashboard/chat", label: "Chat", icon: MessageSquare, badge: true },
  { href: "/dashboard/recommendations", label: "AI Mentor", icon: BrainCircuit },
];

function Brand() {
  const { state } = useSidebar();
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <Terminal className="w-8 h-8 text-primary" />
      {state === 'expanded' && (
        <h1 className="text-xl font-semibold font-headline">CodeClash Arena</h1>
      )}
    </Link>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  const { state, toggleSidebar } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                   {item.badge && state === 'expanded' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <div className="w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                  )}
                </Link>
              </SidebarMenuButton>
               {item.badge && state === 'collapsed' && (
                  <div className="absolute right-2 top-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                  </div>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="flex flex-col gap-4">
        <SidebarSeparator />
        <Button variant="ghost" onClick={toggleSidebar} className="w-full justify-center group-data-[collapsible=icon]:justify-center">
            {state === 'expanded' ? <PanelLeftClose /> : <PanelRightClose />}
            <span className="group-data-[collapsible=icon]:hidden pl-2">Collapse</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

    