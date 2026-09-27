import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-20">
      <div className="w-full max-w-[400px] text-center">
        <Image
          src="/lumina-docs.png"
          alt=""
          width={88}
          height={88}
          priority
          className="mx-auto mb-4 size-[88px] object-contain"
        />
        <h1 className="text-[34px] leading-[1.2] font-black tracking-[-0.01em] text-white">
          Lumina Admin
        </h1>
        <span className="mt-2.5 mb-6 inline-flex rounded-[8px] bg-[var(--blue-light)]/10 px-3 py-1.5 text-xs font-bold text-[#9bb1e8]">
          admin.lumina.app
        </span>

        <Card className="border-[var(--admin-border)] bg-[#1b2547] py-6 text-left shadow-none">
          <CardContent>
            <form className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-email" className="font-bold text-white">
                  Correo administrativo
                </Label>
                <Input
                  id="admin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="admin@lumina.app"
                  className="h-12 rounded-[var(--radius-md)] border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 font-semibold text-white placeholder:text-[#7c8ab0]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-password" className="font-bold text-white">
                  Contraseña
                </Label>
                <Input
                  id="admin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 rounded-[var(--radius-md)] border-[var(--admin-border)] bg-[var(--admin-bg)] px-4 font-semibold text-white placeholder:text-[#7c8ab0]"
                />
              </div>
              <Button type="submit" className="w-full rounded-[var(--radius-md)]">
                Entrar al panel
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="mt-5 text-[13px] leading-5 font-bold text-[#7c8ab0]">
          Acceso exclusivo del equipo administrador — no forma parte del sitio
          público de estudiantes y tutores.
        </p>
      </div>
    </main>
  );
}
