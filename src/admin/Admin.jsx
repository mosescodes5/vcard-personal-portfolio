import {useCallback,useEffect,useRef,useState} from 'react';
import {ArrowDown,ArrowUp,ExternalLink,ImagePlus,LogOut,Pencil,Plus,Star,Trash2,Upload,Video,X} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Badge} from '@/components/ui/badge';
import {projects as seed} from '@/data.js';
import {shot} from '@/lib/shot';

const API = import.meta.env.VITE_API_URL || '';
const inp = 'w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30';
const tok = () => localStorage.getItem('adm');
const blank = {t:'',cat:'Web app',yr:'',f:false,s:'',role:'',tech:'',url:'',repo:'',img:'',video:'',note:'',published:true};
const host = (u) => { try { return new URL(u).host.replace(/^www\./, ''); } catch { return ''; } };
const pretty = (h) => { const n = h.split('.')[0].replace(/[-_]+/g, ' '); return n.charAt(0).toUpperCase() + n.slice(1); };

async function call(path, {method = 'GET', body, form} = {}) {
  const headers = {Authorization: `Bearer ${tok()}`};
  if (body) headers['Content-Type'] = 'application/json';
  const r = await fetch(API + path, {method, headers, body: form || (body && JSON.stringify(body))});
  const d = await r.json().catch(() => ({}));
  if (r.status === 401) { localStorage.removeItem('adm'); location.reload(); }
  if (!r.ok) throw new Error(d.error || 'Request failed');
  return d;
}

function send(path, file, onP) {
  return new Promise((res, rej) => {
    const x = new XMLHttpRequest(); x.open('POST', API + path); x.setRequestHeader('Authorization', `Bearer ${tok()}`);
    x.upload.onprogress = (e) => e.lengthComputable && onP(Math.round((e.loaded / e.total) * 100));
    x.onload = () => { let d = {}; try { d = JSON.parse(x.responseText); } catch {} if (x.status === 401) { localStorage.removeItem('adm'); location.reload(); } x.status < 300 ? res(d) : rej(new Error(d.error || 'Upload failed')); };
    x.onerror = () => rej(new Error('Network error. Check your connection and try again.'));
    const fd = new FormData(); fd.append('file', file); x.send(fd);
  });
}

// Big screenshots from a computer are shrunk in the browser so they always fit the 5 MB limit
async function shrink(file) {
  if (!/^image\/(png|jpeg|webp)$/.test(file.type) || file.size < 400000) return file;
  try {
    const bmp = await createImageBitmap(file), s = Math.min(1, 1600 / bmp.width);
    const c = document.createElement('canvas'); c.width = Math.round(bmp.width * s); c.height = Math.round(bmp.height * s);
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    const b = await new Promise((r) => c.toBlob(r, 'image/webp', 0.86));
    return b && b.size < file.size ? new File([b], 'cover.webp', {type: 'image/webp'}) : file;
  } catch { return file; }
}

const Field = ({l, hint, children}) => (
  <label className="block space-y-1.5"><span className="text-sm font-medium">{l}</span>{children}
    {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}</label>
);

