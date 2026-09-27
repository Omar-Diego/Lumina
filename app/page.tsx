import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Atom,
  BookOpen,
  Calculator,
  CalendarCheck,
  CalendarDays,
  Clock,
  Code2,
  FlaskConical,
  Languages,
  Leaf,
  LogIn,
  MapPin,
  Search,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SiteFooter } from "@/components/site-footer";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DatePickerField } from "@/components/ui/date-picker-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NAV_LINKS = [
  { label: "Inicio", href: "#", active: true },
  { label: "Tutores", href: "#tutores-destacados", active: false },
  { label: "Materias", href: "#materias", active: false },
  { label: "Cómo funciona", href: "#como-funciona", active: false },
] as const;

const SUBJECT_OPTIONS = [
  "Matemáticas",
  "Física",
  "Química",
  "Inglés",
  "Programación",
  "Biología",
];

const SCHEDULE_OPTIONS = ["Mañana", "Tarde", "Noche"];

const HERO_FEATURES = [
  {
    icon: ShieldCheck,
    label: "Tutores verificados",
    bg: "bg-[var(--green-light)]",
    fg: "text-[var(--green)]",
  },
  {
    icon: BookOpen,
    label: "Búsqueda por materia",
    bg: "bg-[var(--blue-light)]",
    fg: "text-[var(--blue-dark)]",
  },
  {
    icon: CalendarDays,
    label: "Horarios disponibles",
    bg: "bg-[var(--yellow-light)]",
    fg: "text-[var(--yellow-text)]",
  },
  {
    icon: CalendarCheck,
    label: "Reserva segura",
    bg: "bg-[var(--red-light)]",
    fg: "text-[var(--red)]",
  },
  {
    icon: Star,
    label: "Reseñas de estudiantes",
    bg: "bg-[var(--purple-light)]",
    fg: "text-[var(--purple)]",
  },
  {
    icon: Users,
    label: "Sesiones presenciales",
    bg: "bg-[var(--teal-light)]",
    fg: "text-[var(--teal)]",
  },
];

