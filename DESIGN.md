# Design System: Didactik Media
**Repository:** `emem-attah`
**Domain:** `https://www.didactikmedia.com`
**Stack:** React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion

---

## 1. Visual Theme & Atmosphere

The Didactik Media website carries the atmosphere of a **serious, culturally-grounded institution with a forward-looking technological edge**. Think: a national archive meets a Silicon Valley startup. The aesthetic is **clean, spacious, and editorially restrained** — lots of breathing room, generous white space, and crisp typography that commands authority without aggression.

The mood is neither cold and corporate nor playfully casual. It occupies a deliberate middle ground: **trustworthy and intellectual** (communicated through a serif headline font and muted text tones) while being **boldly innovative** (expressed through a vibrant electric-gradient brand accent that anchors CTAs and headline highlights).

Section backgrounds alternate rhythmically between pure white (`#ffffff`) and a soft warm near-white (`#f8f8f8`) to create gentle visual rhythm without hard contrast breaks. A single eco-themed section introduces a whisper of green to signal the sustainability narrative.

**Overall density:** Airy. Content is never crowded. Cards and text blocks breathe.
**Overall motion:** Purposeful and calm. Entrance animations are subtle fade-and-rise transitions — nothing flashy. The hero image has a slow, floating bob to suggest life and archival memory without distraction.

---

## 2. Color Palette & Roles

| Descriptive Name | Hex | Tailwind Token | Role |
|---|---|---|---|
| **Electric Cobalt** | `#5343FD` | `primary` / `brand-purple` | Brand anchor. Used for headings, footer background, card-hover borders, and icon accents. The colour of authority and precision. |
| **Aqua Broadcast** | `#3FD7FF` | `secondary` / `brand-cyan` | The energy colour. Used for stats figures, active nav states, hover states on links, icon highlights, and the CTA gradient terminus. Evokes broadcast signals and digital waves. |
| **Lavender Lift** | `#7B68FE` | `accent` | Lighter purple used as the lightened hover midpoint in the CTA button gradient — adds warmth to the primary without abandoning the brand family. |
| **Chalk Canvas** | `#f8f8f8` | `bg-alt` | Alternate section background. A barely-there warm off-white that creates soft section breaks without harshness. |
| **Pure Stage** | `#ffffff` | `white` | Primary page and card background. The default resting state. |
| **Slate Prose** | `#374151` (gray-700) | — | Primary body copy and navigation text. Dark enough to read comfortably, soft enough not to compete with brand colours. |
| **Ash Commentary** | `#6B7280` (gray-500/600) | — | Secondary descriptive text, captions, metadata, and footer copy. Recedes gracefully. |
| **Whisper Border** | `#E5E7EB` (gray-200) | — | Card strokes, header bottom border, section dividers. Barely visible — structure without weight. |
| **Forest Signal** | `#16A34A` (green-600/700) | — | Sustainability section only. Used for the 90% stat and "Climate-Positive" badge text. Intentionally isolated to the eco narrative. |
| **Meadow Wash** | `#F0FDF4` / `#ECFDF5` (green-50 / emerald-50) | — | Sustainability section background gradient. A gentle environmental tint that contextualises the green narrative without overwhelming. |

**Gradient Rule:** The signature brand gradient flows diagonally from Electric Cobalt to Aqua Broadcast (`135deg, #5343FD → #3FD7FF`). It appears in two contexts:
1. **CTA Buttons** — as a full pill-shaped background fill.
2. **Hero & page headline accents** — applied as a `bg-clip-text` gradient to key words in `<h1>` and `<h2>` elements (e.g. *"Africa's Story."*, *"Cultural Capital."*, *"Memory."*), making those words shimmer with brand energy.

---

## 3. Typography Rules

### Font Families
- **Display / Headings:** `Crimson Pro` (serif) — Weights 400, 600, 700. Loaded from Google Fonts. Used for all `h1`–`h6` elements globally. Chosen for its editorial gravitas and cultural resonance — the same quality a well-typeset book on African heritage would carry.
- **Body / UI:** `Inter` (sans-serif) — Weights 400, 500, 600, 700. The workhorse of the interface. Used for all body text, navigation labels, captions, buttons, labels, and any text that is not a heading.

### Heading Scale
| Element | Size | Weight | Notes |
|---|---|---|---|
| `h1` (Hero) | `text-4xl` → `text-8xl` (responsive) | `font-bold` (700) | Up to 8xl on desktop; responsive scaling. |
| `h1` (Page headers) | `text-5xl` / `text-6xl` | `font-bold` (700) | Inner page section headers. |
| `h2` (Section titles) | `text-3xl` / `text-4xl` | `font-bold` (700) | White-background sections. |
| `h3` (Card titles) | `text-2xl` / `text-xl` | `font-semibold` (600) | Cards, service items, value propositions. |

