// Tiny Supabase client (no extra dependency). The anon key is public by design:
// what visitors and the admin may do is enforced by the Row Level Security rules in supabase/setup.sql.
const URL_ = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const configured = !!(URL_ && KEY);
export const cvUrl = `${URL_}/storage/v1/object/public/media/cv.pdf`;
const S = 'sb-session';
const load = () => { try { return JSON.parse(localStorage.getItem(S)); } catch { return null; } };
const save = (d) => localStorage.setItem(S, JSON.stringify({access_token: d.access_token, refresh_token: d.refresh_token, expires_at: Date.now() + d.expires_in * 1000}));
export const signedIn = () => !!load();
export const signOut = () => localStorage.removeItem(S);
const expired = () => { signOut(); location.reload(); return new Error('Please sign in again.'); };

export async function signIn(email, password) {
  const r = await fetch(`${URL_}/auth/v1/token?grant_type=password`, {method: 'POST', headers: {apikey: KEY, 'Content-Type': 'application/json'}, body: JSON.stringify({email, password})});
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(r.status === 400 ? 'Wrong email or password.' : d.error_description || d.msg || 'Login failed.');
  save(d);
}
async function token() {
  const s = load(); if (!s) throw expired();
  if (s.expires_at - Date.now() > 60000) return s.access_token;
  const r = await fetch(`${URL_}/auth/v1/token?grant_type=refresh_token`, {method: 'POST', headers: {apikey: KEY, 'Content-Type': 'application/json'}, body: JSON.stringify({refresh_token: s.refresh_token})});
  if (!r.ok) throw expired();
  save(await r.json()); return load().access_token;
}
const headers = async (auth) => {
  const h = {apikey: KEY};
  if (auth) h.Authorization = `Bearer ${await token()}`; else if (KEY.startsWith('eyJ')) h.Authorization = `Bearer ${KEY}`;
  return h;
};

// ---- validation (same rules the old Worker used)
const txt = (v, n) => String(v || '').trim().slice(0, n);
const url = (v) => { v = String(v || '').trim(); if (!v) return ''; try { const u = new URL(v); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } };
const img = (v) => { v = String(v || '').trim(); return v.startsWith('/') && !v.startsWith('//') ? v.slice(0, 300) : url(v); };
export const clean = (d) => ({t: txt(d.t, 100), cat: txt(d.cat, 40) || 'Web app', yr: txt(d.yr, 20), f: d.f ? 1 : 0, s: txt(d.s, 500), role: txt(d.role, 300), tech: txt(d.tech, 200), url: url(d.url), repo: url(d.repo), img: img(d.img), video: img(d.video), note: txt(d.note, 200)});

// ---- database
async function rest(path, {method = 'GET', body, auth = false} = {}) {
  const h = await headers(auth); if (body) h['Content-Type'] = 'application/json';
  const r = await fetch(`${URL_}/rest/v1/${path}`, {method, headers: h, body: body && JSON.stringify(body)});
  if (r.status === 401 && auth) throw expired();
  const t = await r.text(), d = t ? JSON.parse(t) : null;
  if (!r.ok) throw new Error(r.status === 403 || d?.code === '42501' ? 'Not allowed. Check that the email in supabase/setup.sql matches the one you signed in with.' : d?.message || 'Request failed.');
  return d;
}
const norm = (r) => ({id: r.id, published: r.published, ...clean(r.data || {})});
const ORDER = 'select=id,published,data&order=sort.asc,updated_at.desc';
export const listPublished = async () => (await rest(`projects?${ORDER}&published=eq.true`)).map(norm);
export const listAll = async () => (await rest(`projects?${ORDER}`, {auth: true})).map(norm);
export async function saveProject(id, published, data) {
  const d = clean(data); if (!d.t) throw new Error('Title is required.');
  if (id) return rest(`projects?id=eq.${encodeURIComponent(id)}`, {method: 'PATCH', auth: true, body: {published: !!published, data: d, updated_at: new Date().toISOString()}});
  const m = await rest('projects?select=sort&order=sort.desc&limit=1', {auth: true});
  return rest('projects', {method: 'POST', auth: true, body: {sort: (m[0]?.sort ?? 0) + 1, published: !!published, data: d}});
}
export const removeProject = (id) => rest(`projects?id=eq.${encodeURIComponent(id)}`, {method: 'DELETE', auth: true});
export const reorder = (ids) => Promise.all(ids.map((id, i) => rest(`projects?id=eq.${encodeURIComponent(id)}`, {method: 'PATCH', auth: true, body: {sort: i}})));

// ---- files
const EXT = {'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'video/mp4': 'mp4', 'video/webm': 'webm'};
async function put(path, file, onP, upsert, cache) {
  const h = await headers(true);
  return new Promise((res, rej) => {
    const x = new XMLHttpRequest(); x.open('POST', `${URL_}/storage/v1/object/media/${path}`);
    Object.entries({...h, 'Content-Type': file.type, 'x-upsert': String(upsert), 'cache-control': `max-age=${cache}`}).forEach(([k, v]) => x.setRequestHeader(k, v));
    x.upload.onprogress = (e) => onP && e.lengthComputable && onP(Math.round((e.loaded / e.total) * 100));
    x.onload = () => { let d = {}; try { d = JSON.parse(x.responseText); } catch {} x.status === 401 ? rej(expired()) : x.status < 300 ? res(`${URL_}/storage/v1/object/public/media/${path}`) : rej(new Error(d.message || 'Upload failed.')); };
    x.onerror = () => rej(new Error('Network error. Check your connection and try again.'));
    x.send(file);
  });
}
export function upload(file, onP) {
  const ext = EXT[file.type], vid = file.type.startsWith('video/');
  if (!ext) throw new Error('Allowed: PNG, JPG, WebP, GIF images or MP4, WebM videos.');
  if (file.size > (vid ? 40e6 : 5e6)) throw new Error(`File is too large (max ${vid ? 40 : 5} MB).`);
  return put(`${vid ? 'vid' : 'img'}/${crypto.randomUUID()}.${ext}`, file, onP, false, 31536000);
}
export function uploadCv(file) {
  if (file.type !== 'application/pdf') throw new Error('Only PDF files are allowed.');
  if (file.size > 8e6) throw new Error('File is too large (max 8 MB).');
  return put('cv.pdf', file, null, true, 60);
}
export async function removeCv() {
  const r = await fetch(`${URL_}/storage/v1/object/media/cv.pdf`, {method: 'DELETE', headers: await headers(true)});
  if (!r.ok) throw new Error('Could not remove the CV.');
}
