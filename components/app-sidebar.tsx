"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  Clock,
  GraduationCap,
  User,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const ESTUDIANTE_NAV_ITEMS = [
  { label: "Tutores", icon: GraduationCap, href: "/tutores" },
  { label: "Materias", icon: BookOpen, href: "/materias" },
  { label: "Mis sesiones", icon: CalendarCheck, href: "/mis-sesiones" },
  { label: "Perfil", icon: User, href: "/mi-perfil" },
] as const;

const TUTOR_NAV_ITEMS = [
  { label: "Mi perfil", icon: User, href: "/mi-perfil" },
  { label: "Mis franjas horarias", icon: CalendarDays, href: "/mis-franjas" },
  { label: "Mis sesiones", icon: Clock, href: "/mis-sesiones" },
] as const;

export function AppSidebar({ role }: { role: "estudiante" | "tutor" }) {
  const pathname = usePathname();
  const NAV_ITEMS = role === "tutor" ? TUTOR_NAV_ITEMS : ESTUDIANTE_NAV_ITEMS;

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-6">
        <Image
          src="/logo-lumina.png"
          alt="Lumina"
          width={303}
          height={101}
          className="h-9 w-auto self-start"
          priority
        />
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_ITEMS.map(({ label, icon: Icon, href }) => {
                const isActive = href !== null && pathname === href;
                return (
                  <SidebarMenuItem key={label}>
                    <SidebarMenuButton
                      isActive={isActive}
                      disabled={href === null}
                      render={href ? <Link href={href} /> : undefined}
                      className={cn(
                        "h-auto gap-3 rounded-[var(--radius-md)] px-3.5 py-3 text-[15px] font-bold text-[var(--gray-600)] hover:bg-[var(--blue-lighter)]",
                        isActive &&
                          "[--sidebar-accent:var(--green-light)] [--sidebar-accent-foreground:var(--green-dark)]",
                      )}
                    >
                      <Icon className="size-5" />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
