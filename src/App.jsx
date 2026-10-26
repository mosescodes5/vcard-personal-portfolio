import {useEffect,useState} from 'react';
import {AnimatePresence,MotionConfig,motion} from 'framer-motion';
import {ArrowUpRight,Download,Mail,MessageCircle,Plus,Sparkles} from 'lucide-react';
import {profile as P,skills,projects,experience,services} from './data.js';
import {Button} from '@/components/ui/button';
import {Reveal,Line,Logo,useActive} from '@/components/Motion';
import ProjectDialog from '@/components/ProjectDialog';import Assistant from '@/components/Assistant';import Palette from '@/components/Palette';
const wa=`https://wa.me/${P.whatsapp}?text=${encodeURIComponent(P.waText)}`,ext={target:'_blank',rel:'noopener noreferrer'};
const NAV=[['work','Work'],['stack','Stack'],['about','About'],['services','Services'],['contact','Contact']],ids=NAV.map(n=>n[0]);
const Mono=({children,className=''})=><span className={`font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground ${className}`}>{children}</span>;
function Clock(){const f=()=>new Intl.DateTimeFormat('en-GB',{hour:'2-digit',minute:'2-digit',timeZone:'Africa/Lagos'}).format(new Date()),[t,setT]=useState(f);
 useEffect(()=>{const i=setInterval(()=>setT(f()),20000);return()=>clearInterval(i)},[]);return <>{t} WAT</>}
function Cv(){const[ok,set]=useState(false);
 useEffect(()=>{fetch(P.cv,{method:'HEAD'}).then(r=>set(r.ok&&!/html/.test(r.headers.get('content-type')||''))).catch(()=>set(false))},[]);
 return ok?<Button variant="outline" size="lg" asChild><a href={P.cv} download><Download className="size-4"/>Download CV</a></Button>:<Button variant="outline" size="lg" asChild><a href="#contact" title="CV not uploaded yet">Request my CV</a></Button>}
const Sec=({id,n,title,children})=><section id={id} className="border-t py-20"><Reveal><div className="mb-10 flex items-baseline gap-4"><Mono className="text-primary">{n}</Mono><h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2></div>{children}</Reveal></section>;
function Work(){const cats=['All',...new Set(projects.map(p=>p.cat))],[c,setC]=useState('All'),[open,setOpen]=useState(null),list=[...projects].sort((a,b)=>(b.f||0)-(a.f||0)).filter(p=>c==='All'||p.cat===c);
 return <><div className="mb-6 flex flex-wrap gap-x-5 gap-y-2" role="group" aria-label="Filter projects">{cats.map(k=><button key={k} aria-pressed={k===c} onClick={()=>setC(k)} className={`font-mono text-xs uppercase tracking-widest ${k===c?'text-primary underline underline-offset-8':'text-muted-foreground hover:text-foreground'}`}>{k}</button>)}</div>
 <ul className="border-t">{list.map((p,i)=>{const o=open===p.t;return <li key={p.t} className="border-b">
  <button aria-expanded={o} onClick={()=>setOpen(o?null:p.t)} className="group flex w-full items-baseline gap-4 py-5 text-left"><Mono className="w-6">{String(i+1).padStart(2,'0')}</Mono>
   <span className="flex-1 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-primary md:text-3xl">{p.t}</span><Mono className="hidden sm:inline">{p.cat}</Mono><Mono>{p.yr||''}</Mono><Plus className={`size-4 shrink-0 transition-transform ${o?'rotate-45 text-primary':''}`}/></button>
  <AnimatePresence initial={false}>{o&&<motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.4,ease:[.2,.7,.1,1]}} className="overflow-hidden"><div className="grid gap-6 pb-8 md:grid-cols-2 md:pl-10">
   {p.img&&<img src={p.img} alt={`${p.t} screenshot`} loading="lazy" onError={e=>e.currentTarget.remove()} className="aspect-[16/10] w-full rounded-md border object-cover object-top"/>}
   <div className="space-y-3 text-sm"><p className="text-muted-foreground">{p.s||'More details coming soon.'}</p>{p.role&&<p><Mono>Role</Mono><br/>{p.role}</p>}{p.tech&&<p><Mono>Tech</Mono><br/>{p.tech}</p>}{p.note&&<p><Mono>Status</Mono><br/>{p.note}</p>}
    {p.url&&<Button variant="outline" size="sm" asChild><a href={p.url} {...ext}>Visit site <ArrowUpRight className="size-3.5"/></a></Button>}</div></div></motion.div>}</AnimatePresence></li>})}</ul></>}