const TUTORS = [
  {
    initials: "MT",
    avatarBg: "bg-[var(--pink)]",
    rating: "4.9 (120)",
    name: "María Torres",
    location: "Zona Centro, CDMX",
    subjects: ["Matemáticas", "Física"],
    bio: "Estudiante de Ingeniería con 4 años de experiencia en tutorías.",
    slots: ["Hoy 4:00 PM", "Hoy 6:00 PM"],
  },
  {
    initials: "DR",
    avatarBg: "bg-[var(--blue)]",
    rating: "4.8 (86)",
    name: "Diego Ramírez",
    location: "San Pedro, Monterrey",
    subjects: ["Inglés", "Conversación"],
    bio: "Certificado C1 con enfoque práctico y dinámico.",
    slots: ["Hoy 5:00 PM", "Mañana 9:00 AM"],
  },
  {
    initials: "AL",
    avatarBg: "bg-[var(--teal)]",
    rating: "5.0 (64)",
    name: "Ana López",
    location: "Coyoacán, CDMX",
    subjects: ["Biología", "Química"],
    bio: "Apasionada por la ciencia y la enseñanza.",
    slots: ["Hoy 3:00 PM", "Mañana 11:00 AM"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Crea tu cuenta",
    body: "Regístrate como estudiante o como tutor en menos de un minuto.",
    accent: "border-t-[var(--green)]",
  },
  {
    num: "02",
    title: "Busca por materia",
    body: "Filtra tutores aprobados por materia, horario y campus.",
    accent: "border-t-[var(--blue)]",
  },
  {
    num: "03",
    title: "Agenda tu sesión",
    body: "Elige una franja libre y confirma tu reserva al instante.",
    accent: "border-t-[var(--purple)]",
  },
  {
    num: "04",
    title: "Aprende y valora",
    body: "Asiste a tu tutoría y califica la experiencia al terminar.",
    accent: "border-t-[var(--yellow)]",
  },
];

const SUBJECTS = [
  {
    icon: Calculator,
    label: "Matemáticas",
    bg: "bg-[var(--blue-light)]",
    fg: "text-[var(--blue-dark)]",
  },
  {
    icon: Atom,
    label: "Física",
    bg: "bg-[var(--purple-light)]",
    fg: "text-[var(--purple)]",
  },
  {
    icon: FlaskConical,
    label: "Química",
    bg: "bg-[var(--pink-light)]",
    fg: "text-[var(--pink)]",
  },
  {
    icon: Languages,
    label: "Inglés",
    bg: "bg-[var(--teal-light)]",
    fg: "text-[var(--teal)]",
  },
  {
    icon: Code2,
    label: "Programación",
    bg: "bg-[var(--yellow-light)]",
    fg: "text-[var(--yellow-text)]",
  },
  {
    icon: Leaf,
    label: "Biología",
    bg: "bg-[var(--green-light)]",
    fg: "text-[var(--green)]",
  },
];

export default function Home() {
  return (
    <>
      <MarketingHeader />
      <main className="flex-1">
        <Hero />
        <TutoresDestacados />
        <ComoFunciona />
        <MateriasTeaser />
      </main>
      <SiteFooter />
    </>
  );
}

function MarketingHeader() {
  return (
    <header className="flex items-center justify-between gap-6 border-b border-[var(--border)] bg-card px-6 py-4 md:px-12">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo-lumina.png"
          alt="Lumina"
          width={303}
          height={101}
          className="h-9 w-auto"
          priority
        />
      </Link>

      <nav className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className={cn(
              "rounded-pill px-4 py-2.5 text-[14.5px] font-bold text-[var(--gray-600)] transition-colors",
              link.active && "bg-[var(--green-light)] text-[var(--green-dark)]",
            )}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <Button variant="outline" render={<Link href="/login" />}>
          <LogIn className="size-4" />
          Iniciar sesión
        </Button>
        <Button render={<Link href="/login" />}>Encontrar tutor</Button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-[1440px] px-6 pt-10 pb-16 md:px-12">
      <div className="flex flex-col items-center gap-10 lg:flex-row">
        <div className="flex-1">
          <h1 className="text-[34px] leading-[1.15] font-black tracking-[-0.02em] text-[var(--ink)] sm:text-[44px]">
            Encuentra tutores verificados y agenda tu próxima sesión
          </h1>
          <p className="mt-4 text-base font-semibold text-[var(--gray-500)]">
            Compara tutores, explora materias, revisa horarios y reserva
            sesiones presenciales con total claridad.
          </p>

          <Card id="buscar" className="mt-7 scroll-mt-6">
            <CardContent className="flex flex-wrap items-center gap-4">
              <SelectField
                icon={<BookOpen className="size-5" />}
                label="Materia"
                placeholder="Ej. Matemáticas"
                options={SUBJECT_OPTIONS}
              />
              <DatePickerField
                label="Fecha"
                placeholder="Selecciona una fecha"
              />
              <SelectField
                icon={<Clock className="size-5" />}
                label="Horario"
                placeholder="Cualquier horario"
                options={SCHEDULE_OPTIONS}
              />
              <Button
                render={<Link href="/login" />}
                className="min-w-[180px] flex-1 justify-center"
              >
                <Search className="size-4" />
                Buscar tutores
              </Button>
            </CardContent>
          </Card>

          <ul className="mt-8 flex flex-wrap gap-7">
            {HERO_FEATURES.map(({ icon: Icon, label, bg, fg }) => (
              <li
                key={label}
                className="flex w-24 flex-col items-center gap-2 text-center"
              >
                <span
                  className={cn(
                    "flex size-14 items-center justify-center rounded-[var(--radius-md)]",
                    bg,
                    fg,
                  )}
                >
                  <Icon className="size-6" />
                </span>
                <span className="text-[13px] font-bold text-[var(--gray-500)]">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative flex size-[280px] shrink-0 items-center justify-center sm:size-[300px]">
          <span className="absolute -top-2 -left-2 size-64 rounded-full bg-[var(--blue-light)]" />
          <span className="absolute top-2 right-0 size-16 rounded-full bg-[var(--yellow-light)]" />
          <span className="absolute bottom-0 left-2 size-20 rounded-full bg-[var(--pink-light)]" />
          <span className="absolute -right-2 bottom-4 size-14 rounded-full bg-[var(--green-light)]" />
          <Image
            src="/lumina-estudia.png"
            alt="Mascota de Lumina leyendo sobre libros"
            width={1315}
            height={1196}
            className="relative z-10"
            priority
          />
        </div>
      </div>
    </section>
  );
}

function SelectField({
  icon,
  label,
  placeholder,
  options,
}: {
  icon: ReactNode;
  label: string;
  placeholder: string;
  options: string[];
}) {
  return (
    <Select>
      <SelectTrigger className="h-auto w-fit min-w-[180px] gap-3 rounded-pill border-[1.5px] border-[var(--border)] bg-card px-5 py-3.5 transition-colors hover:border-[var(--blue)] [&_svg]:text-[var(--gray-400)]">
        <span className="shrink-0">{icon}</span>
        <span className="flex flex-1 flex-col items-start gap-0.5 leading-none">
          <span className="text-[11px] font-bold tracking-wide text-[var(--gray-400)]">
            {label}
          </span>
          <SelectValue
            placeholder={placeholder}
            className="text-sm font-extrabold text-[var(--ink)] data-placeholder:font-semibold data-placeholder:text-[var(--gray-400)]"
          />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function TutoresDestacados() {
  return (
    <section
      id="tutores-destacados"
      className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-[22px] font-extrabold text-[var(--ink)]">
            Tutores destacados
          </h2>
          <p className="mt-1 text-[14.5px] font-semibold text-[var(--gray-500)]">
            Conoce algunos de nuestros tutores verificados y agenda una sesión.
          </p>
        </div>
        <Link
          href="/login"
          className="text-[13px] font-bold text-[var(--blue-dark)]"
        >
          Ver todos los tutores
        </Link>
      </div>

      <div className="flex flex-wrap gap-5">
        {TUTORS.map((tutor) => (
          <TutorCard key={tutor.name} tutor={tutor} />
        ))}
      </div>
    </section>
  );
}

function TutorCard({ tutor }: { tutor: (typeof TUTORS)[number] }) {
  return (
    <Card className="min-w-[260px] flex-1">
      <CardContent className="flex h-full flex-col gap-4">
        <Avatar className="size-13">
          <AvatarFallback
            className={cn(
              "text-base font-extrabold text-white",
              tutor.avatarBg,
            )}
          >
            {tutor.initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 fill-[var(--yellow)] text-[var(--yellow)]" />
            <span className="text-[15px] font-extrabold text-[var(--ink)]">
              {tutor.rating}
            </span>
          </div>
          <h3 className="mt-1.5 truncate text-lg font-extrabold text-[var(--ink)]">
            {tutor.name}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-[13px] font-bold text-[var(--gray-500)]">
            <MapPin className="size-4 shrink-0" />
            <span className="truncate">{tutor.location}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tutor.subjects.map((subject) => (
            <Badge
              key={subject}
              variant="secondary"
              className="h-auto rounded-pill px-3 py-1 text-[12.5px] font-bold"
            >
              {subject}
            </Badge>
          ))}
        </div>

        <p className="line-clamp-2 min-h-[48px] text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
          {tutor.bio}
        </p>

        {/* Ancla horarios + CTA al fondo de la card: ver "Alineación en grids de cards" en DESIGN.md */}
        <div className="mt-auto flex flex-col gap-4">
          <div>
            <p className="mb-2 text-[13px] font-bold text-[var(--gray-500)]">
              Próximos horarios disponibles
            </p>
            <div className="flex flex-wrap gap-2">
              {tutor.slots.map((slot) => (
                <span
                  key={slot}
                  className="rounded-pill border-[1.5px] border-[var(--border)] px-4 py-2 text-[13.5px] font-bold text-[var(--gray-600)]"
                >
                  {slot}
                </span>
              ))}
            </div>
          </div>

          <Button
            render={<Link href="/login" />}
            className="w-full justify-center rounded-[var(--radius-md)] px-4 py-3"
          >
            Ver perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function ComoFunciona() {
  return (
    <section
      id="como-funciona"
      className="mx-auto max-w-[1440px] px-6 pb-16 md:px-12"
    >
      <div className="mx-auto mb-9 max-w-xl text-center">
        <h2 className="text-[22px] font-extrabold text-[var(--ink)]">
          Cómo funciona
        </h2>
        <p className="mt-2 text-[14.5px] font-semibold text-[var(--gray-500)]">
          Cuatro pasos, sin complicaciones.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step) => (
          <Card
            key={step.num}
            className={cn("gap-2 border-t-[5px]", step.accent)}
          >
            <CardContent className="flex flex-col gap-1.5">
              <span className="text-[26px] font-black tracking-[-0.02em] text-[var(--gray-400)]">
                {step.num}
              </span>
              <h3 className="text-base font-extrabold text-[var(--ink)]">
                {step.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed font-semibold text-[var(--gray-500)]">
                {step.body}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function MateriasTeaser() {
  return (
    <section
      id="materias"
      className="mx-auto max-w-[1440px] px-6 pb-18 md:px-12"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-[22px] font-extrabold text-[var(--ink)]">
            Materias con más tutores disponibles
          </h2>
          <p className="mt-1 text-[14.5px] font-semibold text-[var(--gray-500)]">
            Inicia sesión para ver el catálogo completo y filtrar por nivel y
            área.
          </p>
        </div>
        <Link
          href="/login"
          className="text-[13px] font-bold text-[var(--blue-dark)]"
        >
          Ver todas las materias
        </Link>
      </div>

      <div className="flex flex-wrap gap-3.5">
        {SUBJECTS.map(({ icon: Icon, label, bg, fg }) => (
          <Link
            key={label}
            href="/login"
            className="flex min-w-[150px] flex-1 items-center gap-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-card px-4 py-3.5"
          >
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-[var(--radius-sm)]",
                bg,
                fg,
              )}
            >
              <Icon className="size-4" />
            </span>
            <span className="text-sm font-extrabold text-[var(--ink)]">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
