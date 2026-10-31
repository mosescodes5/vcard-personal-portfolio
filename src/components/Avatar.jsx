import {useEffect,useState} from 'react';import {useReducedMotion} from 'framer-motion';
// Instagram-style round avatar with a story ring. Fades between the bitmoji and the real photo
// (every few seconds, and on click/tap). If moses-bitmoji.png is missing, it shows the photo only.
const SRC=['/assets/images/moses-bitmoji.png','/assets/images/moses-avatar.webp'];
export default function Avatar({size=40}){const rm=useReducedMotion(),[i,setI]=useState(0),[bit,setBit]=useState(true),on=bit?i:1;
 useEffect(()=>{if(rm||!bit)return;const t=setInterval(()=>setI(n=>1-n),4500);return()=>clearInterval(t)},[rm,bit]);
 const pad=Math.max(2,Math.round(size/22));
 return <button type="button" onClick={()=>bit&&setI(n=>1-n)} aria-label="Moses Kouakanou" style={{width:size,height:size,padding:pad}} className="shrink-0 rounded-full bg-gradient-to-tr from-primary via-sky-400 to-fuchsia-400">
  <span className="relative block size-full overflow-hidden rounded-full bg-background ring-2 ring-background">
   {bit&&<img src={SRC[0]} alt="" onError={()=>setBit(false)} className={`absolute inset-0 size-full bg-secondary object-contain transition-opacity duration-700 ${on===0?'opacity-100':'opacity-0'}`}/>}
   <img src={SRC[1]} alt="" width="320" height="320" className={`absolute inset-0 size-full object-cover transition-opacity duration-700 ${on===1?'opacity-100':'opacity-0'}`}/></span></button>}
