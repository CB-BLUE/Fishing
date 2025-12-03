// app.js
// Core app module: register SW, export small helpers if needed

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(()=> {
    console.log('ServiceWorker registered');
  }).catch(e => console.warn('SW registration failed', e));
}

// small helper to fetch open-meteo or other services; used later
export async function fetchJSON(url) {
  const r = await fetch(url); if (!r.ok) throw new Error('Fetch fail');
  return r.json();
}
