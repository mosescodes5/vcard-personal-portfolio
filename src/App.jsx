import {useEffect,useState} from 'react';
import {ArrowUpRight,Download,Mail,MessageCircle,Sparkles,ChevronRight,Home,Briefcase,User,MapPin} from 'lucide-react';
import {motion,MotionConfig} from 'framer-motion';import {Reveal,Tilt,Magnetic,Counter,Orbs,Marquee,ScrollBar,Logo} from '@/components/Motion';
import ProjectDialog from '@/components/ProjectDialog';import Assistant from '@/components/Assistant';import Palette from '@/components/Palette';
import {profile as P,skills,projects,experience,services} from './data.js';
import {Button} from '@/components/ui/button';import {Badge} from '@/components/ui/badge';
import {Card,CardContent,CardDescription,CardHeader,CardTitle} from '@/components/ui/card';
const wa=`https://wa.me/${P.whatsapp}?text=${encodeURIComponent(P.waText)}`;
const ext={target:'_blank',rel:'noopener noreferrer'};
const W=['I','build','software','that','turns','ideas','into','reality.'],techs=skills.flatMap(([,v])=>v.split(', ')),stats=[[projects.length,'Projects'],[projects.filter(p=>p.url).length,'Live sites'],[techs.length,'Technologies']];
const CH=[['TypeScript','-left-6 top-6 md:-left-14'],['React','-right-4 top-12 md:-right-12'],['Vue.js','-left-2 top-[30%] md:-left-16'],['Angular','-right-2 top-[44%] md:-right-14'],['Next.js','-left-6 top-[52%] md:-left-12'],['PHP','-right-6 top-[62%] md:-right-10'],['SQL','-left-3 bottom-8 md:-left-8'],['Cloudflare','-right-4 -bottom-3 md:-right-10']];
const Chip=({className,delay,children})=><motion.div className={`absolute z-10 flex items-center gap-2 rounded-2xl border bg-background/70 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur-xl ${className}`} animate={{y:[0,-8,0]}} transition={{duration:5,delay,repeat:Infinity,ease:'easeInOut'}}>{children}</motion.div>;
const Sec=({id,n,title,children})=><section id={id} className="border-t py-24"><Reveal className="mx-auto max-w-5xl px-6">
 <h2 className="mb-10 flex items-baseline gap-3 text-3xl font-bold tracking-tight">{title}</h2>{children}</Reveal></section>;
function Cv(){const[ok,set]=useState(false);
 useEffect(()=>{fetch(P.cv,{method:'HEAD'}).then(r=>set(r.ok&&!/html/.test(r.headers.get('content-type')||''))).catch(()=>set(false))},[]);
 return ok?<Button variant="outline" size="lg" asChild><a href={P.cv} download><Download className="size-4"/>Download CV</a></Button>
  :<Button variant="outline" size="lg" asChild><a href="#contact" title="CV not uploaded yet">Request my CV</a></Button>}
