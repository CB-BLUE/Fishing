// uploads.js
// Reads EXIF via global EXIF (exif-js), stamps image with date/time and returns dataURL + meta

export async function processUpload(file) {
  const dataUrl = await readFileAsDataURL(file);
  const img = await loadImage(dataUrl);
  const exif = await readEXIF(file);
  const stamp = (exif && exif.DateTimeOriginal) ? exif.DateTimeOriginal : new Date().toISOString();

  const canvas = document.createElement('canvas');
  // downscale if massive to keep localStorage/indexedDB friendly
  const maxW = 1600;
  const scale = img.width > maxW ? maxW / img.width : 1;
  canvas.width = Math.round(img.width * scale);
  canvas.height = Math.round(img.height * scale);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const pad = 10;
  const fontSize = Math.max(14, canvas.width / 45);
  ctx.font = `${fontSize}px sans-serif`;
  const text = `Captured: ${stamp}`;
  const tw = ctx.measureText(text).width;
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillRect(10, canvas.height - fontSize - pad*1.8, tw + pad*2, fontSize + pad);
  ctx.fillStyle = '#fff';
  ctx.fillText(text, 16, canvas.height - pad);

  return { dataUrl: canvas.toDataURL('image/jpeg', 0.85), meta: exif || {} };
}

function readFileAsDataURL(file){ return new Promise((res, rej) => { const r=new FileReader(); r.onload=()=>res(r.result); r.onerror=rej; r.readAsDataURL(file); }); }
function loadImage(dataUrl){ return new Promise((res, rej) => { const i=new Image(); i.onload=()=>res(i); i.onerror=rej; i.src = dataUrl; }); }
function readEXIF(file){ return new Promise((res) => { try { EXIF.getData(file, function(){ const tags = EXIF.getAllTags(this); res(tags); }); } catch(e) { res(null); } }); }
