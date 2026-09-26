@AGENTS.md

# Lumina — Demo App (Next.js)

Este repo es la demo funcional de **Lumina**, la plataforma de gestión de tutorías presenciales. La documentación de requerimientos y arquitectura vive en el repo hermano `docs/` (Astro + Starlight).

## Herramientas y flujo de trabajo obligatorio

- **/graphify**: usar siempre para entender el código, la arquitectura o relaciones entre archivos antes de explorar manualmente. Ahorra tokens y va construyendo el grafo de conocimiento ("el cerebro") del proyecto — mantenlo actualizado.
- **/ponytail:ponytail**: usar para cualquier cambio de código (agregar, refactorizar, arreglar, revisar). Prioriza siempre la solución más simple, corta y mínima que funcione; cuestiona si la tarea realmente necesita existir antes de escribir código nuevo.
- **/ui-ux-pro-max:brand**: usar para cualquier cambio de UI/UX o de voz de marca. Siempre en conjunto con [`DESIGN.md`](./DESIGN.md) (raíz de este repo) como fuente de verdad de colores, tipografía, espaciado y componentes — no inventar valores fuera de esos tokens.
- **/find-docs**: usar para consultar documentación de librerías/frameworks (Next.js, React, Tailwind, etc.) en vez de confiar en conocimiento entrenado que puede estar desactualizado.

## Diseño

El sistema de diseño de referencia es [`DESIGN.md`](./DESIGN.md). Cualquier componente, página o estilo nuevo debe alinearse con esos tokens.

## Commits

- Usar **Conventional Commits** (`feat:`, `fix:`, `refactor:`, etc.) para el mensaje del commit.
- No agregar a Claude como coautor ni colaborador (sin `Co-Authored-By`).
- Commitear solo los archivos relevantes al cambio solicitado; dejar intactos otros cambios pendientes no relacionados en el working tree.
