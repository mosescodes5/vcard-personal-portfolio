import {useEffect,useState} from 'react';import {motion} from 'framer-motion';
const DARK=new Set(['nextdotjs','github','ollama']);
const SLUG={SQL:'mysql',Cloudflare:'cloudflare',JavaScript:'javascript',PHP:'php',Python:'python',HTML:'html5',CSS:'css',React:'react','Next.js':'nextdotjs',Angular:'angular','Vue.js':'vuedotjs',WordPress:'wordpress',WooCommerce:'woocommerce',TypeScript:'typescript',Supabase:'supabase',Ollama:'ollama',n8n:'n8n',Docker:'docker',Git:'git',GitHub:'github'};
export const Logo=({n,className})=>SLUG[n]?<img src={`https://cdn.simpleicons.org/${SLUG[n]}`} alt="" className={`${className} ${DARK.has(SLUG[n])?'dark:invert':''}`} onError={e=>e.currentTarget.remove()}/>:null;
export const Reveal=({children,className,delay=0})=><motion.div className={className} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:'-80px'}} transition={{duration:.7,ease:[.2,.7,.1,1],delay}}>{children}</motion.div>;
export const Line=({children,delay=0})=><span className="block overflow-hidden pb-[0.08em]"><motion.span className="block" initial={{y:'110%'}} animate={{y:0}} transition={{duration:.9,ease:[.2,.7,.1,1],delay:.1+delay}}>{children}</motion.span></span>;
export function useActive(ids){const[a,setA]=useState(ids[0]);
 useEffect(()=>{const o=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&setA(e.target.id)),{rootMargin:'-40% 0px -55% 0px'});ids.forEach(i=>{const el=document.getElementById(i);el&&o.observe(el)});return()=>o.disconnect()},[]);return a}
