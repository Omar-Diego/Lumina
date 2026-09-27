"use client";

import { useRouter } from "next/navigation";
import { ChevronDown, LogOut, PanelLeft } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { getInitials } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ROLE_LABEL = {
  estudiante: "Estudiante",
  tutor: "Tutor",
} as const;

export function AppTopbar({
  user,
}: {
  user: { name: string; role: keyof typeof ROLE_LABEL; image?: string | null };
}) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  async function handleSignOut() {
    await authClient.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <div className="mb-7 flex items-center justify-end gap-4">
      <Button
        variant="ghost"
        size="icon"
        className="mr-auto md:hidden"
        onClick={toggleSidebar}
      >
        <PanelLeft className="size-5" />
        <span className="sr-only">Abrir menú</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2.5 outline-none">
          <Avatar size="lg">
            {user.image && <AvatarImage src={user.image} alt={user.name} />}
            <AvatarFallback className="bg-[var(--pink)] font-extrabold text-white">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-extrabold text-[var(--ink)]">
              {user.name}
            </span>
            <span className="block text-xs font-semibold text-[var(--gray-500)]">
              {ROLE_LABEL[user.role]}
            </span>
          </span>
          <ChevronDown className="size-4 text-[var(--gray-400)]" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