function Stack(){const main=skills[0][1].split(', ');return <>
 <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-3">{main.map((n,i)=><motion.li key={n} initial={{opacity:0,y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05,duration:.5}} className="flex items-center gap-3 bg-background p-5"><Logo n={n} className="size-6"/><span className="font-medium">{n}</span></motion.li>)}</ul>
 <dl className="mt-8 grid gap-6 sm:grid-cols-3">{skills.slice(1).map(([k,v])=><div key={k}><dt><Mono>{k}</Mono></dt><dd className="mt-2 text-sm">{v}</dd></div>)}</dl></>}
export default function App(){const[proj,setProj]=useState(null),[ai,setAi]=useState(false),[pal,setPal]=useState(false),a=useActive(ids);
 return <MotionConfig reducedMotion="user">
 <nav aria-label="Mobile" className="sticky top-0 z-20 flex gap-5 overflow-x-auto border-b bg-background/85 px-6 py-3 backdrop-blur lg:hidden">{NAV.map(([i,l])=><a key={i} href={`#${i}`} className="whitespace-nowrap font-mono text-xs uppercase tracking-widest text-muted-foreground">{l}</a>)}</nav>
 <div className="lg:flex">
 <aside className="flex flex-col gap-8 border-b p-6 lg:sticky lg:top-0 lg:h-screen lg:w-[300px] lg:shrink-0 lg:justify-between lg:border-b-0 lg:border-r lg:p-8">
  <div className="flex items-center gap-4 lg:block">
   <img src="/assets/images/moses-primary.jpg" alt="Portrait of Moses Kouakanou" width="800" height="1066" className="aspect-[4/5] w-24 rounded-md object-cover object-[50%_20%] lg:w-full"/>
   <div className="lg:mt-5"><p className="font-display text-2xl font-semibold tracking-tight">{P.name}</p><Mono>{P.role}</Mono>
    <p className="mt-3 flex items-center gap-2 font-mono text-xs text-muted-foreground">{P.available&&<span className="size-2 rounded-full bg-green-600"/>}<Clock/> · {P.location}</p></div></div>
  <nav className="hidden lg:block" aria-label="Primary"><ol className="space-y-3">{NAV.map(([i,l])=><li key={i}><a href={`#${i}`} className={`flex items-center gap-3 font-mono text-xs uppercase tracking-widest transition-colors ${a===i?'text-foreground':'text-muted-foreground hover:text-foreground'}`}><span className={`h-px transition-all duration-500 ${a===i?'w-8 bg-primary':'w-3 bg-border'}`}/>{l}</a></li>)}</ol></nav>
  <div className="space-y-4"><div className="flex flex-wrap gap-2"><Button size="sm" asChild><a href={wa} {...ext}><MessageCircle className="size-3.5"/>WhatsApp</a></Button><Button size="sm" variant="outline" onClick={()=>setAi(true)}><Sparkles className="size-3.5"/>Ask my AI</Button><Button size="sm" variant="outline" onClick={()=>setPal(true)} aria-label="Open command palette" className="hidden lg:inline-flex">Ctrl K</Button></div>
   <p className="flex gap-4">{P.links.map(([n,u])=><a key={n} href={u} {...ext} className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-foreground">{n}</a>)}</p></div></aside>
 <main id="top" className="min-w-0 flex-1 px-6 lg:px-16"><div className="mx-auto max-w-3xl">
  <div className="pb-20 pt-14 lg:pt-28"><motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.1}}><Mono className="text-primary">Software engineer · Lagos</Mono></motion.div>
   <h1 aria-label="I build software that turns ideas into reality." className="mt-6 font-display text-[clamp(2.8rem,8vw,6rem)] font-semibold leading-[0.95] tracking-[-0.04em]"><Line>I build software</Line><Line delay={.12}>that turns ideas</Line><Line delay={.24}><span className="text-primary">into reality.</span></Line></h1>
   <motion.p initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:.9}} className="mt-8 max-w-xl text-lg text-muted-foreground">I’m Moses, a software engineer building web applications and APIs with TypeScript, React, Next.js, Vue, Angular and PHP.</motion.p>
   <motion.div initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:1.05}} className="mt-8 flex flex-wrap gap-3"><Button size="lg" asChild><a href="#work">View my work</a></Button><Cv/><Button size="lg" variant="ghost" asChild><a href="#contact">Get in touch</a></Button></motion.div>
   <motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.3}} className="mt-14 max-w-md border-l-2 border-primary pl-4 text-sm"><Mono>Now</Mono><br/>Building Ryzel, a Next.js platform on Cloudflare Workers.</motion.p></div>
  <Sec id="work" n="01" title="Selected work"><Work/></Sec>
  <Sec id="stack" n="02" title="Stack"><Stack/></Sec>
  <Sec id="about" n="03" title="About"><div className="grid gap-8 md:grid-cols-[180px_1fr]"><img src="/assets/images/moses-alt.jpg" alt="Moses Kouakanou" loading="lazy" className="aspect-[4/5] w-full max-w-[180px] rounded-md object-cover object-[50%_20%]"/>
   <p className="text-lg text-muted-foreground">I’m a detail-oriented developer who cares about fast, reliable, user-focused products. I work across modern front-end frameworks with PHP and SQL back ends, and I’m studying Computer Science while exploring AI integrations and workflow automation.</p></div>
   <ol className="mt-10 border-t">{experience.map(([d,t,o,x])=><li key={t} className="grid gap-1 border-b py-5 sm:grid-cols-[150px_1fr] sm:gap-6"><Mono>{d}</Mono><div><h3 className="font-medium">{t}</h3><p className="text-sm text-muted-foreground">{o}</p><p className="mt-1 text-sm">{x}</p></div></li>)}</ol></Sec>
  <Sec id="services" n="04" title="Services"><ul className="grid gap-px overflow-hidden rounded-md border bg-border sm:grid-cols-2">{services.map(([t,d],i)=><li key={t} className="bg-background p-6"><Mono className="text-primary">{String(i+1).padStart(2,'0')}</Mono><h3 className="mt-3 font-display text-xl font-medium">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></li>)}</ul></Sec>
  <Sec id="contact" n="05" title="Contact"><p className="font-display text-4xl font-semibold leading-tight tracking-tight md:text-6xl">Have a project in mind? <span className="text-primary">Let’s talk.</span></p>
   <div className="mt-8 flex flex-wrap gap-3"><Button size="lg" asChild><a href={wa} {...ext}><MessageCircle className="size-4"/>Message on WhatsApp</a></Button><Button size="lg" variant="outline" asChild><a href={`mailto:${P.email}`}><Mail className="size-4"/>{P.email}</a></Button></div></Sec>
  <footer className="border-t py-8"><Mono>© {new Date().getFullYear()} {P.name}</Mono></footer></div></main></div>
 <ProjectDialog p={proj} onClose={()=>setProj(null)}/><Assistant open={ai} setOpen={setAi}/><Palette open={pal} setOpen={setPal} onAi={()=>setAi(true)} onProject={setProj}/></MotionConfig>}
