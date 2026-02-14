# Gatekeeper Full Diagnostic Report

**Date:** 2026-02-13  
**Component:** TheftAutoGatekeeper  
**Status:** 🔧 Fixes applied

---

## Issues Found

### 1. **body::before z-index 9999 blocks gatekeeper**
- **Symptom:** Gatekeeper overlay may appear faint or below other elements
- **Cause:** `body::before` in globals.css has `z-index: 9999` and `position: fixed` — a full-screen texture overlay painted on top of everything, including the gatekeeper (z-100)
- **Fix:** Lowered `body::before` to `z-index: 0` so it acts as a background texture, not a screen overlay

### 2. **Gatekeeper inside main → stacking below Navbar**
- **Symptom:** Gatekeeper may be partially obscured by Navbar (z-50)
- **Cause:** Gatekeeper is rendered inside `main`, which is a sibling of `Navbar`. Navbar has `z-50`, main has no z-index. Stacking order: Navbar paints on top of main, so the gatekeeper (inside main) is below the Navbar
- **Fix:** Render gatekeeper via `createPortal` to `document.body` so it sits above the layout and is not affected by parent stacking contexts

### 3. **LenisProvider / ReactLenis**
- **Status:** No transform on root; `position: fixed` gatekeeper should not be affected
- **Note:** If Lenis added `transform` in future, fixed elements inside would be contained — portal avoids this

### 4. **Assets**
- **theft-auto-cover.jpg:** ✅ `public/images/theft-auto-cover.jpg` exists
- **SITE_CONTENT.hero.theftAutoCover:** ✅ Resolves to `/images/theft-auto-cover.jpg` (or with basePath in prod)

---

## Component Hierarchy (after fix)

```
body
  body::before (z-0) — texture overlay
  LenisProvider
    ParticleBackground (z-0)
    div (z-10)
      Navbar (z-50)
      main
        TheftAutoGatekeeper (portal target: body)
          → portal renders overlay as direct child of body (z-[100])
  [Portal] Gatekeeper overlay (fixed inset-0 z-[100])
```

---

## Fixes Applied

1. **globals.css:** `body::before` z-index 9999 → 0
2. **TheftAutoGatekeeper.tsx:** Use `createPortal` to render overlay to `document.body`

---

## Verification

1. Run `npm run dev` and open http://localhost:3008
2. Gatekeeper should show: dark bg, theft-auto-cover image, ENTER button
3. Click ENTER → thud sound, overlay slides up, content revealed
4. Whoosh plays on mount (file or synth fallback)

---

## Recommended Commands

```bash
# Clean and restart (if port in use)
lsof -ti:3008 | xargs kill -9 2>/dev/null
rm -rf .next
npm run dev
```
