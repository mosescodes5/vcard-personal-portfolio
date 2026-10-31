import {useEffect,useMemo,useState} from 'react';import {Dialog,DialogContent,DialogTitle} from '@/components/ui/dialog';import {projects,profile as P} from '@/data.js';
export default function Palette({open,setOpen,onAi,onProject,list}){const[q,setQ]=useState(''),[i,setI]=useState(0);
 useEffect(()=>{const k=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setOpen(o=>!o)}};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[setOpen]);
 const go=h=>()=>{location.hash=h};
 const all=useMemo(()=>[['Go to projects',go('work')],['About me',go('about')],['Services',go('services')],['Contact Moses',go('contact')],['Ask my AI',onAi],['Open CV',()=>window.open(import.meta.env.VITE_API_URL?import.meta.env.VITE_API_URL+'/cv':P.cv,'_blank')],...(list||projects).map(p=>[`Project: ${p.t}`,()=>onProject(p)])],[onAi,onProject,list]);
 const L=all.filter(([t])=>t.toLowerCase().includes(q.toLowerCase())),run=n=>{const a=L[n];if(a){setOpen(false);setQ('');setTimeout(a[1],50)}};
 return <Dialog open={open} onOpenChange={o=>{setOpen(o);if(!o)setQ('')}}><DialogContent className="sm:top-[30%] sm:max-w-lg p-0">
  <DialogTitle className="sr-only">Command palette</DialogTitle>
  <input autoFocus value={q} onChange={e=>{setQ(e.target.value);setI(0)}} placeholder="Type a command or search…" aria-label="Search commands" className="w-full rounded-t-lg border-b bg-transparent px-4 py-3 text-sm outline-none"
   onKeyDown={e=>{if(e.key==='ArrowDown'){e.preventDefault();setI(x=>Math.min(x+1,L.length-1))}else if(e.key==='ArrowUp'){e.preventDefault();setI(x=>Math.max(x-1,0))}else if(e.key==='Enter')run(i)}}/>
  <ul role="listbox" className="max-h-72 overflow-auto p-2">{L.length?L.map(([t],n)=><li key={t} role="option" aria-selected={n===i}><button type="button" onMouseEnter={()=>setI(n)} onClick={()=>run(n)} className={`w-full rounded-md px-3 py-2 text-left text-sm ${n===i?'bg-accent':''}`}>{t}</button></li>):<li className="p-3 text-sm text-muted-foreground">No results.</li>}</ul></DialogContent></Dialog>}
