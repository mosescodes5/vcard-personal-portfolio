import {useEffect,useRef} from 'react';
import {motion,useMotionValue,useSpring,useTransform,useScroll,useInView,animate,useReducedMotion} from 'framer-motion';
const DARK=new Set(['nextdotjs','github','ollama']);
const SLUG={SQL:'mysql',Cloudflare:'cloudflare',JavaScript:'javascript',PHP:'php',Python:'python','SQL (MySQL)':'mysql',HTML:'html5',CSS:'css',React:'react','Next.js':'nextdotjs',Angular:'angular','Vue.js':'vuedotjs',WordPress:'wordpress',WooCommerce:'woocommerce',TypeScript:'typescript',Supabase:'supabase',Ollama:'ollama',n8n:'n8n',Docker:'docker',Git:'git',GitHub:'github'};
export const Logo=({n,className})=>SLUG[n]?<img src={`https://cdn.simpleicons.org/${SLUG[n]}`} alt="" className={`${className} ${DARK.has(SLUG[n])?'dark:invert':''}`} onError={e=>e.currentTarget.remove()}/>:null;
export const Reveal=({children,className,delay=0})=><motion.div className={className} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{type:'spring',stiffness:90,damping:20,delay}}>{children}</motion.div>;
export function Tilt({children,max=6,className}){const rm=useReducedMotion(),x=useMotionValue(0),y=useMotionValue(0),cfg={stiffness:200,damping:20},
 rx=useSpring(useTransform(y,[-.5,.5],[max,-max]),cfg),ry=useSpring(useTransform(x,[-.5,.5],[-max,max]),cfg);
 return <motion.div className={className} style={{rotateX:rx,rotateY:ry,transformPerspective:900}} whileHover={rm?undefined:{scale:1.012}}
  onPointerMove={e=>{if(rm||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left)/r.width-.5);y.set((e.clientY-r.top)/r.height-.5)}} onPointerLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.div>}
export function Magnetic({children}){const rm=useReducedMotion(),x=useMotionValue(0),y=useMotionValue(0),sx=useSpring(x,{stiffness:220,damping:14}),sy=useSpring(y,{stiffness:220,damping:14});
 return <motion.div className="inline-block" style={{x:sx,y:sy}} onPointerMove={e=>{if(rm||e.pointerType==='touch')return;const r=e.currentTarget.getBoundingClientRect();x.set((e.clientX-r.left-r.width/2)*.25);y.set((e.clientY-r.top-r.height/2)*.25)}} onPointerLeave={()=>{x.set(0);y.set(0)}}>{children}</motion.div>}
export function Counter({to}){const r=useRef(),v=useInView(r,{once:true});
 useEffect(()=>{if(!v)return;const c=animate(0,to,{duration:1.4,ease:'easeOut',onUpdate:n=>{if(r.current)r.current.textContent=Math.round(n)}});return()=>c.stop()},[v,to]);return <span ref={r}>{to}</span>}
export function Orbs(){const ref=useRef(),x=useMotionValue(-400),y=useMotionValue(-400),sx=useSpring(x,{stiffness:80,damping:20}),sy=useSpring(y,{stiffness:80,damping:20});
 useEffect(()=>{const m=e=>{const r=ref.current?.getBoundingClientRect();if(r){x.set(e.clientX-r.left-200);y.set(e.clientY-r.top-200)}};addEventListener('pointermove',m);return()=>removeEventListener('pointermove',m)},[x,y]);
 const blob=(c,s,a,d)=><motion.div className={`absolute rounded-full blur-3xl ${c}`} style={s} animate={a} transition={{duration:d,repeat:Infinity,repeatType:'mirror',ease:'easeInOut'}}/>;
 return <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
  {blob('bg-[#0A84FF]/25 size-96',{left:'-6%',top:'-10%'},{x:[0,90,20],y:[0,60,-30]},18)}
  {blob('bg-[#5E5CE6]/25 size-[26rem]',{right:'-8%',top:'5%'},{x:[0,-80,-20],y:[0,70,10]},22)}
  {blob('bg-[#64D2FF]/25 size-80',{left:'35%',bottom:'-18%'},{x:[0,60,-40],y:[0,-50,20]},26)}
  <motion.div className="absolute size-[25rem] rounded-full bg-primary/15 blur-3xl" style={{x:sx,y:sy}}/></div>}
export const Marquee=({items})=>{const row=items.map(n=><span key={n} className="mx-1.5 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium"><Logo n={n} className="size-4"/>{n}</span>);
 return <div className="marquee-wrap overflow-hidden py-4" aria-label="Technologies I work with"><div className="marquee flex w-max">{row}<span className="contents" aria-hidden>{row}</span></div></div>};
export function ScrollBar(){const {scrollYProgress}=useScroll(),s=useSpring(scrollYProgress,{stiffness:120,damping:30});return <motion.div style={{scaleX:s}} className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-primary"/>}