### Body Copy
- Standard body: `text-base` or `text-lg`, `text-gray-600`, `leading-relaxed`
- Large introductory paragraph: `text-xl` / `text-2xl`, `text-gray-600`
- Secondary / meta text: `text-sm`, `text-gray-500`, often `uppercase tracking-wide` for labels

### Navigation
- Nav links: `text-sm`, `font-medium`, `uppercase`, `tracking-wide`. Active state turns `text-secondary` (Aqua Broadcast). Default rests at `text-gray-700`.

### Stat Numbers
- Large impact figures: `text-2xl`–`text-5xl` (responsive), `font-bold`, colored `text-secondary` (Aqua Broadcast). Paired with `text-xs`/`text-sm` uppercase `tracking-wide` labels in `text-gray-500`.

---

## 4. Component Stylings

### Buttons (`cta-button`)
- **Shape:** Fully pill-shaped (`border-radius: 9999px` — `rounded-full`)
- **Background:** Brand diagonal gradient: `linear-gradient(135deg, #5343FD 0%, #3FD7FF 100%)`
- **Text:** White, `font-weight: 600`, `font-family: Inter`
- **Padding:** `1rem 2rem` (16px top/bottom, 32px left/right)
- **Hover state:** Gradient lightens to `#7B68FE → #5FE3FF`; element lifts with `translateY(-2px)` and gains a diffused cobalt glow (`box-shadow: 0 10px 25px rgba(83, 67, 253, 0.3)`)
- **Transition:** `all 0.3s` smooth
- **Usage:** Primary call-to-action links and form submit buttons. Never used for nav items.

### Cards (`.card`)
- **Shape:** Subtly rounded corners (`border-radius: 0.5rem` / `rounded-lg`)
- **Background:** Pure white (`#ffffff`)
- **Padding:** `1.5rem` (24px all sides)
- **Border:** 1px solid Whisper Border (`#E5E7EB`)
- **Default state:** Flat — no visible shadow
- **Hover state:** Lifts with `translateY(-4px)` and gains a diffused shadow (`0 10px 25px rgba(0,0,0,0.1)`)
- **Hover border accent:** Border tints toward `primary/20` or `secondary/20` depending on context
- **Transition:** `all 0.3s`

### Form Inputs
- **Shape:** Subtly rounded corners (`rounded-lg`)
- **Padding:** `px-4 py-2.5`
- **Border:** 1px solid `#D1D5DB` (gray-300) at rest
- **Focus state:** Outline removed; `ring-2 ring-secondary` (Aqua Broadcast ring) with `border-transparent` — the secondary cyan glow replaces the border
- **Background:** White
- **Transition:** `all` smooth

### Navigation / Header
- **Background:** Pure white, `border-b` in Whisper Border (`#E5E7EB`)
- **Position:** `sticky top-0 z-50`
- **Height:** `py-6` (24px top/bottom padding within a max-width container)
- **Logo:** SVG file (`/images/didactik-logo-1.svg`), `h-8 md:h-10`
- **Mobile menu:** Animated height collapse using Framer Motion `AnimatePresence`, slides in with staggered nav links

### Footer
- **Background:** Electric Cobalt (`#5343FD` / `primary`) — a bold, brand-saturating base
- **Text:** White primary, `text-gray-500` (muted) for secondary copy — note: gray-500 on a cobalt bg appears as a light muted tone
- **Accent icons:** Aqua Broadcast (`text-secondary`) for social/contact icons
- **Divider:** `border-gray-700` (dark, barely visible on cobalt bg)
- **Layout:** 3-column grid on desktop (Company Info | Contact | Social), stacks on mobile

### Featured Image Containers (News / Founder)
- **Shape:** Generously rounded (`rounded-xl` / `rounded-2xl`)
- **Border:** `border-4 border-white` — a crisp white frame that separates image from background
- **Shadow:** `shadow-2xl` — deep, dramatic drop shadow for presence
- **Hover:** Scale `1.02` on the news image container with `duration-500` — a slow, confident zoom

### Sustainability Section
- **Background:** `bg-gradient-to-br from-green-50 to-emerald-50` — a soft diagonal eco-wash
- **Badge:** Pill-shaped (`rounded-full`), `bg-green-100 text-green-800`, contains a leaf emoji + text
- **Stat cards within:** White background, `rounded-lg`, `shadow-md`
- **Numbers:** `text-green-600`, `font-bold`, `text-4xl`

