import {ArrowUpRight} from 'lucide-react';import {Dialog,DialogContent,DialogTitle} from '@/components/ui/dialog';import {Badge} from '@/components/ui/badge';import {Button} from '@/components/ui/button';
const F=({k,v})=>v?<div className="mt-4"><dt className="text-xs text-muted-foreground">{k}</dt><dd>{v}</dd></div>:null;
export default function ProjectDialog({p,onClose}){return <Dialog open={!!p} onOpenChange={o=>!o&&onClose()}>{p&&<DialogContent>
 <div className="mb-2 flex gap-2"><Badge>{p.cat}</Badge>{p.yr&&<Badge variant="outline">{p.yr}</Badge>}</div>
 <DialogTitle className="text-2xl font-semibold tracking-tight">{p.t}</DialogTitle>
 {p.img&&<img src={p.img} alt={`${p.t} screenshot`} className="mt-4 rounded-md border"/>}
 {p.video&&<video src={p.video} controls playsInline preload="metadata" poster={p.img||undefined} className="mt-4 w-full rounded-md border bg-black"/>}
 <dl><F k="Summary" v={p.s}/><F k="My role" v={p.role}/><F k="Technologies" v={p.tech}/><F k="Status" v={p.note}/></dl>
 {!p.s&&!p.tech&&<p className="mt-4 text-sm text-muted-foreground">More details about this project haven’t been added yet.</p>}
 {p.url&&<Button className="mt-6" asChild><a href={p.url} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight className="size-4"/></a></Button>}</DialogContent>}</Dialog>}