function Work({onOpen}){const cats=['All',...new Set(projects.map(p=>p.cat))],[c,setC]=useState('All');
 const feat=projects.filter(p=>p.f&&c==='All'),rest=projects.filter(p=>c==='All'?!p.f:p.cat===c);
 return <>
 <div className="mb-8 inline-flex flex-wrap gap-1 rounded-full bg-secondary p-1" role="group" aria-label="Filter projects">{cats.map(k=>
  <Button key={k} size="sm" variant="ghost" className={k===c?'bg-card text-foreground shadow-sm hover:bg-card':'text-muted-foreground'} aria-pressed={k===c} onClick={()=>setC(k)}>{k}</Button>)}</div>
 <div className="grid gap-6">{feat.map(p=><Tilt key={p.t}><Card className="group grid overflow-hidden transition-shadow hover:shadow-xl md:grid-cols-5">
  <div className="grid aspect-[16/10] place-items-center overflow-hidden border-b bg-muted p-4 text-center text-sm font-medium text-muted-foreground md:col-span-3 md:border-b-0 md:border-r">
   {p.img?<img src={p.img} alt={`${p.t} screenshot`} loading="lazy" className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"/>:p.t}</div>
  <div className="flex flex-col justify-center md:col-span-2">
   <CardHeader><div className="flex gap-2"><Badge>{p.cat}</Badge><Badge variant="outline">{p.yr}</Badge></div><CardTitle className="pt-2 text-2xl font-semibold tracking-tight"><button type="button" className="text-left hover:text-primary" onClick={()=>onOpen(p)}>{p.t}</button></CardTitle><CardDescription>{p.s}</CardDescription></CardHeader>
   <CardContent><p className="mb-4 text-xs text-muted-foreground">{p.tech}</p>
    {p.url?<Button variant="link" className="h-auto p-0" asChild><a href={p.url} {...ext}>Visit site <ArrowUpRight className="size-4"/></a></Button>:<p className="text-sm text-muted-foreground">{p.note}</p>}</CardContent></div></Card></Tilt>)}</div>
 <ul className="mt-6 divide-y overflow-hidden rounded-[1.25rem] bg-card">{rest.map(p=><motion.li key={p.t} initial={{opacity:0,x:-16}} whileInView={{opacity:1,x:0}} viewport={{once:true,margin:'-40px'}} transition={{type:'spring',stiffness:120,damping:20}}>{p.url
  ?<button type="button" onClick={()=>onOpen(p)} className="group flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-accent/50">
    {p.img&&<img src={p.img} alt="" loading="lazy" onError={e=>e.currentTarget.remove()} className="h-11 w-[72px] rounded-md border object-cover object-top"/>}
    <span className="flex-1 font-medium group-hover:text-primary">{p.t}</span><Badge variant="secondary">{p.cat}</Badge><ChevronRight className="size-5 text-muted-foreground/60"/></button>
  :<div className="flex items-center gap-4 px-4 py-3"><span className="flex-1 font-medium">{p.t}</span><span className="text-sm text-muted-foreground">{p.note}</span><Badge variant="secondary">{p.cat}</Badge></div>}</motion.li>)}</ul></>}
export default function App(){const[proj,setProj]=useState(null),[ai,setAi]=useState(false),[pal,setPal]=useState(false);return <MotionConfig reducedMotion="user"><ScrollBar/>
 <header className="sticky top-0 z-10 border-b bg-background/70 backdrop-blur-xl backdrop-saturate-150"><div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
  <a href="#top" className="font-semibold tracking-tight">{P.handle}</a>
  <nav aria-label="Primary" className="hidden gap-1 md:flex">{[['Work','work'],['About','about'],['Services','services'],['Contact','contact']].map(([l,h])=><Button key={h} variant="ghost" size="sm" className="rounded-md text-muted-foreground" asChild><a href={`#${h}`}>{l}</a></Button>)}</nav><Button variant="outline" size="sm" className="hidden md:inline-flex" onClick={()=>setPal(true)} aria-label="Open command palette">Ctrl K</Button></div></header>
 <main id="top">
 <div className="relative overflow-hidden"><Orbs/>
 <div className="relative mx-auto grid max-w-5xl items-center gap-10 px-6 pb-16 pt-12 md:grid-cols-[1fr_320px] md:gap-16 md:pt-24">
  <div><motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mb-5 flex min-h-5 items-center gap-2 text-sm text-muted-foreground">{P.available&&<><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500/70"/><span className="relative size-2 rounded-full bg-green-600"/></span>Available for new projects</>}</motion.p>
   <h1 aria-label="I build software that turns ideas into reality." className="mb-6 max-w-[14ch] text-5xl font-bold leading-[1.05] tracking-[-0.035em] md:text-7xl">{W.map((w,i)=><motion.span key={i} aria-hidden className={`mr-[0.25em] inline-block ${i>4?'text-primary':''}`} initial={{opacity:0,y:28,filter:'blur(8px)'}} animate={{opacity:1,y:0,filter:'blur(0px)'}} transition={{type:'spring',stiffness:90,damping:18,delay:.1+i*.07}}>{w}</motion.span>)}</h1>
   <motion.p initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.7}} className="mb-8 max-w-prose text-lg text-muted-foreground">I’m Moses, a software engineer building web applications and APIs with TypeScript, React, Next.js, Vue, Angular and PHP. Based in {P.location}.</motion.p>
   <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:.85}} className="flex flex-wrap gap-3">
    <Magnetic><Button size="lg" asChild><a href="#work">View my work</a></Button></Magnetic><Magnetic><Cv/></Magnetic>
    <Magnetic><Button size="lg" variant="ghost" onClick={()=>setAi(true)}><Sparkles className="size-4"/>Ask my AI</Button></Magnetic>
    <Magnetic><Button size="lg" variant="ghost" asChild><a href="#contact">Get in touch</a></Button></Magnetic></motion.div></div>
  <motion.div initial={{opacity:0,scale:.9,y:20}} animate={{opacity:1,scale:1,y:0}} transition={{type:'spring',stiffness:70,damping:16,delay:.3}} className="relative mx-auto w-full max-w-[300px]">
   <Tilt max={9}><img src="/assets/images/moses-primary.jpg" alt="Portrait of Moses Kouakanou" width="800" height="1066" className="aspect-[3/4] w-full rounded-[2rem] object-cover object-[50%_20%] shadow-xl"/></Tilt>
   {CH.map(([n,pos],i)=><Chip key={n} className={pos} delay={i*.45}><Logo n={n} className="size-4"/>{n}</Chip>)}</motion.div></div>
 <Reveal className="relative mx-auto grid max-w-5xl grid-cols-3 gap-3 px-6 pb-8">{stats.map(([n,l])=><Card key={l} className="p-5 text-center"><div className="text-3xl font-bold tracking-tight md:text-4xl"><Counter to={n}/></div><div className="text-xs text-muted-foreground">{l}</div></Card>)}</Reveal>
 <div className="relative"><Marquee items={techs}/></div></div>
 <Sec id="work" n="01" title="Selected work"><Work onOpen={setProj}/></Sec>
 <Sec id="about" n="02" title="About"><div className="grid gap-14 md:grid-cols-2"><div>
  <p className="text-lg text-muted-foreground">I’m a detail-oriented developer who cares about fast, reliable, user-focused products. I work across modern front-end frameworks with PHP and SQL back ends, and I’m studying Computer Science while exploring AI integrations and workflow automation.</p>
  <dl className="mt-8 grid gap-5">{skills.map(([k,v])=><div key={k}><dt className="mb-2 text-xs text-muted-foreground">{k}</dt><dd className="flex flex-wrap gap-1.5">{v.split(', ').map(s=><motion.span key={s} whileHover={{y:-3,scale:1.08}} whileTap={{scale:.95}} transition={{type:'spring',stiffness:400,damping:15}}><Badge variant="outline">{s}</Badge></motion.span>)}</dd></div>)}</dl></div>
  <ol className="grid gap-7">{experience.map(([d,t,o,x])=><motion.li key={t} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="border-l-2 border-primary/30 pl-5"><small className="font-medium text-primary">{d}</small><h3 className="font-semibold">{t}</h3><p className="text-sm text-muted-foreground">{o}</p><p className="mt-1.5 text-muted-foreground">{x}</p></motion.li>)}</ol></div></Sec>
 <Sec id="services" n="03" title="Services"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{services.map(([t,d])=><Tilt key={t}><Card><CardHeader><CardTitle className="text-base">{t}</CardTitle><CardDescription>{d}</CardDescription></CardHeader></Card></Tilt>)}</div></Sec>
 <Sec id="contact" n="04" title="Contact"><p className="max-w-prose text-lg text-muted-foreground">Have a project in mind? The quickest way to reach me is WhatsApp or email.</p>
  <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" asChild><a href={wa} {...ext}><MessageCircle className="size-4"/>Message on WhatsApp</a></Button><Button size="lg" variant="outline" asChild><a href={`mailto:${P.email}`}><Mail className="size-4"/>{P.email}</a></Button></div>
  <p className="mt-8 flex gap-5 text-sm">{P.links.map(([n,u])=><a key={n} href={u} {...ext} className="text-muted-foreground hover:text-foreground">{n}</a>)}</p></Sec>
 </main>
 <footer className="border-t py-7 pb-28 md:pb-7 text-sm text-muted-foreground"><div className="mx-auto max-w-5xl px-6">© {new Date().getFullYear()} {P.name}</div></footer><nav aria-label="Mobile" className="fixed inset-x-4 bottom-4 z-40 flex justify-around rounded-full border bg-background/70 p-1.5 shadow-lg backdrop-blur-xl backdrop-saturate-150 md:hidden" style={{marginBottom:'env(safe-area-inset-bottom)'}}>{[['Home','top',Home],['Work','work',Briefcase],['About','about',User],['Contact','contact',MessageCircle]].map(([l,h,I])=><a key={h} href={`#${h}`} className="flex flex-1 flex-col items-center gap-0.5 rounded-full py-1.5 text-[11px] text-muted-foreground active:text-primary"><I className="size-5"/>{l}</a>)}</nav><ProjectDialog p={proj} onClose={()=>setProj(null)}/><Assistant open={ai} setOpen={setAi}/><Palette open={pal} setOpen={setPal} onAi={()=>setAi(true)} onProject={setProj}/></MotionConfig>}