function Login({ok}) {
  const [pw, setPw] = useState(''), [err, setErr] = useState(''), [busy, setBusy] = useState(false), [show, setShow] = useState(false);
  const go = async (e) => {
    e.preventDefault(); setBusy(true); setErr('');
    try {
      const r = await fetch(API + '/api/admin/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({password: pw})});
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || 'Login failed');
      localStorage.setItem('adm', d.token); ok();
    } catch (x) { setErr(x.message); } finally { setBusy(false); }
  };
  return (
    <form onSubmit={go} className="mx-auto mt-24 max-w-sm space-y-5 rounded-2xl border bg-card p-8 shadow-2xl shadow-black/30">
      <div><h1 className="font-display text-3xl font-bold">Admin</h1><p className="mt-1 text-sm text-muted-foreground">Sign in to manage your projects.</p></div>
      <input type={show ? 'text' : 'password'} autoFocus value={pw} onChange={(e) => setPw(e.target.value)} aria-label="Admin password" placeholder="Password" className={inp} />
      <label className="flex items-center gap-2 text-xs text-muted-foreground"><input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />Show password</label>
      {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
      <Button className="w-full" disabled={busy || !pw}>{busy ? 'Signing in…' : 'Sign in'}</Button>
      <a href="#top" className="block text-center text-xs text-muted-foreground hover:text-foreground">← Back to site</a>
    </form>
  );
}

function Drop({value, link, onFile, busy}) {
  const [over, setOver] = useState(false), ref = useRef();
  const pick = (f) => f && onFile(f);
  useEffect(() => {
    const paste = (e) => { const f = [...(e.clipboardData?.files || [])].find((x) => x.type.startsWith('image/')); if (f) { e.preventDefault(); onFile(f); } };
    addEventListener('paste', paste); return () => removeEventListener('paste', paste);
  }, [onFile]);
  const preview = value || (link ? shot(link) : '');
  return (
    <div className="space-y-2">
      <div onClick={() => ref.current.click()} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
        onDrop={(e) => { e.preventDefault(); setOver(false); pick(e.dataTransfer.files[0]); }}
        className={`group relative grid aspect-[16/10] max-w-md cursor-pointer place-items-center overflow-hidden rounded-xl border-2 border-dashed transition ${over ? 'border-primary bg-primary/10' : 'hover:border-primary/60'}`}>
        {preview && <img src={preview} alt="Cover preview" onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 size-full object-cover object-top" />}
        <div className={`relative z-10 flex flex-col items-center gap-2 rounded-lg px-4 py-3 text-center text-sm ${preview ? 'bg-background/80 opacity-0 backdrop-blur group-hover:opacity-100' : ''}`}>
          <ImagePlus className="size-6 text-primary" />
          <span>{busy != null ? `Uploading… ${busy}%` : 'Drop an image, click to browse, or press Ctrl+V to paste'}</span>
        </div>
        <input ref={ref} type="file" accept="image/png,image/jpeg,image/webp,image/gif" className="sr-only" onChange={(e) => { pick(e.target.files[0]); e.target.value = ''; }} />
      </div>
      <p className="text-xs text-muted-foreground">{value ? 'Uploaded cover image.' : link ? 'No image yet: the site will show an automatic preview of your link. Upload one to override it.' : 'PNG, JPG, WebP or GIF. Large images are shrunk automatically.'}</p>
      {value && <Button type="button" variant="ghost" size="sm" onClick={() => onFile(null)}><X className="size-3.5" />Remove image</Button>}
    </div>
  );
}

function Editor({p, done}) {
  const [f, setF] = useState({...blank, ...p}), [busy, setBusy] = useState(false), [up, setUp] = useState(null), [err, setErr] = useState('');
  const set = (k) => (e) => setF((x) => ({...x, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value}));
  const onUrl = (e) => { const url = e.target.value; setF((x) => ({...x, url, t: x.t || !host(url) ? x.t : pretty(host(url))})); };
  const onFile = useCallback(async (file) => {
    if (!file) return setF((x) => ({...x, img: ''}));
    setErr(''); setUp(0);
    try { const d = await send('/api/admin/upload', await shrink(file), setUp); setF((x) => ({...x, img: d.url})); }
    catch (x) { setErr(x.message); } finally { setUp(null); }
  }, []);
  const onVideo = async (e) => {
    const file = e.target.files[0]; e.target.value = ''; if (!file) return; setErr('');
    if (file.size > 40e6) return setErr('Video is too large (max 40 MB). Export it at 720p or trim it first, for example in CapCut.');
    setUp(0);
    try { const d = await send('/api/admin/upload', file, setUp); setF((x) => ({...x, video: d.url})); }
    catch (x) { setErr(x.message); } finally { setUp(null); }
  };
  const save = async (e) => {
    e.preventDefault(); if (!f.t.trim()) return setErr('Title is required.');
    setBusy(true); setErr('');
    try { const {id, published, ...data} = f; await call(id ? '/api/admin/projects/' + id : '/api/admin/projects', {method: id ? 'PUT' : 'POST', body: {published, data}}); done(true); }
    catch (x) { setErr(x.message); } finally { setBusy(false); }
  };
  return (
    <form onSubmit={save} className="space-y-6">
      <h2 className="font-display text-2xl font-bold">{f.id ? 'Edit project' : 'New project'}</h2>
      <Field l="Live link" hint="Paste the link and the title fills in for you."><input className={inp} value={f.url} onChange={onUrl} placeholder="https://" autoFocus={!f.id} /></Field>
      <Field l="Cover image"><Drop value={f.img} link={f.url} onFile={onFile} busy={up} /></Field>
      <div className="space-y-2"><span className="text-sm font-medium">Video (optional)</span>
        {f.video && <video src={f.video} controls muted playsInline className="aspect-video max-w-md rounded-xl border bg-black" />}
        <div className="flex flex-wrap items-center gap-3"><label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Video className="size-4" />{f.video ? 'Replace video' : 'Upload video'}<input type="file" accept="video/mp4,video/webm" className="sr-only" onChange={onVideo} /></label>
          {f.video && <Button type="button" variant="ghost" size="sm" onClick={() => setF((x) => ({...x, video: ''}))}><X className="size-3.5" />Remove</Button>}</div>
        <p className="text-xs text-muted-foreground">MP4 or WebM, up to 40 MB. Plays when visitors hover the project card and in its details.</p></div>
      <Field l="Title *"><input className={inp} value={f.t} onChange={set('t')} maxLength={100} /></Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field l="Category"><input className={inp} list="cats" value={f.cat} onChange={set('cat')} /><datalist id="cats">{['Web app', 'Website', 'SaaS', 'Mobile app', 'E-commerce', 'Automation', 'AI', 'Experiment'].map((c) => <option key={c} value={c} />)}</datalist></Field>
        <Field l="Year"><input className={inp} value={f.yr} onChange={set('yr')} placeholder="2026" /></Field>
      </div>
      <Field l="Summary"><textarea className={inp} rows={3} maxLength={500} value={f.s} onChange={set('s')} /></Field>
      <Field l="Technologies" hint="Comma separated, e.g. React, Next.js, Cloudflare"><input className={inp} value={f.tech} onChange={set('tech')} /></Field>
      <details className="rounded-xl border p-4"><summary className="cursor-pointer text-sm font-medium">More options (source code, role, note)</summary>
        <div className="mt-4 space-y-4">
          <Field l="Source code link"><input className={inp} value={f.repo} onChange={set('repo')} placeholder="https://github.com/..." /></Field>
          <Field l="My role"><input className={inp} value={f.role} onChange={set('role')} /></Field>
          <Field l="Status note" hint="e.g. In development, Client work"><input className={inp} value={f.note} onChange={set('note')} /></Field>
        </div></details>
      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.f} onChange={set('f')} />Featured (large card)</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!f.published} onChange={set('published')} />Published (visible on the site)</label>
      </div>
      {err && <p role="alert" className="text-sm text-red-400">{err}</p>}
      <div className="sticky bottom-4 flex gap-3 rounded-xl border bg-card/90 p-3 backdrop-blur">
        <Button disabled={busy || up !== null}>{busy ? 'Saving…' : 'Save project'}</Button>
        <Button type="button" variant="outline" onClick={() => done(false)}>Cancel</Button>
      </div>
    </form>
  );
}

