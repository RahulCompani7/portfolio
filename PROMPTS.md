# Working prompts

Two prompts, two different tools. Don't mix them — the repo prompt assumes file access,
the design prompt assumes none.

---

## 1 — Engineering brief (paste into Claude Code, in this repo)

> You're working in my portfolio repo: Next.js 16 (App Router, Turbopack), React 19,
> TypeScript strict, Tailwind v4 via `@tailwindcss/postcss`. Deployed on Vercel.
>
> **Architecture, so you don't fight it:**
> - `lib/data.ts` is the single source of truth for every string and number on the site —
>   experience, projects, skills, education, awards, certs, contact, and the terminal
>   command output. Terminal responses are *derived* from that same data, not duplicated.
>   Content changes go here, never inline in a component.
> - `app/components/*.tsx` — 13 components, one per section, plus `CustomCursor`,
>   `Particles`, and `LogoTile`. Section components are presentational; they read from
>   `lib/data.ts`.
> - `app/globals.css` — the entire visual system: CSS custom properties for both themes,
>   9 keyframe animations, and the `.rv` / `.rvc` / `.growline` scroll-driven reveals
>   built on `animation-timeline: view()`, with a `@supports not` fallback to a plain
>   `riseIn`. Styling lives here or in inline styles, **not** in Tailwind utility classes —
>   don't convert existing inline styles to utilities.
> - Theme is `data-theme="light" | "dark"` on `<html>`, set pre-paint by an inline script
>   in `app/layout.tsx` reading `localStorage.rc_theme`, then owned by React state in
>   `app/page.tsx`. Light is the default. Don't add a second theme system.
>
> **Ground rules:**
> - Read `AGENTS.md` first. Next 16 has breaking changes from what you may remember —
>   check `node_modules/next/dist/docs/` before using an API you haven't verified.
> - `npm run build` and `npm run lint` must both pass before you call anything done.
>   ESLint and TS errors block the Vercel build.
> - Small, focused commits with real messages describing the *why*.
> - When you change a section's content, check whether the terminal output for that
>   command still reads correctly — they share a source.
>
> **What I want done:** <describe the task here>
>
> Before writing code, tell me your plan and flag anything in it you think is a bad idea.

---

## 2 — Design brief (paste into Claude Design, no repo access)

> I have a personal portfolio site for a full-stack developer — currently a Senior
> Consultant at EY, ~3 years across Node.js, React/Next.js and serverless AWS.
> The design exists and I like it. I want it **tightened, not redesigned.**
>
> **What it looks like now:** dark-first, near-black background (`#06090b`) with a green
> accent (`#35d07f`), plus a light theme that swaps to off-white with a deeper green
> (`#0f8f52`). Three typefaces: Bricolage Grotesque for headings (tight negative
> tracking, weight 800), Manrope for body, JetBrains Mono for metadata, eyebrows and
> the terminal. Sections are numbered `01 — About` through `07 — Contact`.
>
> **Sections, in order:** hero (name at `clamp(46px, 8.2vw, 112px)`, typewriter role
> line, headshot with animated conic-gradient ring, current-role card) → scrolling logo
> marquee → about with count-up stats → experience timeline with a gradient spine →
> project cards with screenshots → skills chips grouped six ways → education and awards
> → an interactive terminal that answers CV questions → contact form with a "No" button
> that dodges the cursor → footer.
>
> **Motion already in place:** scroll-driven reveals via `animation-timeline: view()`,
> a particle canvas that repels from the pointer, a custom cursor ring that scales on
> interactive elements, magnetic buttons, card tilt on hover, and a scroll progress bar.
>
> **What I want from you:**
> 1. **Type scale** — audit the heading sizes across sections. They were tuned
>    independently and I suspect they don't sit on a consistent scale.
> 2. **Vertical rhythm** — section padding is roughly `130px` bottom throughout.
>    Tell me where that's wrong and where sections should breathe differently.
> 3. **Light theme parity** — it was derived from the dark theme by swapping variables.
>    Find where that falls down: contrast on muted text, the particle canvas, chip
>    backgrounds, the terminal.
> 4. **Motion timing** — the reveals animate over `entry 0% exit 90%`, which means
>    content fades as it leaves the viewport. Tell me honestly whether that reads as
>    polished or as distracting.
> 5. **Mobile** — below 920px the grids collapse to one column and the custom cursor and
>    particles turn off. Show me what the hero and experience timeline should actually
>    look like at 390px wide.
>
> Give me specific values I can implement — not "increase the spacing" but
> "112px, and here's why against the surrounding sections." Push back where you think
> the current design is already right.

---

## Notes

- Keep both prompts updated as the project moves. A stale brief is worse than none —
  it teaches the model things that stopped being true.
- The engineering brief's value is the architecture section. Without it an agent will
  reasonably assume Tailwind utilities and inline content, and fight the codebase.
- The design brief deliberately asks for pushback. A prompt that only asks for changes
  gets changes, whether or not they're improvements.
