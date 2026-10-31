import {useEffect,useRef,useState} from 'react';import {Send,RotateCcw} from 'lucide-react';import {Dialog,DialogContent,DialogTitle} from '@/components/ui/dialog';import {Button} from '@/components/ui/button';
const API=import.meta.env.VITE_API_URL||'';
const Q=['What has Moses built with WordPress?','What technologies does Moses use?','Can Moses build a website for my business?','How can I contact Moses?'];
export default function Assistant({open,setOpen}){const[m,setM]=useState([]),[t,setT]=useState(''),[busy,setBusy]=useState(false),[on,setOn]=useState(null),end=useRef();
 useEffect(()=>{if(open)fetch(API+'/api/chat').then(r=>r.json()).then(d=>setOn(!!d.online)).catch(()=>setOn(false))},[open]);
 useEffect(()=>{end.current?.scrollIntoView({block:'end'})},[m]);
 async function send(text){text=text.trim();if(!text||busy)return;const h=[...m,{role:'user',content:text}];setM([...h,{role:'assistant',content:'',sources:[]}]);setT('');setBusy(true);
  const set=(c,s)=>setM(x=>[...x.slice(0,-1),{role:'assistant',content:c,sources:s}]);
  try{const r=await fetch(API+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:h.slice(-8).map(({role,content})=>({role,content}))})});
   if(!r.ok){const d=await r.json().catch(()=>({}));set(d.error||'The assistant is unavailable right now. You can still contact Moses directly.',[]);return}
   let src=[];try{src=JSON.parse(decodeURIComponent(r.headers.get('X-Sources')||'[]'))}catch{}
   const rd=r.body.getReader(),dec=new TextDecoder();let a='';for(;;){const{done,value}=await rd.read();if(done)break;a+=dec.decode(value,{stream:true});set(a,src)}
   if(!a)set('No answer came back. Please try again.',[])}catch{set('Could not reach the assistant. You can still contact Moses directly.',[])}finally{setBusy(false)}}
 return <Dialog open={open} onOpenChange={setOpen}><DialogContent className="flex h-[min(640px,85vh)] max-w-xl flex-col">
  <DialogTitle className="text-lg font-semibold">Ask my AI</DialogTitle>
  <p className="text-xs text-muted-foreground"><span className={`mr-1.5 inline-block size-2 rounded-full ${on?'bg-green-600':'bg-muted-foreground'}`}/>{on===null?'Checking…':on?'Online. Answers come only from this portfolio’s content.':'Offline right now'}</p>
  <div className="mt-3 flex-1 space-y-3 overflow-auto pr-1" aria-live="polite">
   {!m.length&&<div className="flex flex-wrap gap-2">{Q.map(x=><Button key={x} size="sm" variant="outline" onClick={()=>send(x)}>{x}</Button>)}</div>}
   {m.map((x,n)=><div key={n} className={x.role==='user'?'ml-8 rounded-lg bg-primary px-3 py-2 text-sm text-primary-foreground':'mr-8 rounded-lg bg-muted px-3 py-2 text-sm'}>
    <p className="whitespace-pre-wrap">{x.content||(busy&&n===m.length-1?'Thinking…':'')}</p>
    {x.sources?.length>0&&<p className="mt-2 text-xs text-muted-foreground">Sources: {x.sources.map((s,k)=>s.url?<a key={k} className="underline" href={s.url} target="_blank" rel="noopener noreferrer">{s.title}{' '}</a>:<span key={k}>{s.title} </span>)}</p>}</div>)}<div ref={end}/></div>
  <form className="mt-3 flex gap-2" onSubmit={e=>{e.preventDefault();send(t)}}>
   <input value={t} onChange={e=>setT(e.target.value)} maxLength={500} placeholder="Ask about Moses’s work…" aria-label="Your question" className="h-10 flex-1 rounded-md border bg-card px-3 text-sm"/>
   <Button type="submit" disabled={busy||!t.trim()} aria-label="Send"><Send className="size-4"/></Button>
   <Button type="button" variant="outline" aria-label="Reset conversation" onClick={()=>setM([])}><RotateCcw className="size-4"/></Button></form></DialogContent></Dialog>}