### Blockquotes (Impact page)
- **Opening quotation mark:** `text-6xl`, `text-secondary` — large Aqua Broadcast `"` as decorative opener
- **Quote text:** `font-serif`, `italic`, `text-2xl md:text-3xl`, `text-gray-800`
- **Attribution:** `text-lg`, `text-gray-600`

### Process Step Numbers (OurWork page)
- **Style:** `text-6xl md:text-8xl`, `font-serif`, `font-bold`, displayed with a subtle gradient clip in `primary/20 → secondary/20` — ghost-numbered large ordinals that guide the eye without competing with content

---

## 5. Layout Principles

### Container
- Max width: `1280px`, horizontally centered (`mx-auto`)
- Horizontal padding: `1rem` (mobile) → `1.5rem` (sm) → `2rem` (lg+)
- All content sections wrap in this container

### Section Rhythm
- Standard vertical padding: `py-16` (64px) — the default breathing room between sections
- Hero section: `py-12 md:py-20 lg:py-32` — maximum vertical breathing room at top
- Inner page hero (non-home): `pt-20 pb-10` header + `pt-10 pb-20` content — a deliberate two-part split

### Alternating Section Backgrounds
Sections alternate in a repeating pattern to create visual flow without borders:
1. White (`bg-white`) — content section
2. Chalk Canvas (`bg-bg-alt`) — alternate content or stats
3. Gradient white-to-bg-alt (`bg-gradient-to-b from-bg-alt to-white`) — used for page header sections

### Grid System
- **3-column feature grid:** `grid-cols-1 md:grid-cols-3 gap-8` — used for value props, services
- **4-column core values:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8`
- **2-column content/image split:** `grid-cols-1 md:grid-cols-2 gap-12` (About) / `lg:grid-cols-2 gap-10` (Contact, Impact)
- **3-column footer:** `grid-cols-1 md:grid-cols-3 gap-8`

### Animation & Motion (Framer Motion)
- **Page entrance (Hero):** `staggerChildren: 0.2, delayChildren: 0.05` — elements cascade in from opacity 0 + translateY(30px)
- **Scroll-triggered sections:** `whileInView` with `viewport={{ once: true, margin: "-50px" }}` — animations fire once, just before entering viewport. Duration typically `0.6`–`0.8s`
- **Alternating entrance direction:** Even-indexed items slide in from left (`x: -50`), odd from right (`x: 50`) on the OurWork process list
- **Hero decorative image:** Infinite slow float animation, `y: [0, -15, 0]`, `duration: 6s`, `easeInOut` repeat
- **Mobile menu:** `height: 0 → auto` collapse/expand with `opacity: 0 → 1`, `duration: 0.3s`
- **Button micro-interaction:** `whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}` on submit button

### Whitespace Philosophy
- Content is never edge-to-edge. The container always applies horizontal padding.
- Headlines are followed by generous `mb-4`–`mb-8` before body text.
- Body copy uses `leading-relaxed` — comfortable line height for editorial reading.
- Cards in grids use `gap-8` — cards never feel cramped against each other.
- Stat figures have their own isolated block with `pt-6 border-t border-gray-200` — a ruled underline separates them from the main pitch.

---

## 6. Brand Voice (for copy parity with design)

Headlines follow a **declarative, present-tense statement** pattern that asserts purpose:
- *"Securing Africa's Story."*
- *"From Chaos to Cultural Capital."*
- *"Architects of Memory."*
- *"Why This Matters."*
- *"Secure Your Legacy."*
- *"Decarbonizing African History."*

The key word or phrase that carries the most emotional or brand weight is always given the **gradient text treatment** (Electric Cobalt → Aqua Broadcast clip). This acts as a consistent visual signature across every page.

---

## 7. Technology & Implementation Notes

| Concern | Implementation |
|---|---|
| **Fonts** | Loaded via Google Fonts in `index.css` (`@import url(...)`) and preconnected in `index.html` |
| **Animations** | Framer Motion — `motion.*` components with `variants`, `whileInView`, `AnimatePresence` |
| **Routing** | React Router v6 — `<Routes>` and `<Link>` |
| **SEO** | `react-helmet-async` per page; full OG/Twitter card + JSON-LD schema in `index.html` |
| **Images** | Custom `<ImageWithSkeleton>` component wraps all images with a loading skeleton |
| **Forms** | EmailJS (`@emailjs/browser`) for contact form submission |
| **Icons** | `react-icons/fa` for social and contact icons |
| **Tailwind** | v4 with `@import "tailwindcss"` in CSS; custom tokens in `tailwind.config.js` |
| **Logo Marquee** | `<LogoMarquee>` component for scrolling partner logos |