function Dash({out}) {
  const [items, setItems] = useState(null), [ed, setEd] = useState(null), [msg, setMsg] = useState(''), [cv, setCv] = useState(null);
  const flash = (m) => { setMsg(m); setTimeout(() => setMsg(''), 4000); };
  const load = useCallback(() => call('/api/admin/projects').then(setItems).catch((e) => { setItems([]); setMsg(e.message); }), []);
  const cvCheck = () => fetch(API + '/cv', {method: 'HEAD'}).then((r) => setCv(r.ok)).catch(() => setCv(false));
  useEffect(() => { load(); cvCheck(); }, [load]);
  const del = async (p) => { if (!confirm(`Delete "${p.t}"? This cannot be undone.`)) return; try { await call('/api/admin/projects/' + p.id, {method: 'DELETE'}); flash('Deleted.'); load(); } catch (e) { flash(e.message); } };
  const move = async (i, d) => { const a = [...items], j = i + d; if (j < 0 || j >= a.length) return; [a[i], a[j]] = [a[j], a[i]]; setItems(a); try { await call('/api/admin/reorder', {method: 'POST', body: {ids: a.map((x) => x.id)}}); } catch (e) { flash(e.message); load(); } };
  const toggle = async (p) => { const {id, published, ...data} = p; try { await call('/api/admin/projects/' + id, {method: 'PUT', body: {published: !published, data}}); load(); } catch (e) { flash(e.message); } };
  const imp = async () => { if (!confirm('Import the starter projects from data.js? Do this only once.')) return; try { for (const p of seed) await call('/api/admin/projects', {method: 'POST', body: {published: true, data: {...p, f: !!p.f}}}); flash('Imported.'); load(); } catch (e) { flash(e.message); } };
  const upCv = async (e) => { const file = e.target.files[0]; if (!file) return; const fd = new FormData(); fd.append('file', file); try { await call('/api/admin/cv', {method: 'POST', form: fd}); flash('CV uploaded.'); cvCheck(); } catch (x) { flash(x.message); } e.target.value = ''; };
  const rmCv = async () => { if (!confirm('Remove the current CV?')) return; try { await call('/api/admin/cv', {method: 'DELETE'}); flash('CV removed.'); cvCheck(); } catch (e) { flash(e.message); } };
  if (ed) return <Editor p={ed} done={(s) => { setEd(null); if (s) { flash('Saved.'); load(); } }} />;
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <div className="flex gap-2"><Button variant="outline" size="sm" asChild><a href="#top"><ExternalLink className="size-3.5" />View site</a></Button><Button variant="outline" size="sm" onClick={out}><LogOut className="size-3.5" />Sign out</Button></div>
      </div>
      {msg && <p role="status" className="rounded-lg border bg-card px-4 py-2 text-sm">{msg}</p>}
      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="font-display text-xl font-semibold">Projects</h2><Button size="sm" onClick={() => setEd({})}><Plus className="size-4" />New project</Button></div>
        {items === null ? <p className="text-sm text-muted-foreground">Loading…</p> : items.length === 0 ? (
          <div className="rounded-xl border p-6 text-sm"><p className="mb-3 text-muted-foreground">No projects in the database yet. Until you add some, the site shows the starter list from data.js.</p><Button size="sm" variant="outline" onClick={imp}>Import starter projects</Button></div>
        ) : (
          <ul className="space-y-2">{items.map((p, i) => (
            <li key={p.id} className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-3">
              <div className="h-12 w-20 shrink-0 overflow-hidden rounded-md border bg-muted">{(p.img || p.url) && <img src={p.img || shot(p.url)} alt="" loading="lazy" onError={(e) => e.currentTarget.remove()} className="size-full object-cover object-top" />}</div>
              <span className="min-w-0 flex-1"><span className="flex items-center gap-2 font-medium">{p.t}{!!p.f && <Star className="size-3.5 text-primary" />}</span><span className="block truncate text-xs text-muted-foreground">{p.cat}{p.yr && ` · ${p.yr}`}{p.url && ` · ${host(p.url)}`}</span></span>
              <button onClick={() => toggle(p)} aria-label={p.published ? 'Unpublish' : 'Publish'}><Badge variant={p.published ? 'default' : 'secondary'}>{p.published ? 'Published' : 'Draft'}</Badge></button>
              <Button size="sm" variant="ghost" aria-label="Move up" onClick={() => move(i, -1)}><ArrowUp className="size-4" /></Button>
              <Button size="sm" variant="ghost" aria-label="Move down" onClick={() => move(i, 1)}><ArrowDown className="size-4" /></Button>
              <Button size="sm" variant="outline" onClick={() => setEd(p)}><Pencil className="size-3.5" />Edit</Button>
              <Button size="sm" variant="ghost" aria-label={`Delete ${p.t}`} onClick={() => del(p)}><Trash2 className="size-4 text-red-400" /></Button>
            </li>))}</ul>
        )}
      </section>
      <section>
        <h2 className="mb-4 font-display text-xl font-semibold">CV</h2>
        <div className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4">
          <span className="flex-1 text-sm">{cv === null ? 'Checking…' : cv ? 'A CV is uploaded and shown on the site.' : 'No CV uploaded yet. The site shows "Request my CV".'}</span>
          {cv && <Button size="sm" variant="outline" asChild><a href={API + '/cv'} target="_blank" rel="noopener noreferrer">View current</a></Button>}
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-accent"><Upload className="size-4" />{cv ? 'Replace PDF' : 'Upload PDF'}<input type="file" accept="application/pdf" className="sr-only" onChange={upCv} /></label>
          {cv && <Button size="sm" variant="ghost" onClick={rmCv}>Remove</Button>}
        </div>
      </section>
    </div>
  );
}

export default function Admin() {
  const [ok, setOk] = useState(!!tok());
  return (
    <div className="min-h-screen bg-background text-foreground"><div className="mx-auto max-w-4xl p-6">
      {!API ? <p className="mt-24 text-center">Set <code>VITE_API_URL</code> to your Cloudflare Worker URL to use the admin.</p>
        : ok ? <Dash out={() => { localStorage.removeItem('adm'); setOk(false); }} /> : <Login ok={() => setOk(true)} />}
    </div></div>
  );
}
