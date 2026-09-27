<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Lumina — Demo App (Next.js)

Este repo es la demo funcional de **Lumina**, la plataforma de gestión de tutorías presenciales. La documentación de requerimientos y arquitectura vive en el repo hermano `docs/` (Astro + Starlight).

## Herramientas y flujo de trabajo obligatorio

- **/graphify**: usar siempre para entender el código, la arquitectura o relaciones entre archivos antes de explorar manualmente. Ahorra tokens y va construyendo el grafo de conocimiento ("el cerebro") del proyecto — mantenlo actualizado.
- **/ponytail:ponytail**: usar para cualquier cambio de código (agregar, refactorizar, arreglar, revisar). Prioriza siempre la solución más simple, corta y mínima que funcione; cuestiona si la tarea realmente necesita existir antes de escribir código nuevo.
- **/ui-ux-pro-max:brand**: usar para cualquier cambio de UI/UX o de voz de marca. Siempre en conjunto con [`DESIGN.md`](./DESIGN.md) (raíz de este repo) como fuente de verdad de colores, tipografía, espaciado y componentes — no inventar valores fuera de esos tokens.
- **/find-docs**: usar para consultar documentación de librerías/frameworks (Next.js, React, Tailwind, etc.) en vez de confiar en conocimiento entrenado que puede estar desactualizado.

## Diseño

El sistema de diseño de referencia es [`DESIGN.md`](./DESIGN.md). Cualquier componente, página o estilo nuevo debe alinearse con esos tokens.

## Componentes UI

- **Nunca crear un componente de UI desde cero** (botón, input, card, modal, dropdown, etc.). Siempre usar **shadcn/ui**.
- **Todo componente de UI vive únicamente en `components/ui/`** (alias `@/components/ui`, configurado en `components.json`). No crear componentes de UI en otras carpetas (`app/`, `components/` a secas, etc.) — si algo es un control de interfaz, su archivo va en `components/ui/`.
- **Antes de agregar cualquier elemento, verificar si ya existe** en `components/ui/` — reusar esa instancia. Nunca crear un componente paralelo o "similar" a uno que ya existe.
- Si el componente shadcn necesario todavía no está instalado en el proyecto, instalarlo con la CLI: `pnpm dlx shadcn@latest add <componente>` (comando verificado con `/find-docs` contra la documentación oficial de shadcn/ui) — no escribir su JSX/CSS a mano. Esto lo coloca automáticamente en `components/ui/`.
- Todo componente shadcn debe re-estilizarse según los tokens de [`DESIGN.md`](./DESIGN.md) (colores, radios, tipografía Nunito, sombras, spacing) — nunca queda con el tema default de shadcn ni con valores inventados fuera de esos tokens.
- Ejemplo: si se pide "poner un botón", se usa el `<Button>` de shadcn (instalándolo primero si falta) con el estilo de Primary/Outline/Danger Outline Button que define DESIGN.md — nunca un `<button>` custom ni un segundo componente Button paralelo.
- Objetivo: que un mismo tipo de control (botón, badge, card, input...) se vea y comporte idéntico en toda la app, sin variantes ad-hoc por pantalla.
- **La app es solo modo claro (light mode), sin toggle de tema.** No instalar `next-themes`, no agregar `ThemeProvider`, no usar clases `dark:` ni el bloque `.dark` en CSS. `app/globals.css` no tiene selector `.dark` a propósito — si un componente de shadcn trae variantes `dark:`, se ignoran/eliminan al integrarlo.
- **Estado actual:** shadcn/ui ya está inicializado (`components.json`, base "Base UI", preset "Nova"). Los tokens de color/radio/tipografía en `app/globals.css` ya están mapeados a DESIGN.md — la fuente Nunito se carga en `app/layout.tsx`. Falta instalar componentes individuales a medida que se pidan.

## Commits

- Usar **Conventional Commits** (`feat:`, `fix:`, `refactor:`, etc.) para el mensaje del commit.
- No agregar a Claude como coautor ni colaborador (sin `Co-Authored-By`).
- Commitear solo los archivos relevantes al cambio solicitado; dejar intactos otros cambios pendientes no relacionados en el working tree.
