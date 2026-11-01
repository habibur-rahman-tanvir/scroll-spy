<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Professional Developer Portfolio

You are working on a **professional, production-quality, single-page developer portfolio** built with the existing Next.js project. Follow these instructions for every change in this repository.

## 1. Project mission

Build a polished portfolio for **Habibur Rahman Tanvir**, a **MERN Stack Developer from Bangladesh**. The site must present the developer clearly, make selected work easy to evaluate, and provide simple ways to make contact.

This is a **single-page, scroll-based portfolio**. All portfolio sections must be rendered in one page document and stacked vertically. The browser pathname represents the currently active section:

| Section  | Path        |
| -------- | ----------- |
| Home     | `/`         |
| About    | `/about`    |
| Skills   | `/skills`   |
| Projects | `/projects` |
| Contact  | `/contact`  |

An optional Experience section may be included only when real, verified experience data is available. Do not invent employment history, years of experience, client names, awards, certifications, user counts, performance improvements, project outcomes, testimonials, or other credentials.

## 2. First action: inspect before changing

Before editing anything:

1. Inspect the repository structure and read `package.json`, the lockfile, `tsconfig.json`, lint/format configuration, `src/app` (or `app`), global styles, existing components, and installed UI/icon libraries.
2. Check the existing Git diff/status. Do not overwrite or revert unrelated user changes.
3. Identify the installed Next.js, React, TypeScript, Tailwind CSS, and component-library versions. Follow the versions already installed.
4. Identify the package manager from the lockfile and use that package manager only.
5. Preserve existing aliases, conventions, design tokens, fonts, and reusable components unless there is a clear reason to change them.
6. If this repository already contains a working implementation, improve it rather than scaffolding a second application or duplicating components.

Do not assume a particular Next.js version or blindly copy APIs from an older tutorial. Check the installed version and its compatible types before implementing route params, metadata, or framework APIs.

## 3. Required user experience

### 3.1 Overall layout

Create one cohesive page with these sections, in this order:

1. Home / Hero
2. About
3. Skills
4. Projects
5. Contact

A footer follows Contact. Keep the page content in a single shared page composition; do not create a separate visual page for each section.

### 3.2 Sticky, responsive navbar

The navbar must:

- Stay visible at the top while scrolling (`position: sticky` or a carefully implemented fixed header, with correct content offset).
- Show a recognizable brand mark/logo and the developer name, **Habibur Rahman Tanvir**. A clean text/monogram logo is acceptable; do not invent a company brand.
- Include links for Home, About, Skills, Projects, and Contact.
- Clearly distinguish the active item with an accessible visual treatment (not color alone; use weight, underline, pill, indicator, or border as appropriate).
- Work at mobile, tablet, laptop, and wide-desktop widths.
- Collapse to a keyboard-accessible mobile menu on narrow screens. The menu button must expose `aria-expanded` and `aria-controls`, have an accessible label, close after navigation, and support Escape.
- Provide visible keyboard focus styles and an appropriate `aria-current="location"` (or equivalent) on the active section link.
- Respect reduced-motion preferences.

Use semantic anchor links with real `href` values such as `/about`. When JavaScript is available, intercept eligible same-tab clicks to perform in-page scrolling and synchronize history. Do not make navigation controls inert buttons without link semantics.

### 3.3 Scroll spy

Implement reliable scroll-spy behavior:

- Detect which section is currently active as the user scrolls.
- Update the active navbar item without requiring a click.
- Account for the sticky navbar so a section heading is not hidden behind it.
- Work with sections of different heights, including short sections and long project lists.
- Avoid flickering when two sections briefly intersect the observer region. Use a deliberate activation zone and a stable selection strategy.
- Avoid expensive work on every raw scroll event. Prefer `IntersectionObserver`; if a scroll-position fallback is required, throttle it with `requestAnimationFrame` and clean up listeners.
- Disconnect observers and remove listeners during cleanup.

A good starting point is an `IntersectionObserver` with a central activation band (`rootMargin`) adjusted for the actual header height. Do not copy fixed percentages without testing the actual layout. For edge cases, determine the section crossing a consistent activation line or use a stable fallback based on section geometry.

