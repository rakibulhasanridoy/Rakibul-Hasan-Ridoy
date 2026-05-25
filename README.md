# 🚀 Portfolio — Next.js + Framer Motion + GSAP + Lenis

A premium developer portfolio powered by **Next.js 14 App Router**, **Framer Motion**, **GSAP + ScrollTrigger**, and **Lenis** smooth scrolling.

---

## 📦 Installation

### 1. Create a new Next.js project (if starting fresh)

```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir=no --import-alias="@/*"
cd portfolio
```

### 2. Install the animation libraries

```bash
npm install framer-motion gsap lenis
```

Or with pnpm / yarn:

```bash
pnpm add framer-motion gsap lenis
yarn add framer-motion gsap lenis
```

### 3. Copy the source files

Replace the generated files with the ones in this folder. The structure is:

```
├── app/
│   ├── globals.css         # Custom CSS vars, scrollbar, grid pattern
│   ├── layout.tsx          # Root layout — loads fonts, wraps SmoothScroll
│   └── page.tsx            # Main page — assembles all section components
├── components/
│   ├── SmoothScroll.tsx    # Lenis init + GSAP ticker sync (CLIENT)
│   ├── ParallaxBg.tsx      # Fixed bg layers — GSAP scrub parallax
│   ├── Navigation.tsx      # Framer Motion staggered entrance
│   ├── Hero.tsx            # Framer Motion staggered entrance + floating icon
│   ├── About.tsx           # GSAP ScrollTrigger reveals + FM hover
│   ├── Skills.tsx          # GSAP progress bar animation + FM card hover
│   ├── Projects.tsx        # GSAP header reveal + FM physics card hover
│   ├── Contact.tsx         # GSAP reveals + FM toast notification
│   └── Footer.tsx          # FM social icon hover states
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🎬 Animation Architecture

### Layer 1 — Lenis (Smooth Scroll Foundation)

`SmoothScroll.tsx` initialises Lenis and **syncs it with GSAP's ticker**:

```ts
lenis.on('scroll', ScrollTrigger.update); // keeps ST in sync
gsap.ticker.add((time) => lenis.raf(time * 1000)); // one animation loop
gsap.ticker.lagSmoothing(0); // Lenis handles lag itself
```

This is critical. Without it, GSAP ScrollTrigger reads native scroll position, which will be desynchronised from Lenis' interpolated position.

The Lenis instance is stored on `window.__lenis` so Navigation can call `lenis.scrollTo('#section')` for buttery-smooth anchor navigation.

---

### Layer 2 — Framer Motion (UI / Entrance Animations)

| Component | Animation |
|-----------|-----------|
| **Navigation** | Logo slides in from left; nav links stagger drop-in from top on page load |
| **Hero** | All children stagger fade+rise with a snappy custom cubic ease |
| **Hero icon** | Continuous `y` float loop independent of entrance |
| **Hero CTA buttons** | Spring physics scale + shadow glow on hover |
| **Project cards** | `y -10 + scale 1.015 + shadow expansion` — spring physics hover |
| **Skill pills** | Spring scale + border-glow hover |
| **Skill cards** | Spring scale + subtle shadow on hover |
| **Contact button** | Spring scale + shadow on hover |
| **Toast notification** | `AnimatePresence` spring entrance/exit |
| **Footer icons** | Spring scale + colour transition |

---

### Layer 3 — GSAP + ScrollTrigger (Scroll-Linked Animations)

| Target | Trigger | Animation |
|--------|---------|-----------|
| **Background gradient** | `document.body` (full page) | `backgroundPosition` scrub at 1.5x speed |
| **Grid pattern** | `document.body` (full page) | `backgroundPosition` scrub at 3x (different rate = depth) |
| **About section text** | Section enters viewport (`top 80%`) | Sequential timeline: label → heading → line → text → stats |
| **About tech card** | Card enters viewport | Rotate + slide from right |
| **Skills header** | Header enters viewport | Stagger fade+rise |
| **Progress bars** | Respective card enters viewport | `width: 0 → target%` with per-bar stagger |
| **Extra skill pills** | Pills enter viewport | Stagger fade+rise |
| **Projects header** | Header enters viewport | Stagger fade+rise |
| **Contact header** | Header enters viewport | Stagger fade+rise |
| **Contact form** | Form enters viewport | Fade+rise |
| **Contact info** | Info section enters viewport | Stagger fade+rise |

All `ScrollTrigger` instances use `once: true` — animations fire exactly once, not on every scroll in/out.

---

## 🎨 Styling

All original colours are preserved via CSS custom properties:

```css
--color-bg:        #0a0a0f
--color-surface:   #14141f
--color-text:      #e8e6e3
--color-primary:   #c9a227  /* gold */
--color-secondary: #7c6a9a  /* purple */
```

Fonts: **Playfair Display** (display headings) + **Source Sans 3** (body).

---

## 🔧 Customisation

- **Swap your name / tagline** — edit the strings directly in `Hero.tsx`
- **Add projects** — extend the `PROJECTS` array in `Projects.tsx`
- **Change colours** — update `--color-*` variables in `globals.css`
- **Tweak animation speed** — adjust `duration` / `stiffness` / `damping` values in each component
 
