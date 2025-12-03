# Fishing — Saltwater Showdown

# Fishing Web-App 🎣

[![GitHub Pages](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-brightgreen)](https://cb-blue.github.io/Fishing/)

A platform to register and manage fishing competitions — a minimal static demo to create competitions, share QR/join links, show basic weather/tide info and produce printable permits.

Owner: CB-BLUE

Overview
- Single-file static demo (Index.html) demonstrating:
  - Create competition (name, fee, date, spot)
  - Generate shareable join URL and QR code
  - Live weather (Open-Meteo) and tide times (WorldTides)
  - PayFast checkout integration (sandbox example)
  - Generate printable permit PDF via jsPDF

Quickstart
1. Clone or download the repository.
2. Serve the folder (recommended) or open Index.html in a browser:
   - Recommended static server: `npx http-server` or `python -m http.server`
3. Create a competition, copy/share the generated link or QR code, or open the link directly to join.

Configuration & Notes
- PayFast:
  - The example contains sandbox merchant_id/merchant_key placeholders. Replace with live credentials for production.
- WorldTides:
  - The example uses a demo key variable; register at https://www.worldtides.info to get a personal API key.
- CORS and remote images:
  - When generating PDFs with remote images, cross-origin restrictions may apply. The provided code attempts to load images with crossOrigin set to "Anonymous"; ensure remote servers send proper CORS headers.
- Security:
  - This is a demo single-file app and stores no server-side state. Do not use as-is for processing real payments or storing user data without adding secure server-side components.
  - Remove sandbox keys and secrets and never commit production secrets.

Files included
- Index.html — demo application
- README.md — this file
- .gitignore — ignores common local/build artifacts
- LICENSE — MIT license

TODO / Suggested next steps
- Add a small backend to:
  - Persist competitions and participants
  - Handle payment verification webhooks (PayFast)
  - Issue server-generated PDF permits
- Add unit/integration tests and CI
- Deploy to a static host (Netlify, Vercel, GitHub Pages for public demos)
- Add CONTRIBUTING.md and CODE_OF_CONDUCT for collaborators

License
- MIT (see LICENSE)
