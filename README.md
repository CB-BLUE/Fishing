# Saltwater Sport Fishing — PWA Competition App

This repository contains a multi-page, offline-capable PWA for saltwater sport fishing competitions:
- Register competitions, register competitors
- QR-based check-in
- Photo proof with timestamp overlay (EXIF-aware)
- PDF receipts, offline caching, PWA manifest
- Payment sandbox + server webhook example for production payments

## Quick start (frontend)
1. Copy files to repo root. Ensure `index.html` is lowercase.
2. Commit & push to `main`.
3. Enable GitHub Pages: Settings → Pages → Branch: main → Root → Save.
4. Visit `https://<username>.github.io/<repo>/`.

## Payment
- The included `payment-sandbox.html` is a demo only. For real payments, deploy `server/server.js` to render/railway/Heroku and configure PayFast IPN to point to `https://<your-host>/payfast/ipn`. Do not store merchant keys in this repo.

## Libraries used (CDN)
- QR code: qrcodejs (cdnjs)
- EXIF: exif-js (jsdelivr)
- jsPDF: cdnjs

## Extending
- Add Open-Meteo tide/weather hooks into `competitions.html` or a dedicated dashboard page.
- Add Leaflet + OSM for spot maps.
- Replace IndexedDB with Firebase Firestore + Storage for cloud sync.

## License
MIT — feel free to adapt.
