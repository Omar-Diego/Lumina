# Graph Report - app  (2026-09-26)

## Corpus Check
- 40 files · ~210,770 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 1, .ico 1, .css 1)

## Summary
- 285 nodes · 357 edges · 18 communities (12 shown, 6 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.76)
- Token cost: 590,066 input · 0 output

## Community Hubs (Navigation)
- shadcn Form Primitives (Input/Separator/Sheet)
- Project Workflow Rules (CLAUDE.md)
- shadcn Core Primitives (Avatar/Button/Calendar)
- Lint & Package Scripts
- shadcn Config (components.json)
- TypeScript Config
- shadcn Feedback Primitives (Alert/Badge/Tabs)
- Lumina Mascot Emotional States
- npm Dependencies
- shadcn Select
- npm devDependencies
- Next.js App Shell (layout/config)
- Lumina Logo Lockup
- Lumina Brand Identity (Saluda)
- Lumina Brand Mascot (Estudia)
- PostCSS Config

## God Nodes (most connected - your core abstractions)
1. `Lumina Design System (DESIGN.md)` - 30 edges
2. `cn` - 19 edges
3. `compilerOptions` - 16 edges
4. `react` - 13 edges
5. `@base-ui/react` - 12 edges
6. `Lumina Demo App Project Instructions (CLAUDE.md)` - 10 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `class-variance-authority` - 6 edges
10. `lucide-react` - 6 edges

## Surprising Connections (you probably didn't know these)
- `shadcn/ui` --semantically_similar_to--> `Rule: always use shadcn/ui for UI components`  [INFERRED] [semantically similar]
  README.md → CLAUDE.md
- `Lumina Demo App Project Instructions (CLAUDE.md)` --references--> `Next.js Breaking Changes Notice`  [EXTRACTED]
  CLAUDE.md → AGENTS.md
- `/ui-ux-pro-max:brand workflow tool` --references--> `Lumina Design System (DESIGN.md)`  [EXTRACTED]
  CLAUDE.md → DESIGN.md
- `pnpm-workspace allowBuilds: unrs-resolver` --conceptually_related_to--> `Next.js (App Router)`  [INFERRED]
  pnpm-workspace.yaml → README.md
- `SidebarProvider()` --calls--> `useIsMobile()`  [EXTRACTED]
  components/ui/sidebar.tsx → hooks/use-mobile.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Mandatory workflow tools required by CLAUDE.md** — claude_graphify, claude_ponytail, claude_ui_ux_pro_max_brand, claude_find_docs [EXTRACTED 1.00]
- **shadcn/ui-based Lumina action components (buttons, card, badge, chip)** — design_primary_button, design_outline_button, design_danger_outline_button, design_card, design_badge, design_chip [INFERRED 0.85]
- **Similar Brands cited as structural/visual references for Lumina** — design_calendly_reference, design_linear_reference, design_notion_reference, design_airbnb_reference, design_duolingo_heritage [EXTRACTED 1.00]
- **Lumina Brand Identity Composition** — public_logo_lumina_logo, public_logo_lumina_mascot, public_logo_lumina_wordmark [EXTRACTED 1.00]

## Communities (18 total, 6 thin omitted)

### Community 0 - "shadcn Form Primitives (Input/Separator/Sheet)"
Cohesion: 0.05
Nodes (22): Input(), Separator(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), Sidebar() (+14 more)

### Community 1 - "Project Workflow Rules (CLAUDE.md)"
Cohesion: 0.06
Nodes (42): Next.js Breaking Changes Notice, Rule: UI components live only in components/ui, Rule: Conventional Commits for commit messages, /find-docs workflow tool, /graphify workflow tool, Rule: light-mode only, no theme toggle, /ponytail:ponytail workflow tool, Lumina Demo App Project Instructions (CLAUDE.md) (+34 more)

### Community 2 - "shadcn Core Primitives (Avatar/Button/Calendar)"
Cohesion: 0.10
Nodes (5): Button(), buttonVariants, Calendar(), cn, react

### Community 3 - "Lint & Package Scripts"
Cohesion: 0.09
Nodes (22): eslintConfig, name, private, scripts, build, dev, lint, start (+14 more)

### Community 4 - "shadcn Config (components.json)"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "shadcn Feedback Primitives (Alert/Badge/Tabs)"
Cohesion: 0.15
Nodes (7): Alert(), alertVariants, Badge(), badgeVariants, TabsList(), tabsListVariants, class-variance-authority

### Community 8 - "Lumina Mascot Emotional States"
Cohesion: 0.16
Nodes (13): DESIGN.md Brand Color Tokens, Lumina Ayuda Mascot Image, Confused/Help UI State Expression, Lumina Mascot (Panda/Orange Character), Lumina Confirma (Mascot Illustration), Green Checkmark Confirmation Badge, Lumina Mascot Character, Lumina Docs Mascot Illustration (+5 more)

### Community 9 - "npm Dependencies"
Cohesion: 0.17
Nodes (12): dependencies, @base-ui/react, class-variance-authority, cn, date-fns, lucide-react, next, react (+4 more)

### Community 11 - "npm devDependencies"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 12 - "Next.js App Shell (layout/config)"
Cohesion: 0.25
Nodes (5): app_globals, metadata, nunito, nextConfig, next

### Community 13 - "Lumina Logo Lockup"
Cohesion: 1.00
Nodes (3): Lumina Logo (Horizontal Lockup), Lumina Bulb-Fruit Mascot Icon, "Lumina" Wordmark Typography

## Knowledge Gaps
- **110 isolated node(s):** `nunito`, `metadata`, `$schema`, `style`, `rsc` (+105 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 190 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn` connect `shadcn Core Primitives (Avatar/Button/Calendar)` to `shadcn Form Primitives (Input/Separator/Sheet)`, `Lint & Package Scripts`, `shadcn Feedback Primitives (Alert/Badge/Tabs)`, `shadcn Dropdown Menu`, `shadcn Select`?**
  _High betweenness centrality (0.104) - this node is a cross-community bridge._
- **Why does `react` connect `shadcn Core Primitives (Avatar/Button/Calendar)` to `shadcn Form Primitives (Input/Separator/Sheet)`, `Lint & Package Scripts`, `shadcn Feedback Primitives (Alert/Badge/Tabs)`, `shadcn Dropdown Menu`, `shadcn Select`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `@base-ui/react` connect `shadcn Form Primitives (Input/Separator/Sheet)` to `shadcn Core Primitives (Avatar/Button/Calendar)`, `Lint & Package Scripts`, `shadcn Feedback Primitives (Alert/Badge/Tabs)`, `shadcn Dropdown Menu`, `shadcn Select`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **What connects `nunito`, `metadata`, `$schema` to the rest of the system?**
  _110 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `shadcn Form Primitives (Input/Separator/Sheet)` be split into smaller, more focused modules?**
  _Cohesion score 0.05370101596516691 - nodes in this community are weakly interconnected._
- **Should `Project Workflow Rules (CLAUDE.md)` be split into smaller, more focused modules?**
  _Cohesion score 0.05807200929152149 - nodes in this community are weakly interconnected._
- **Should `shadcn Core Primitives (Avatar/Button/Calendar)` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._