### 3.4 Real-time URL synchronization

The pathname must represent the currently active section while all sections remain on the same page:

- Home → `/`
- About → `/about`
- Skills → `/skills`
- Projects → `/projects`
- Contact → `/contact`

Use the **native History API** for this scroll-state URL behavior, integrated with the installed Next.js App Router version:

- On passive scrolling, use `window.history.replaceState(...)` so the URL updates without creating a new history entry for every section transition.
- On an intentional navbar click, use `window.history.pushState(...)` so the user can use Back to return to the previous section selection.
- Do not call `pushState` repeatedly for the same active path.
- Update the active state immediately on a navbar click, then let scroll observation confirm the final section.
- Handle the browser `popstate` event: read the pathname, update the active item, and scroll to the matching section without a full page reload.
- Since `pushState` and `replaceState` do not themselves emit `popstate`, update local UI state explicitly when calling them.
- Preserve query strings and hashes only if the application actually uses them; do not accidentally discard required URL state.
- Ensure programmatic smooth scrolling does not cause a different section to win temporarily and leave the wrong URL. Use a small navigation/scroll coordination mechanism if needed; do not add arbitrary long timers.

Next.js documents that native `pushState` and `replaceState` integrate with the App Router and synchronize with `usePathname` / `useSearchParams`. Follow the official documentation for the installed version:

