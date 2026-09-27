import Image from "next/image";

import { AdminLoginForm } from "@/components/admin-login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--admin-bg)] px-6 py-16 text-[var(--admin-text)]">
      <div className="w-full max-w-[400px] text-center">
        <Image
          src="/lumina-docs.png"
          alt=""
          width={88}
          height={88}
          priority
          className="mx-auto mb-4 size-[88px] object-contain"
        />
        <h1 className="text-[34px] leading-[1.2] font-black tracking-[-0.01em]">
          Lumina Admin
        </h1>
        <span className="mt-2.5 mb-6 inline-flex rounded-[8px] bg-[var(--admin-accent-bg)] px-3 py-1.5 text-xs font-bold text-[var(--admin-accent)]">
          admin.lumina.app
        </span>

        <AdminLoginForm />

        <p className="mt-5 text-[13px] leading-5 font-bold text-[var(--admin-subtle)]">
          Acceso exclusivo del equipo administrador — no forma parte del sitio
          público de estudiantes y tutores.
        </p>
      </div>
    </main>
  );
}
