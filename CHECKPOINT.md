# Checkpoint — Project snapshot

Date: 2026-02-16

Summary: Saved workspace checkpoint after layout and content updates to the Hero section and mobile carousel.

Files changed (high level):
- components/Hero.tsx
  - Adjusted hero spacing and header typography
  - Reworked 4-card layout and added responsive carousel for mobile with autoplay and swipe
  - Added device orientation tilt to active mobile card
  - Reduced paddings and constrained mobile card sizes; enabled peek of previous/next slides
  - Centered and downsized hover logo; stacked logo above text on small screens
  - Updated hover copy for CNN / OkCupid / Luna Park / Quinn and polished wording
  - Added floating pinned pill (gif + name) that appears after scrolling past the profile GIF
  - Tuned hover fade timing to be smooth (0.25s ease-out)

- index.html
  - Added Google Fonts preload & stylesheet for Inter and Instrument Serif
  - Updated Tailwind `fontFamily` config to use Inter / Instrument Serif

- index.css
  - Restored `body` font-family to Inter and added `.font-sans` / `.font-serif` fallbacks

Notes / Next steps:
- Verify fonts load in-browser (hard refresh if cached); if `Instrument Serif` still doesn't render, check network devtools for font load errors.
- Visual checks requested: verify mobile slide sizing, peek, autoplay speed (now 4s), and the pinned pill appearance.
- I left the `components/Hero.tsx` changes in-place; if you want a git reset to a prior commit instead, tell me which scope to restore.

If you want, I can create a git commit here (if you want me to run commands) or generate a patch file for backup.