- [Next.js — Native History API](https://nextjs.org/docs/app/getting-started/linking-and-navigating#native-history-api)

### 3.5 Direct URLs, refresh, and route resolution

The following must all work when entered directly in the address bar, opened in a new tab, or refreshed:

`/`, `/about`, `/skills`, `/projects`, `/contact`.

All of them must resolve to the same single-page portfolio composition and then scroll to the corresponding section after the client has mounted. Do not allow a direct `/about` refresh to return a 404.

For an App Router project, use a suitable optional catch-all route (for example, `app/[[...section]]/page.tsx`) **only after checking existing routes for conflicts**. Validate the route slug against the known section IDs; call `notFound()` for an unknown path instead of silently mapping every invalid URL to Home. Keep the page shell and section content shared. Follow the installed Next.js version's route-param typing; do not assume whether `params` is synchronous or a Promise.

Official reference: [Next.js — Dynamic and Optional Catch-all Segments](https://nextjs.org/docs/app/api-reference/file-conventions/dynamic-routes).

### 3.6 Initial load and browser history

- On initial load at `/about`, `/skills`, `/projects`, or `/contact`, scroll to the matching section after the DOM is available.
- Avoid an initial scroll-spy event overwriting the requested URL with `/` before the initial target scroll completes.
- Handle Back and Forward navigation and keep both pathname and active navbar state consistent.
- Do not force a full page reload for section changes.
- Do not create a new history entry for every scroll update.
- If a requested section does not exist, use a deliberate not-found or Home fallback consistent with route validation; never throw a client-side null-reference error.

## 4. Visual and brand direction

The result should look like a **carefully art-directed professional developer portfolio**, not a generic starter template or an unmodified component-library demo.

Use a coherent visual system:

- Strong typographic hierarchy, readable line lengths, intentional whitespace, consistent alignment, and a restrained color palette.
- A refined background and one clear accent color. Use subtle borders, surface contrast, and restrained shadows rather than excessive gradients, glass effects, glow, or decorative blobs.
- A visually strong hero with a clear role statement, a concise value proposition, and prominent actions such as **View Projects** and **Contact Me**.
- A polished About section explaining the developer's focus and approach without unsupported claims.
- Skills grouped by category (for example, Frontend, Backend, Database, Tools) rather than one oversized list of random badges.
- Project cards with clear descriptions, technologies, and real repository/live-demo links when available.
- A useful Contact section with working contact actions and social links.
- A consistent footer with sensible links and a current year generated at runtime or build time.

Design for mobile first, then enhance at tablet, desktop, and ultrawide sizes. Check at least 360px, 768px, 1024px, and 1440px viewport widths. Avoid horizontal overflow.

Do not add stock imagery or random illustrations just to fill empty space. If no verified portrait is provided, use a tasteful initials/abstract code-inspired visual that does not pretend to be a photograph. Use `next/image` for actual raster images where appropriate, with meaningful alt text.

## 5. Portfolio content and data integrity

Keep editable portfolio content in a centralized typed data module (for example, `src/data/portfolio.ts`) rather than scattering personal details through components.

The data model should cover:

- Name and professional role
- Short hero introduction and About copy
- Location (Bangladesh, only if desired by the owner)
- Skills grouped by category
- Featured projects, each with name, concise factual summary, stack, repository URL, optional live URL, and optional image
- Email and social profile URLs
- Optional resume/CV URL

Use the following known starting identity unless the user changes it:

- Name: Habibur Rahman Tanvir
- Role: MERN Stack Developer
- Positioning: builds web applications with the MERN ecosystem

Treat all other details as configurable content. Never fabricate email addresses, phone numbers, GitHub/LinkedIn URLs, project links, dates, education, employment, credentials, testimonials, statistics, or outcomes. If a value is unknown, keep it as a clearly marked TODO in the centralized data file or omit the corresponding UI element until configured. Do not show broken `#` links or buttons that appear functional but do nothing.

The developer has worked on projects referred to as **SocialNet** and **FixFlow**. They may be shown as portfolio projects only after checking available project documentation or the owner-provided descriptions in the repository. Do not invent feature lists, deployment URLs, user counts, or business impact for them.

## 6. Technical architecture and code quality

- Use the existing **Next.js App Router** if that is what the project currently uses. Do not migrate routers or rewrite the project without a compelling reason.
- Use TypeScript and maintain strict types. Avoid `any`; use `unknown` and narrow it when needed.
- Keep Server Components as the default. Add the exact `"use client"` directive only to modules that need browser APIs, event handlers, or client state.
- Keep scroll-spy/history behavior in a focused hook or controller (for example, `useSectionNavigation`) rather than one giant component.
- Keep the Navbar, mobile menu, Hero, About, Skills, Projects, Contact, and Footer in focused components.
- Keep repeated content data-driven and typed.
- Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`, and a logical heading order).
- Give each section a stable ID that exactly matches its route slug.
- Reuse existing design tokens and CSS variables where possible.
- Reuse installed shadcn/ui components and project conventions. Do not initialize shadcn again if it is already configured.
- Use the existing icon library if present. Do not install an icon package for a handful of icons when a suitable library is already available.
- Avoid unnecessary animation/form/UI dependencies, global state, context providers, and abstractions.
- Avoid hydration mismatches. Never access `window`, `document`, or `localStorage` during Server Component rendering.
- Clean up every observer, event listener, and subscription.
- Follow the repository's ESLint/Prettier configuration.

### Font and asset reliability

- Preserve the existing font setup if it builds correctly.
- Do not introduce a build-time dependency on downloading Google Fonts. If the project has font-network failures, prefer an available local font via `next/font/local` (only when the font file exists and its license permits use) or a high-quality system font stack.
- Do not commit downloaded font files unless provided by the owner and redistribution is permitted.
- Do not use remote image URLs without verifying availability and configuring the project's image policy as needed.

## 7. Accessibility requirements

- All navigation must be keyboard accessible.
- Use anchors for navigation and buttons for actions.
- Include a skip-to-content link and visible keyboard focus indicators.
- Use sufficient text/background contrast; do not rely on color alone to communicate active navigation or status.
- Give icon-only buttons accessible names.
- Expose mobile menu state to assistive technology and close it with Escape.
- Respect `prefers-reduced-motion`; reduce or disable smooth scrolling and decorative animation when requested.
- Add meaningful image alt text; decorative images should use empty alt text.
- Use correct heading hierarchy and landmarks.

## 8. SEO, metadata, and sharing

- Add a concise, accurate title and description for a MERN Stack Developer portfolio.
- Configure metadata in the appropriate App Router layout/page using the installed Next.js API.
- Add Open Graph and social metadata where useful.
- Set a canonical base URL only when the real production domain is known; do not invent a domain.
- Ensure each section URL loads the portfolio and scrolls to its matching section.
- Use descriptive link text and meaningful page headings.
- Add a favicon/brand mark only from existing or owner-approved assets; a simple monogram is acceptable if no asset exists.

## 9. Performance and responsive behavior

- Keep the initial page lightweight and avoid unnecessary client-side JavaScript.
- Avoid large animation or icon libraries for small effects.
- Use optimized image handling and explicit dimensions/aspect ratios to reduce layout shifts.
- Avoid layout shifts when the navbar, hero media, or project images load.
- Avoid scroll-jacking, custom wheel handlers, and forced scroll snapping. Normal browser scrolling should feel natural.
- Keep interactive targets comfortably tappable on mobile.

## 10. Contact and external actions

- Contact links must use real configured destinations (for example, `mailto:` and verified social URLs).
- If no backend/email provider is configured, do not create a fake contact form that always shows success. Use a working email link or clearly indicate that form delivery is not configured.
- Never expose private API keys or secrets in client-side code.
- External links that open a new tab must use safe `rel` attributes.
- Show a resume download action only when a real CV file is present.

## 11. Implementation workflow

Work end-to-end; do not stop after proposing a plan.

1. Inspect the repository and identify the existing stack and constraints.
2. Create a short implementation plan, then implement in the existing architecture.
3. Build the page shell, section components, centralized portfolio data, responsive sticky navbar, and mobile menu.
4. Implement scroll-spy and URL synchronization as focused, testable client logic.
5. Implement direct section URL loading, refresh support, and Back/Forward behavior.
6. Add metadata, accessibility, responsive styling, and deliberate handling for unknown paths/content.
7. Run the available formatter, lint, type-check, and production build commands. Read `package.json`; do not invent script names.
8. Fix issues introduced by your changes. Do not hide errors by disabling lint rules or weakening TypeScript.
9. Review the final diff and remove dead code, debug logs, unused imports, placeholder links, and unnecessary dependencies.
10. Provide a concise completion report listing features, files changed, validation commands/results, and any owner-provided content still needed.

Do not claim a command passed unless you actually ran it and observed success. If a check cannot run, state why.

## 12. Acceptance checklist (must pass)

### Navigation and routing

- [ ] All sections are present in one continuous page document.
- [ ] Sticky navbar remains usable while scrolling.
- [ ] Clicking each navbar item scrolls to the correct section (smoothly unless reduced motion is enabled).
- [ ] Clicking a navbar item updates the URL without a full page reload.
- [ ] Manual scrolling updates the URL to the active section.
- [ ] Passive scroll updates use `replaceState`, not a new history entry per section transition.
- [ ] Intentional section navigation creates a history entry only when appropriate.
- [ ] Active navbar item stays synchronized with the visible section.
- [ ] Back and Forward restore the corresponding section and active state.
- [ ] Direct navigation and refresh work for `/`, `/about`, `/skills`, `/projects`, and `/contact`.
- [ ] Unknown section paths return a deliberate 404, not a broken page.
- [ ] Programmatic scrolling and observer callbacks do not fight or leave a stale URL.

### Visual and responsive quality

- [ ] Navbar displays the monogram/brand and developer name.
- [ ] Mobile menu is functional and accessible.
- [ ] Layout is polished at 360px, 768px, 1024px, and 1440px.
- [ ] No horizontal overflow or clipped navigation exists.
- [ ] Sections share consistent spacing, typography, color, and interaction patterns.
- [ ] Project cards are readable and links work only when configured.

### Quality and accessibility

- [ ] No fabricated personal facts, credentials, project metrics, or links.
- [ ] Keyboard navigation and visible focus work.
- [ ] Active nav state is accessible to screen readers.
- [ ] Reduced-motion preferences are respected.
- [ ] No hydration or console errors are introduced.
- [ ] Observers/listeners are cleaned up.
- [ ] Lint, type-check, and production build pass, or any pre-existing/blocking issue is clearly documented.

## 13. Important implementation note

This portfolio uses **pathnames as section state**, not separate content pages. The page should remain mounted as one continuous document while the pathname changes. Do not replace this requirement with hash links (`/#about`), query parameters (`/?section=about`), separate route-specific page layouts, or full-page reloads. The route segment exists only to make clean section paths work on direct entry and refresh.
