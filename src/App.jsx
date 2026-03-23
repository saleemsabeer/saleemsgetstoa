import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#0f0e1a",surface:"#1a1929",card:"#1e1d2e",
  text:"#f0ede6",text2:"rgba(240,237,230,0.55)",text3:"rgba(240,237,230,0.3)",
  accent:"#7c9a7e",accentSoft:"rgba(124,154,126,0.12)",
  warm:"#c4a882",warmSoft:"rgba(196,168,130,0.1)",
  rose:"#b8828a",roseSoft:"rgba(184,130,138,0.1)",
  purple:"#9b8ab8",purpleSoft:"rgba(155,138,184,0.1)",
  border:"rgba(240,237,230,0.06)",borderLight:"rgba(240,237,230,0.1)",
};
const serif = "'Cormorant Garamond', Georgia, serif";
const sans = "'DM Sans', system-ui, sans-serif";

// Premium animation utilities
const transitionSmooth = "all 0.3s cubic-bezier(0.16,1,0.3,1)";
const transitionFade = "opacity 0.3s ease-in-out, background-color 0.3s ease-in-out";

function Confetti() {
  const confetti = Array.from({length:20},(_,i)=>({id:i,left:Math.random()*100,delay:Math.random()*0.5}));
  return <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:50}}>
    {confetti.map(p=><div key={p.id} style={{position:"absolute",top:"-20px",left:p.left+"%",width:"8px",height:"8px",borderRadius:"50%",background:C.accent,opacity:0.6,animation:`fall ${1.5+Math.random()}s ease-in forwards`,animationDelay:p.delay+"s"}}/>)}
  </div>;
}

function BreathingCircle({size=120,active=true}) {
  return <div style={{position:"relative",width:size,height:size,margin:"0 auto"}}>
    <div style={{position:"absolute",inset:`calc(50% - ${size/2}px)`,width:size,height:size,borderRadius:"50%",border:`1px solid ${C.accent}`,opacity:active?0.8:0.3,animation:active?"breathe 6s ease-in-out infinite":"none"}}/>
    <div style={{position:"absolute",inset:`calc(50% - ${size*.6/2}px)`,width:size*.6,height:size*.6,borderRadius:"50%",border:`1px solid ${C.accent}`,opacity:active?0.5:0.15,animation:active?"breathe 6s ease-in-out infinite 0.2s":"none"}}/>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"12px",fontFamily:serif,color:C.accent,opacity:active?0.7:0,transition:transitionSmooth}}>{active?"breathe":"∞"}</div>
  </div>;
}

function FadeIn({children,delay=0,style={}}) {
  const [v,setV]=useState(false);
  const ref=useRef();
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setV(true);o.disconnect()}},{threshold:0.1});
    if(ref.current)o.observe(ref.current);
    return ()=>o.disconnect();
  },[]);
  return <div ref={ref} style={{opacity:v?1:0,transform:v?"translateY(0)":"translateY(20px)",transition:`opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,...style}}>{children}</div>;
}

function Header({onMenuOpen}) {
  return <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:99,background:"rgba(15,14,26,0.88)",backdropFilter:"blur(40px) saturate(180%)",WebkitBackdropFilter:"blur(40px) saturate(180%)",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",paddingTop:"max(12px, env(safe-area-inset-top))"}}>
    <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:8,textTransform:"uppercase"}}>GetStoa</div>
    <button onClick={onMenuOpen} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.text,opacity:0.7,transition:transitionSmooth}}>=</button>
  </div>;
}

function AmbientSoundPill() {
  const [sound,setSound]=useState("rain");
  const sounds=[{id:"rain",icon:"🌧️",label:"Rain"},{id:"forest",icon:"🌲",label:"Forest"},{id:"fire",icon:"🔥",label:"Fire"}];
  return <div style={{position:"fixed",bottom:100,right:20,zIndex:60}}>
    <div style={{background:C.surface,borderRadius:999,padding:"12px 14px",border:"1px solid "+C.border,boxShadow:`0 0 30px ${C.accent}40, inset 0 0 20px rgba(124,154,126,0.1)`,display:"flex",alignItems:"center",gap:8}}>
      <select value={sound} onChange={(e)=>setSound(e.target.value)} style={{background:"none",border:"none",color:C.text,fontFamily:sans,fontSize:10,cursor:"pointer",outline:"none",appearance:"none",width:50}}>
        {sounds.map(s=><option key={s.id} value={s.id}>{s.label}</option>)}
      </select>
      <span style={{fontSize:14}}>{sounds.find(s=>s.id===sound)?.icon}</span>
    </div>
  </div>;
}

function NavBar({active,onNav}) {
  const items=[{id:"home",label:"Home",icon:"⌂"},{id:"mind",label:"Mind",icon:"◐"},{id:"community",label:"Circle",icon:"◎"},{id:"progress",label:"Progress",icon:"△"},{id:"profile",label:"You",icon:"○"}];
  return <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:100,background:"rgba(15,14,26,0.92)",backdropFilter:"blur(40px) saturate(180%)",WebkitBackdropFilter:"blur(40px) saturate(180%)",borderTop:"1px solid "+C.border,display:"flex",justifyContent:"space-around",alignItems:"center",paddingTop:10,paddingBottom:"max(10px, env(safe-area-inset-bottom))"}}>
    {items.map(item=><button key={item.id} onClick={()=>onNav(item.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"8px 14px",transition:"all 0.3s",opacity:active===item.id?1:0.35}}>
      <span style={{fontSize:18,fontFamily:sans,color:C.text,filter:active===item.id?`drop-shadow(0 0 10px ${C.accent})`:"none"}}>{item.icon}</span>
      <span style={{fontSize:8,fontFamily:sans,fontWeight:active===item.id?700:400,color:C.text,letterSpacing:1.5,textTransform:"uppercase"}}>{item.label}</span>
    </button>)}
  </nav>;
}

function PremiumMenu({open,onNav,onClose}) {
  const premiumPages=[{id:"goals",label:"Goals & Challenges",icon:"◆"},{id:"onboarding",label:"Onboarding",icon:"▣"},{id:"library",label:"Discovery",icon:"⊙"},{id:"insights",label:"Insights",icon:"◈"},{id:"social",label:"Community",icon:"◎"},{id:"membership",label:"Membership",icon:"⊕"},{id:"coach",label:"AI Coach",icon:"✤"}];
  return open?<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"flex-end"}}>
    <div style={{width:"100%",maxWidth:430,margin:"0 auto",background:C.surface,borderRadius:"24px 24px 0 0",border:"1px solid "+C.border,padding:"24px 20px 32px",maxHeight:"70vh",overflowY:"auto"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
        <div style={{fontSize:18,fontFamily:serif,fontWeight:400,color:C.text}}>Premium Features</div>
        <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",fontSize:20,color:C.text3}}>✕</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr",gap:8}}>
        {premiumPages.map(p=><button key={p.id} onClick={()=>{onNav(p.id);onClose();}} style={{padding:"14px 16px",borderRadius:16,background:C.card,border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:12,cursor:"pointer",transition:transitionSmooth,textAlign:"left"}}>
          <span style={{fontSize:18,color:C.accent}}>{p.icon}</span>
          <div><div style={{fontSize:13,fontFamily:sans,fontWeight:500,color:C.text}}>{p.label}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>Premium</div></div>
          <span style={{marginLeft:"auto",color:C.text3}}>›</span>
        </button>)}
      </div>
    </div>
  </div>:null;
}

function SL({children,right}) {
  return <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",padding:"0 4px"}}>
    <span style={{fontSize:10,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:3.5,textTransform:"uppercase"}}>{children}</span>
    {right&&<span style={{fontSize:11,fontFamily:sans,color:C.text3,fontWeight:400}}>{right}</span>}
  </div>;
}

const fitnessVideos=[
  {id:"C2HX2pNbUCM",title:"30 MIN FULL BODY PILATES",channel:"Move With Nicole",duration:"30 min",thumbnail:"https://img.youtube.com/vi/C2HX2pNbUCM/maxresdefault.jpg"},
  {id:"NyP_waVgL1w",title:"25 MIN PILATES FOR BEGINNERS",channel:"Move With Nicole",duration:"25 min",thumbnail:"https://img.youtube.com/vi/NyP_waVgL1w/maxresdefault.jpg"},
  {id:"V1udz3tn9_s",title:"30 MIN YOGA PILATES FLOW",channel:"Yoga With Kassandra",duration:"30 min",thumbnail:"https://img.youtube.com/vi/V1udz3tn9_s/maxresdefault.jpg"},
  {id:"Bar742jA-Zg",title:"30 MIN PILATES YOGA FUSION",channel:"Boho Beautiful",duration:"30 min",thumbnail:"https://img.youtube.com/vi/Bar742jA-Zg/maxresdefault.jpg"},
  {id:"xCCXFt9Cx1k",title:"20 MIN BEGINNER YOGA",channel:"Yoga with Adriene",duration:"20 min",thumbnail:"https://img.youtube.com/vi/xCCXFt9Cx1k/maxresdefault.jpg"},
  {id:"rBDO6XFQT-s",title:"15 MIN FULL BODY STRENGTH",channel:"MihranTV",duration:"15 min",thumbnail:"https://img.youtube.com/vi/rBDO6XFQT-s/maxresdefault.jpg"},
  {id:"u80Gq-gXAZY",title:"25 MIN PILATES & YOGA",channel:"Yoga with Tim",duration:"25 min",thumbnail:"https://img.youtube.com/vi/u80Gq-gXAZY/maxresdefault.jpg"},
  {id:"L_Ib0wCVr9Q",title:"30 MIN CARDIO DANCE",channel:"MihranTV",duration:"30 min",thumbnail:"https://img.youtube.com/vi/L_Ib0wCVr9Q/maxresdefault.jpg"},
];

function VideoModal({video,onClose}) {
  if(!video) return null;
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.9)",zIndex:300,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)"}}>
    <button onClick={onClose} style={{position:"absolute",top:20,right:20,background:"none",border:"none",fontSize:28,color:C.text,cursor:"pointer",opacity:0.7,transition:transitionSmooth}}>✕</button>
    <div style={{width:"100%",paddingTop:"56.25%",position:"relative",maxWidth:"95vw",maxHeight:"80vh",background:C.bg,borderRadius:8,overflow:"hidden"}}>
      <iframe style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none",borderRadius:8}} src={`https://www.youtube.com/embed/${video.id}?autoplay=1&modestbranding=1&rel=0&controls=1`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
    </div>
    <div style={{color:C.text,marginTop:20,textAlign:"center"}}>
      <div style={{fontSize:16,fontFamily:sans,fontWeight:600}}>{video.title}</div>
      <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:6}}>{video.channel}</div>
    </div>
  </div>;
}

function BackButton({onClick}) {
  return <button onClick={onClick} style={{display:"flex",alignItems:"center",gap:6,padding:"8px 0",background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.text3,transition:transitionSmooth}}>
    <span>←</span> <span style={{fontSize:10,fontFamily:sans,letterSpacing:1,textTransform:"uppercase"}}>Back</span>
  </button>;
}

function HomePage({selectedVideo, setSelectedVideo, onNavigate}) {
  const [mood,setMood]=useState(null);
  const [time,setTime]=useState("");
  useEffect(()=>{const h=new Date().getHours();setTime(h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Goodnight")},[]);
  const moods=[{emoji:"✦",label:"Radiant",color:C.accent},{emoji:"☀",label:"Good",color:C.warm},{emoji:"~",label:"Neutral",color:C.text2},{emoji:"☁",label:"Low",color:C.rose},{emoji:"◆",label:"Heavy",color:C.purple}];
  const stats=[{icon:"◦",label:"Water",value:"5",unit:"of 8",sub:"glasses",color:C.accent,progress:0.625},{icon:"↗",label:"Movement",value:"22",unit:"of 30",sub:"minutes",color:C.warm,progress:0.73},{icon:"●",label:"Stillness",value:"15",unit:"of 20",sub:"minutes",color:C.purple,progress:0.75},{icon:"☽",label:"Sleep",value:"7.2",unit:"of 8",sub:"hours",color:C.rose,progress:0.9}];
  const quickLinks=[{label:"Sleep Tracker",icon:"☽",page:"sleep"},{label:"Workout Builder",icon:"↗",page:"workout"},{label:"Book a Trainer",icon:"👤",page:"trainer"}];
  const playlists=[{name:"Morning Ritual",by:"Sarah M.",tracks:12,color:"#1e2d2a"},{name:"Deep Focus",by:"Amara J.",tracks:18,color:"#2a2538"},{name:"Wind Down",by:"Nadia C.",tracks:9,color:"#251e2e"}];
  const movements=[{type:"Yoga",name:"Morning Flow",by:"Sarah M.",dur:"25 min"},{type:"Pilates",name:"Sculpt & Tone",by:"Nadia C.",dur:"30 min"},{type:"Walk",name:"Walk + Breathe",by:"Amara J.",dur:"20 min"},{type:"Strength",name:"Full Body",by:"Sarah M.",dur:"35 min"}];
  const groups=[{name:"Morning Circle",members:248},{name:"Pilates Sisters",members:186},{name:"Mind Matters",members:412}];

  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{height:340,borderRadius:24,overflow:"hidden",position:"relative",background:"linear-gradient(135deg, "+C.surface+" 0%, #1a1f2a 50%, "+C.surface+" 100%)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 30%, "+C.accentSoft+" 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(184,130,138,0.05) 0%, transparent 50%)"}}/>
      <div style={{position:"absolute",top:44,left:0,right:0,textAlign:"center",fontSize:12,fontFamily:sans,fontWeight:600,color:C.text,letterSpacing:8,textTransform:"uppercase"}}>GetStoa</div>
      <div style={{position:"absolute",bottom:36,left:28,right:28}}>
        <div style={{fontSize:36,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1.1}}>{time}</div>
        <div style={{fontSize:14,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text2,marginTop:8}}>Rest is sacred.</div>
      </div>
      <div style={{position:"absolute",top:"50%",left:"65%",transform:"translate(-50%,-50%)",width:200,height:200,borderRadius:"50%",border:"1px solid "+C.border,opacity:0.4}}/>
      <div style={{position:"absolute",top:"50%",left:"65%",transform:"translate(-50%,-50%)",width:140,height:140,borderRadius:"50%",border:"1px solid "+C.border,opacity:0.25}}/>
    </div></FadeIn>

    <FadeIn delay={0.08}><div style={{background:C.surface,borderRadius:18,padding:20,border:"1px solid "+C.border,boxShadow:`inset 0 0 20px rgba(124,154,126,0.08)`}}>
      <div style={{fontSize:10,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:2.5,textTransform:"uppercase",marginBottom:12}}>Your Path Today</div>
      <div style={{fontSize:14,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1.6,marginBottom:12}}>20 min<br/>Box Breathing + Gentle Sunrise Walk</div>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,padding:"9px 12px",background:C.accentSoft,borderRadius:10,fontSize:10,fontFamily:sans,color:C.accent,textAlign:"center",border:"1px solid rgba(124,154,126,0.2)"}}>Box Breathe</div>
        <div style={{flex:1,padding:"9px 12px",background:"transparent",borderRadius:10,fontSize:10,fontFamily:sans,color:C.text3,textAlign:"center",border:"1px solid "+C.border}}>Walk</div>
      </div>
    </div></FadeIn>

    <FadeIn delay={0.1}><div style={{background:C.surface,borderRadius:18,padding:"20px 22px",border:"1px solid "+C.border}}>
      <div style={{fontSize:13,fontFamily:sans,fontWeight:500,color:C.text,marginBottom:16}}>How are you feeling?</div>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        {moods.map((m,i)=><button key={i} onClick={()=>setMood(i)} style={{background:mood===i?m.color+"15":"transparent",border:mood===i?"1px solid "+m.color+"30":"1px solid transparent",borderRadius:14,padding:"10px 8px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:transitionSmooth,flex:1}}>
          <span style={{fontSize:20,color:mood===i?m.color:C.text2}}>{m.emoji}</span>
          <span style={{fontSize:9,fontFamily:sans,color:mood===i?m.color:C.text3,letterSpacing:1,textTransform:"uppercase",fontWeight:500}}>{m.label}</span>
        </button>)}
      </div>
    </div></FadeIn>

    <FadeIn delay={0.15}>
      <SL right="Edit">Today</SL>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:14}}>
        {stats.map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 18px 16px",border:"1px solid "+C.border,position:"relative",overflow:"hidden",transition:transitionSmooth,boxShadow:`inset 0 1px 0 rgba(255,255,255,0.03)`,cursor:"pointer"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:C.border,borderRadius:"16px 16px 0 0"}}><div style={{height:"100%",width:(s.progress*100)+"%",background:s.color,borderRadius:2,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
            <span style={{fontSize:15,color:s.color,opacity:0.7}}>{s.icon}</span>
            <span style={{fontSize:8,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:1.5,textTransform:"uppercase"}}>{s.label}</span>
          </div>
          <div style={{display:"flex",alignItems:"baseline",gap:4}}>
            <span style={{fontSize:32,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1}}>{s.value}</span>
            <span style={{fontSize:12,fontFamily:sans,color:C.text2}}>{s.unit}</span>
          </div>
          <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:4}}>{s.sub}</div>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.22}><SL>Quick Start</SL><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14}}>
      {quickLinks.map((link,i)=><div key={i} onClick={()=>onNavigate(link.page)} style={{background:C.surface,borderRadius:16,padding:18,textAlign:"center",border:"1px solid "+C.border,cursor:"pointer",transition:transitionSmooth,boxShadow:`inset 0 1px 0 rgba(255,255,255,0.03)`}}>
        <div style={{fontSize:24,marginBottom:8}}>{link.icon}</div>
        <div style={{fontSize:11,fontFamily:sans,fontWeight:600,color:C.text,lineHeight:1.2}}>{link.label}</div>
      </div>)}
    </div></FadeIn>

    <FadeIn delay={0.2}><div style={{borderRadius:22,overflow:"hidden",position:"relative",height:200,background:"linear-gradient(160deg, #1a1929 0%, #151425 50%, #1e1d2e 100%)",border:"1px solid "+C.border}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 80% 50%, rgba(124,154,126,0.08) 0%, transparent 60%)"}}/>
      <div style={{position:"absolute",top:24,left:24}}>
        <div style={{fontSize:9,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:3,textTransform:"uppercase",marginBottom:10}}>Take a moment</div>
        <div style={{fontSize:22,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1.3}}>Release<br/>the day..</div>
      </div>
      <div style={{position:"absolute",bottom:24,left:0,right:0,display:"flex",justifyContent:"center"}}>
        <button style={{background:"rgba(124,154,126,0.12)",border:"1px solid rgba(124,154,126,0.25)",borderRadius:999,padding:"12px 32px",fontSize:11,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:1.5,textTransform:"uppercase",cursor:"pointer",transition:transitionSmooth}}>Begin Stillness</button>
      </div>
      <div style={{position:"absolute",right:40,top:"50%",transform:"translateY(-50%)",width:80,height:80,borderRadius:"50%",border:"1px solid rgba(124,154,126,0.15)",animation:"breathe 6s ease-in-out infinite"}}/>
    </div></FadeIn>

    <FadeIn delay={0.22}><button style={{width:"100%",padding:"18px 0",borderRadius:999,background:"rgba(240,237,230,0.04)",border:"1px solid "+C.borderLight,fontSize:11,fontFamily:sans,fontWeight:600,color:C.text,letterSpacing:2.5,textTransform:"uppercase",cursor:"pointer",boxShadow:"0 0 40px rgba(240,237,230,0.02)",transition:transitionSmooth}}>I Need Calm Now</button></FadeIn>

    <FadeIn delay={0.25}><div style={{display:"flex",flexDirection:"column",gap:10}}>
      <div style={{background:C.surface,borderRadius:16,padding:"18px 20px",border:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:transitionSmooth}}>
        <div><div style={{fontSize:14,fontFamily:sans,fontWeight:500,color:C.text}}>Open Journal</div><div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:3}}>Write before you rest</div></div>
        <span style={{fontSize:16,color:C.text3}}>→</span>
      </div>
      <div style={{background:C.surface,borderRadius:16,padding:20,border:"1px solid "+C.border}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{fontSize:9,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:2.5,textTransform:"uppercase"}}>Today I'm grateful for</div>
          <button style={{background:"none",border:"none",cursor:"pointer",fontSize:14,color:C.accent,opacity:0.7,transition:transitionSmooth,padding:"4px 8px"}}>🎙️</button>
        </div>
        <textarea placeholder="What brought you peace today?" style={{width:"100%",minHeight:70,background:"rgba(240,237,230,0.02)",border:"1px solid "+C.border,borderRadius:12,padding:"14px 16px",fontSize:13,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text,resize:"none",outline:"none",lineHeight:1.6,boxSizing:"border-box",transition:transitionSmooth}}/>
        <button style={{width:"100%",padding:"13px 0",borderRadius:999,marginTop:14,background:"rgba(240,237,230,0.04)",border:"none",fontSize:12,fontFamily:sans,fontWeight:600,color:C.text3,cursor:"pointer",transition:transitionSmooth}}>Save Gratitude</button>
      </div>
    </div></FadeIn>

    <FadeIn delay={0.3}>
      <SL>Gratitude Reflections</SL>
      <div style={{display:"flex",gap:12,overflowX:"auto",paddingBottom:4,marginTop:14,scrollbarWidth:"none"}}>
        {["Today I am grateful for quiet strength","Every breath is a gift","Stillness reveals my purpose","Peace flows through me","I honor my inner sanctuary"].map((q,i)=><div key={i} style={{minWidth:240,background:C.surface,borderRadius:18,border:"1px solid "+C.border,padding:24,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",height:140,cursor:"pointer",flexShrink:0,transition:transitionSmooth,textAlign:"center"}}>
          <div style={{fontSize:15,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text,lineHeight:1.6}}>{q}</div>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.28}><div style={{background:C.surface,borderRadius:20,padding:"32px 28px",textAlign:"center",border:"1px solid "+C.border}}>
      <div style={{width:32,height:1,background:C.border,margin:"0 auto 20px",borderRadius:1}}/>
      <div style={{fontSize:9,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:3,textTransform:"uppercase",marginBottom:16}}>Note from the universe</div>
      <div style={{fontSize:17,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text,lineHeight:1.7,opacity:0.85}}>"Every day I am growing into who I was always meant to be."</div>
    </div></FadeIn>

    <FadeIn delay={0.3}>
      <SL>This week</SL>
      <div style={{background:C.surface,borderRadius:18,padding:20,marginTop:14,border:"1px solid "+C.border}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:16}}>
          {["M","T","W","T","F","S","S"].map((d,i)=><div key={i} style={{width:36,height:52,borderRadius:12,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:6,background:i===0?C.accentSoft:"transparent",border:i===0?"1px solid rgba(124,154,126,0.2)":"1px solid transparent"}}>
            <div style={{width:6,height:6,borderRadius:3,background:i<2?C.accent:i<4?C.warm:C.border}}/>
            <span style={{fontSize:10,fontFamily:sans,fontWeight:i===0?600:400,color:i===0?C.accent:C.text3}}>{d}</span>
          </div>)}
        </div>
        <div style={{borderTop:"1px solid "+C.border,paddingTop:16,display:"flex",justifyContent:"space-between"}}>
          {[{val:"4.2",label:"hrs movement"},{val:"98",label:"min stillness"},{val:"6",label:"journal entries"}].map((s,i)=><div key={i}>
            <div style={{fontSize:22,fontFamily:serif,fontWeight:300,color:C.text}}>{s.val}</div>
            <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:2}}>{s.label}</div>
          </div>)}
        </div>
      </div>
    </FadeIn>

    <FadeIn delay={0.34}>
      <SL>Playlists</SL>
      <div style={{background:C.surface,borderRadius:18,overflow:"hidden",marginTop:14,border:"1px solid "+C.border}}>
        {playlists.map((p,i)=><div key={i} style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",borderBottom:i<playlists.length-1?"1px solid "+C.border:"none",cursor:"pointer",transition:transitionSmooth}}>
          <div style={{width:42,height:42,borderRadius:10,background:p.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:C.text3}}>♪</div>
          <div style={{flex:1}}><div style={{fontSize:13,fontFamily:sans,fontWeight:500,color:C.text}}>{p.name}</div><div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:2}}>{p.by} · {p.tracks} tracks</div></div>
          <span style={{fontSize:12,color:C.text3,opacity:0.5}}>›</span>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.36}>
      <SL right="See all">Movement Studio</SL>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginTop:14,scrollbarWidth:"none"}}>
        {fitnessVideos.map((v,i)=><div key={v.id} onClick={()=>setSelectedVideo(v)} style={{minWidth:240,background:C.surface,borderRadius:18,border:"1px solid "+C.border,overflow:"hidden",cursor:"pointer",flexShrink:0,transition:"all 0.3s cubic-bezier(0.16,1,0.3,1)",transform:"scale(1)",textDecoration:"none"}}>
          <div style={{position:"relative",width:"100%",paddingTop:"56.25%",overflow:"hidden",background:"linear-gradient(135deg, #1a1929 0%, #0f0e1a 100%)"}}>
            <img src={v.thumbnail} alt={v.title} loading="lazy" style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",transition:transitionSmooth}}/>
            <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.3)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0,transition:transitionSmooth}}>
              <span style={{fontSize:36,color:"white",fontWeight:600}}>▶</span>
            </div>
            <div style={{position:"absolute",bottom:8,right:8,background:"rgba(0,0,0,0.7)",color:C.text,padding:"4px 10px",borderRadius:6,fontSize:10,fontFamily:sans,fontWeight:600}}>{v.duration}</div>
          </div>
          <div style={{padding:14}}>
            <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:C.text,lineHeight:1.3,height:32,overflow:"hidden",textOverflow:"ellipsis",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical"}}>{v.title}</div>
            <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:8}}>{v.channel}</div>
          </div>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.38}>
      <SL right="See all">Movement</SL>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginTop:14,scrollbarWidth:"none"}}>
        {movements.map((m,i)=><div key={i} style={{minWidth:140,background:C.surface,borderRadius:16,border:"1px solid "+C.border,padding:"18px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between",height:140,cursor:"pointer",flexShrink:0,transition:transitionSmooth}}>
          <div><div style={{fontSize:8,fontFamily:sans,fontWeight:700,color:C.text3,letterSpacing:1.5,textTransform:"uppercase",background:"rgba(240,237,230,0.04)",padding:"4px 8px",borderRadius:6,display:"inline-block",marginBottom:12}}>{m.type}</div>
          <div style={{fontSize:14,fontFamily:sans,fontWeight:600,color:C.text,lineHeight:1.3}}>{m.name}</div></div>
          <div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>{m.by}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>{m.dur}</div></div>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.42}>
      <SL right="See all">Groups</SL>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginTop:14,scrollbarWidth:"none"}}>
        {groups.map((g,i)=><div key={i} style={{minWidth:130,background:C.surface,borderRadius:16,border:"1px solid "+C.border,padding:16,display:"flex",flexDirection:"column",justifyContent:"space-between",height:120,cursor:"pointer",flexShrink:0,transition:transitionSmooth}}>
          <div><div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text,lineHeight:1.3}}>{g.name}</div></div>
          <div style={{fontSize:9,fontFamily:sans,color:C.text3,background:"rgba(240,237,230,0.04)",padding:"4px 8px",borderRadius:6,display:"inline-block",width:"fit-content"}}>{g.members} members</div>
        </div>)}
        <div style={{minWidth:130,background:"transparent",borderRadius:16,border:"2px dashed "+C.border,padding:16,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:120,cursor:"pointer",flexShrink:0,transition:transitionSmooth}}>
          <div style={{fontSize:24,color:C.text3,marginBottom:8}}>+</div>
          <div style={{fontSize:11,fontFamily:sans,fontWeight:600,color:C.text3,textAlign:"center"}}>Create</div>
        </div>
      </div>
    </FadeIn>

    <FadeIn delay={0.46}><div style={{textAlign:"center",padding:"24px 20px"}}>
      <div style={{fontSize:14,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text2,lineHeight:1.8}}>"Sleep is the best meditation."</div>
      <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:6}}>— Dalai Lama</div>
    </div></FadeIn>
  </div>;
}

function MindPage({onNavigate}) {
  const [activeSession,setActiveSession]=useState(null);
  const items=[{title:"Breathing",sub:"4-7-8 technique",dur:"5 min",color:C.accentSoft,accent:C.accent,type:"breathe"},{title:"Body Scan",sub:"Progressive relaxation",dur:"12 min",color:C.purpleSoft,accent:C.purple},{title:"Loving Kindness",sub:"Metta meditation",dur:"15 min",color:C.roseSoft,accent:C.rose},{title:"Sound Bath",sub:"Tibetan singing bowls",dur:"20 min",color:C.warmSoft,accent:C.warm}];
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Your Mind</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Cultivate inner stillness</div></div></FadeIn>
    {items.map((item,i)=><FadeIn key={i} delay={0.1+i*0.06}><div onClick={()=>setActiveSession(activeSession===i?null:i)} style={{background:C.surface,borderRadius:18,padding:22,cursor:"pointer",border:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",transition:transitionSmooth,boxShadow:`inset 0 1px 0 rgba(255,255,255,0.03)`,transform:"scale(1)"}}>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:48,height:48,borderRadius:14,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:item.accent}}>◎</div>
        <div><div style={{fontSize:14,fontFamily:sans,fontWeight:500,color:C.text}}>{item.title}</div><div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:2}}>{item.sub}</div></div>
      </div>
      <div style={{fontSize:10,fontFamily:sans,color:C.text3,background:"rgba(240,237,230,0.04)",padding:"6px 12px",borderRadius:999}}>{item.dur}</div>
    </div></FadeIn>)}
    {activeSession!==null&&<FadeIn delay={0.3}><div style={{background:C.surface,borderRadius:18,padding:32,border:"1px solid "+C.border,textAlign:"center"}}>
      <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:items[activeSession].accent,letterSpacing:2,textTransform:"uppercase",marginBottom:20}}>Now Breathing</div>
      <BreathingCircle size={140} active={true}/>
      <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:20}}>Inhale 4 counts • Hold 4 • Exhale 4</div>
      <button style={{marginTop:24,padding:"12px 28px",borderRadius:999,background:items[activeSession].color,border:`1px solid ${items[activeSession].accent}40`,fontSize:11,fontFamily:sans,fontWeight:600,color:items[activeSession].accent,cursor:"pointer",transition:transitionSmooth}}>End Session</button>
    </div></FadeIn>}
  </div>;
}

function ProgressPage() {
  const [coachMessages,setCoachMessages]=useState([{type:"ai",text:"You're making great progress on your stillness goal! Your average this week is up by 10%. Let's focus on movement today."}]);
  const [coachInput,setCoachInput]=useState("");
  const stats=[{icon:"◦",label:"Water",value:"5",unit:"of 8",sub:"glasses",color:C.accent,progress:0.625},{icon:"↗",label:"Movement",value:"22",unit:"of 30",sub:"minutes",color:C.warm,progress:0.73},{icon:"●",label:"Stillness",value:"15",unit:"of 20",sub:"minutes",color:C.purple,progress:0.75},{icon:"☽",label:"Sleep",value:"7.2",unit:"of 8",sub:"hours",color:C.rose,progress:0.9}];
  const quickActions=["Track Progress","Ask a Question","Daily Check-in"];
  const handleCoachSend=(text)=>{if(!text.trim())return;setCoachMessages([...coachMessages,{type:"user",text}]);setTimeout(()=>setCoachMessages(m=>[...m,{type:"ai",text:"Great question! Based on your recent data, I'd recommend focusing on increasing your water intake and maintaining your current sleep schedule. You're doing wonderfully!"}]),400);setCoachInput("");};
  return <div style={{display:"flex",flexDirection:"column",gap:24,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0",textAlign:"center"}}>
      <div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>GetStoa</div>
      <div style={{fontSize:16,fontFamily:serif,fontWeight:300,color:C.text2,marginTop:4}}>Progress & AI Coach</div>
    </div></FadeIn>
    <FadeIn delay={0.06}><div>
      <div style={{fontSize:14,fontFamily:sans,fontWeight:600,color:C.text,marginBottom:14}}>Transformation</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{borderRadius:18,border:"2px dashed "+C.border,padding:28,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:160,background:C.card,cursor:"pointer",transition:transitionSmooth}}>
          <div style={{width:48,height:48,borderRadius:12,border:"2px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
            <span style={{fontSize:22,color:C.text3}}>📷</span>
          </div>
          <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:C.text}}>Before</div>
        </div>
        <div style={{borderRadius:18,border:"2px dashed "+C.border,padding:28,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:160,background:C.card,cursor:"pointer",transition:transitionSmooth}}>
          <div style={{width:48,height:48,borderRadius:12,border:"2px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:10}}>
            <span style={{fontSize:22,color:C.text3}}>📷</span>
          </div>
          <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:C.text}}>Current</div>
        </div>
      </div>
    </div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
      {stats.map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 18px 16px",border:"1px solid "+C.border,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:C.border}}><div style={{height:"100%",width:(s.progress*100)+"%",background:s.color,borderRadius:2,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}}/></div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <span style={{fontSize:8,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:1.5,textTransform:"uppercase"}}>{s.label}</span>
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:4}}>
          <span style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1}}>{s.value}</span>
          <span style={{fontSize:12,fontFamily:sans,color:C.text2}}>{s.unit}</span>
        </div>
        <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:4}}>{s.sub}</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.16}><div style={{background:C.surface,borderRadius:20,padding:24,border:"1px solid "+C.border,position:"relative"}}>
      <div style={{position:"absolute",top:-18,right:16,width:40,height:40,borderRadius:"50%",background:C.accent,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(124,154,126,0.4)",cursor:"pointer"}}>
        <span style={{fontSize:18,color:C.bg}}>✤</span>
      </div>
      <div style={{textAlign:"center",marginBottom:16}}>
        <div style={{fontSize:16,fontFamily:serif,fontWeight:400,color:C.text}}>GetStoa AI</div>
        <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:2,fontStyle:"italic"}}>Cormorant Garamond</div>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,maxHeight:200,overflowY:"auto",marginBottom:16}}>
        {coachMessages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.type==="user"?"flex-end":"flex-start"}}>
          <div style={{maxWidth:"85%",padding:"12px 16px",borderRadius:m.type==="user"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.type==="user"?C.accent:C.card,color:m.type==="user"?C.bg:C.text,fontSize:13,fontFamily:sans,lineHeight:1.5}}>{m.text}</div>
        </div>)}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:12}}>
        <input value={coachInput} onChange={e=>setCoachInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleCoachSend(coachInput)} placeholder="Ask your AI coach..." style={{flex:1,background:C.card,border:"1px solid "+C.border,borderRadius:12,padding:"10px 14px",fontSize:12,fontFamily:sans,color:C.text}}/>
        <button onClick={()=>handleCoachSend(coachInput)} style={{background:C.accent,border:"none",borderRadius:12,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,color:C.bg,cursor:"pointer"}}>→</button>
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {quickActions.map(a=><button key={a} onClick={()=>handleCoachSend(a)} style={{padding:"8px 14px",background:C.accentSoft,border:"1px solid rgba(124,154,126,0.25)",borderRadius:999,fontSize:11,fontFamily:sans,fontWeight:600,color:C.accent,cursor:"pointer",transition:transitionSmooth}}>{a}</button>)}
      </div>
    </div></FadeIn>
  </div>;
}

function ProfilePage() {
  const [showConfetti,setShowConfetti]=useState(false);
  const milestones=[{badge:"🌱",label:"Rooted",sub:"7 day streak"},{badge:"🧙",label:"Sage of Stillness",sub:"100 sessions"},{badge:"💎",label:"Unbreakable Ritual",sub:"Never missed"}];
  const handleMilestone=()=>{setShowConfetti(true);setTimeout(()=>setShowConfetti(false),2000);};
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    {showConfetti&&<Confetti/>}
    <FadeIn><div style={{textAlign:"center",padding:"30px 0 10px"}}>
      <div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 16px",background:C.accentSoft,border:"2px solid rgba(124,154,126,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontFamily:serif,fontWeight:300,color:C.accent}}>S</div>
      <div style={{fontSize:22,fontFamily:serif,fontWeight:400,color:C.text}}>Saleem</div>
      <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:4}}>Member since January 2024</div>
    </div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {[{val:"89",label:"Days Active"},{val:"23",label:"Streak"},{val:"4.8",label:"Avg Mood"}].map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 12px",textAlign:"center",border:"1px solid "+C.border}}>
        <div style={{fontSize:24,fontFamily:serif,fontWeight:300,color:C.text}}>{s.val}</div>
        <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:4,letterSpacing:0.5,textTransform:"uppercase"}}>{s.label}</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.15}>
      <SL>Unlocked Milestones</SL>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10,marginTop:14}}>
        {milestones.map((m,i)=><div key={i} onClick={handleMilestone} style={{background:C.surface,borderRadius:16,padding:16,border:"1px solid "+C.border,textAlign:"center",cursor:"pointer",transition:transitionSmooth}}>
          <div style={{fontSize:28,marginBottom:8}}>{m.badge}</div>
          <div style={{fontSize:11,fontFamily:sans,fontWeight:600,color:C.accent}}>{m.label}</div>
          <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:4}}>{m.sub}</div>
        </div>)}
      </div>
    </FadeIn>
    <FadeIn delay={0.2}>{["Wellness Goals","Notifications","Appearance","Privacy","Help & Support","About GetStoa"].map((item,i)=><div key={i} style={{padding:"16px 4px",borderBottom:i<5?"1px solid "+C.border:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:transitionSmooth}}>
      <span style={{fontSize:14,fontFamily:sans,color:C.text}}>{item}</span><span style={{fontSize:14,color:C.text3}}>›</span>
    </div>)}</FadeIn>
  </div>;
}

function CommunityPage() {
  const [isLiveActive,setIsLiveActive]=useState(true);
  const [liveCount]=useState(73);
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Circle</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Your wellness community</div></div></FadeIn>
    
    {isLiveActive&&<FadeIn delay={0.08}><div style={{background:`linear-gradient(135deg, ${C.accentSoft} 0%, rgba(124,154,126,0.05) 100%)`,borderRadius:20,padding:28,border:`1px solid rgba(124,154,126,0.3)`,textAlign:"center"}}>
      <div style={{fontSize:10,fontFamily:sans,fontWeight:700,color:C.accent,letterSpacing:2,textTransform:"uppercase",marginBottom:16}}>◉ Live Now</div>
      <div style={{fontSize:20,fontFamily:serif,fontWeight:300,color:C.text,marginBottom:20}}>Stillness Hour</div>
      <BreathingCircle size={100} active={true}/>
      <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:16}}>
        <span style={{fontSize:18,color:C.accent}}>{liveCount}</span> breathing with you right now
      </div>
      <button style={{marginTop:20,padding:"11px 24px",borderRadius:999,background:C.accentSoft,border:`1px solid ${C.accent}40`,fontSize:11,fontFamily:sans,fontWeight:600,color:C.accent,cursor:"pointer",transition:transitionSmooth}}>Join Now</button>
    </div></FadeIn>}

    <FadeIn delay={isLiveActive?0.15:0.08}><SL right="See all">Groups</SL><div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
      {[{name:"Morning Ritual Circle",members:248,desc:"Start each day with intention"},{name:"Manifestation Lab",members:412,desc:"Visualize your best life"},{name:"Pilates Sisters",members:186,desc:"Strength through movement"}].map((g,i)=><div key={i} style={{background:C.surface,borderRadius:18,padding:20,border:"1px solid "+C.border,cursor:"pointer",transition:transitionSmooth}}>
        <div style={{fontSize:14,fontFamily:sans,fontWeight:500,color:C.text}}>{g.name}</div>
        <div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:4}}>{g.desc}</div>
        <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:8,background:"rgba(240,237,230,0.04)",display:"inline-block",padding:"4px 10px",borderRadius:999}}>{g.members} members</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={isLiveActive?0.2:0.12}><button style={{width:"100%",padding:16,borderRadius:999,cursor:"pointer",background:C.accentSoft,border:"1px solid rgba(124,154,126,0.2)",fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:1,textTransform:"uppercase",transition:transitionSmooth}}>Create a Group</button></FadeIn>
  </div>;
}

function GoalsPage() {
  const [goals,setGoals]=useState([{id:1,title:"Meditation Streak",current:14,target:30,icon:"◐",color:C.accent},{id:2,title:"Sleep 8 Hours",current:6,target:30,icon:"☽",color:C.rose},{id:3,title:"Daily Movement",current:22,target:30,icon:"↗",color:C.warm}]);
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Your Goals</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Track your wellness journey</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{background:C.surface,borderRadius:18,padding:20,border:"1px solid "+C.border}}>
      <div style={{fontSize:9,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:2,textTransform:"uppercase",marginBottom:14}}>Create New Goal</div>
      <button style={{width:"100%",padding:"12px 0",borderRadius:999,background:C.accentSoft,border:"1px solid rgba(124,154,126,0.2)",fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:1,textTransform:"uppercase",cursor:"pointer",transition:transitionSmooth}}>+ Add Goal</button>
    </div></FadeIn>
    {goals.map((g,i)=><FadeIn key={g.id} delay={0.1+i*0.08}><div style={{background:C.surface,borderRadius:18,padding:20,border:"1px solid "+C.border}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"start",marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{fontSize:20,color:g.color}}>{g.icon}</div>
          <div><div style={{fontSize:14,fontFamily:sans,fontWeight:600,color:C.text}}>{g.title}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:2}}>Challenge</div></div>
        </div>
        <div style={{fontSize:18,fontFamily:serif,fontWeight:300,color:g.color}}>{g.current}/{g.target}</div>
      </div>
      <div style={{height:4,background:C.border,borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:(g.current/g.target*100)+"%",background:g.color,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}}/></div>
      <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:10}}>{Math.round(g.current/g.target*100)}% Complete</div>
    </div></FadeIn>)}
  </div>;
}

function OnboardingPage() {
  const [step,setStep]=useState(0);
  const steps=[{q:"What's your name?",a:""},{q:"What brings you to Stoa?",opts:["Meditation","Sleep","Fitness","Mental Health","All"],a:""},{q:"How often do you practice wellness?",opts:["Daily","3x/week","1x/week","Starting out"],a:""},{q:"Preferred content length?",opts:["5-10 min","10-20 min","20-30 min","30+ min"],a:""}];
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Welcome to Stoa</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Let's personalize your experience</div></div></FadeIn>
    <div style={{width:"100%",height:2,background:C.border,borderRadius:1,overflow:"hidden"}}><div style={{height:"100%",width:(step+1)/steps.length*100+"%",background:C.accent,transition:"width 0.4s"}}/></div>
    <FadeIn delay={0.1}><div style={{background:C.surface,borderRadius:18,padding:24,border:"1px solid "+C.border}}>
      <div style={{fontSize:16,fontFamily:sans,fontWeight:500,color:C.text,marginBottom:20}}>{steps[step].q}</div>
      {step===0?<input type="text" placeholder="Your name..." style={{width:"100%",padding:"12px 14px",borderRadius:12,background:"rgba(240,237,230,0.02)",border:"1px solid "+C.border,fontSize:14,fontFamily:sans,color:C.text,outline:"none",transition:transitionSmooth}}/>:
      <div style={{display:"flex",flexDirection:"column",gap:8}}>{steps[step].opts.map((o,i)=><button key={i} style={{padding:"12px 14px",borderRadius:12,background:C.card,border:"1px solid "+C.border,fontSize:13,fontFamily:sans,color:C.text,cursor:"pointer",transition:transitionSmooth,textAlign:"left"}}>○ {o}</button>)}</div>}
      <div style={{display:"flex",gap:10,marginTop:20}}>
        {step>0&&<button onClick={()=>setStep(step-1)} style={{flex:1,padding:"12px 0",borderRadius:999,background:"rgba(240,237,230,0.04)",border:"none",fontSize:12,fontFamily:sans,fontWeight:600,color:C.text3,cursor:"pointer",transition:transitionSmooth}}>Back</button>}
        <button onClick={()=>setStep(step+1)} style={{flex:1,padding:"12px 0",borderRadius:999,background:C.accentSoft,border:"1px solid rgba(124,154,126,0.2)",fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,cursor:"pointer",transition:transitionSmooth}}>{step===steps.length-1?"Complete":"Next"}</button>
      </div>
    </div></FadeIn>
  </div>;
}

function LibraryPage() {
  const [filter,setFilter]=useState("all");
  const content=[{id:1,title:"Morning Energizer",type:"Yoga",dur:"15 min",level:"Beginner",cat:"movement"},{id:2,title:"Deep Sleep Hypnosis",type:"Meditation",dur:"30 min",level:"All",cat:"sleep"},{id:3,title:"Stress Relief Breathing",type:"Breathwork",dur:"8 min",level:"Beginner",cat:"meditation"},{id:4,title:"Full Body Strength",type:"Fitness",dur:"20 min",level:"Intermediate",cat:"movement"},{id:5,title:"Loving Kindness Metta",type:"Meditation",dur:"20 min",level:"All",cat:"meditation"}];
  const filters=[{id:"all",label:"All"},{id:"meditation",label:"Meditation"},{id:"movement",label:"Movement"},{id:"sleep",label:"Sleep"}];
  const filtered=filter==="all"?content:content.filter(c=>c.cat===filter);
  return <div style={{display:"flex",flexDirection:"column",gap:20,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Discovery</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Explore wellness content</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"flex",gap:8,overflowX:"auto",paddingBottom:4,scrollbarWidth:"none"}}>
      {filters.map(f=><button key={f.id} onClick={()=>setFilter(f.id)} style={{minWidth:"fit-content",padding:"8px 14px",borderRadius:999,background:filter===f.id?C.accentSoft:"transparent",border:"1px solid "+(filter===f.id?"rgba(124,154,126,0.3)":C.border),fontSize:11,fontFamily:sans,fontWeight:600,color:filter===f.id?C.accent:C.text3,cursor:"pointer",transition:transitionSmooth,textTransform:"uppercase"}}>{f.label}</button>)}
    </div></FadeIn>
    <div style={{display:"flex",flexDirection:"column",gap:12}}>
      {filtered.map((c,i)=><FadeIn key={c.id} delay={0.1+i*0.05}><div style={{background:C.surface,borderRadius:16,padding:16,border:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"start",cursor:"pointer",transition:transitionSmooth}}>
        <div><div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text}}>{c.title}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:4}}>{c.type} · {c.level}</div></div>
        <div style={{fontSize:10,fontFamily:sans,color:C.text3,background:"rgba(240,237,230,0.04)",padding:"4px 8px",borderRadius:6}}>{c.dur}</div>
      </div></FadeIn>)}
    </div>
  </div>;
}

function InsightsPage() {
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Insights</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Your wellness analytics</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
      {[{label:"Avg Mood",val:"4.2",icon:"☀",color:C.warm},{label:"Consistency",val:"92%",icon:"●",color:C.accent},{label:"Total Sessions",val:"142",icon:"◐",color:C.purple},{label:"Hours Practiced",val:"24.5",icon:"△",color:C.rose}].map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:16,border:"1px solid "+C.border,textAlign:"center"}}>
        <div style={{fontSize:18,color:s.color,marginBottom:6}}>{s.icon}</div>
        <div style={{fontSize:22,fontFamily:serif,fontWeight:300,color:C.text}}>{s.val}</div>
        <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:4,textTransform:"uppercase",letterSpacing:0.5}}>{s.label}</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.15}><SL>Mood Trend</SL><div style={{background:C.surface,borderRadius:18,padding:20,marginTop:14,border:"1px solid "+C.border,height:120,display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:6}}>
      {[3.2,4.1,3.8,4.5,4.2,4.8,4.6].map((v,i)=><div key={i} style={{flex:1,height:v*20+"%",background:C.accent,borderRadius:4,opacity:0.7+v*0.1}}/>)}
    </div></FadeIn>
    <FadeIn delay={0.2}><SL right="Export">This Month</SL><div style={{background:C.surface,borderRadius:18,padding:20,marginTop:14,border:"1px solid "+C.border,display:"flex",flexDirection:"column",gap:10}}>
      {[{l:"Meditation: 45 sessions",p:78,c:C.accent},{l:"Movement: 12 sessions",p:64,c:C.warm},{l:"Sleep avg: 7.4 hrs",p:92,c:C.rose}].map((s,i)=><div key={i}><div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,fontFamily:sans,color:C.text}}>{s.l}</span><span style={{fontSize:12,fontFamily:sans,color:C.text2}}>{s.p}%</span></div><div style={{height:3,background:C.border,borderRadius:2}}><div style={{height:"100%",width:s.p+"%",background:s.c,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}}/></div></div>)}
    </div></FadeIn>
  </div>;
}

function SocialPage() {
  const [leaderboard]=useState([{rank:1,name:"Emma",badge:"🏆",score:2840,you:false},{rank:2,name:"You",badge:"🌟",score:2120,you:true},{rank:3,name:"James",badge:"⭐",score:1950,you:false},{rank:4,name:"Sofia",badge:"✨",score:1840,you:false},{rank:5,name:"Alex",badge:"",score:1720,you:false}]);
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Community</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Leaderboards & friends</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"flex",gap:10}}>
      <button style={{flex:1,padding:"12px 0",borderRadius:999,background:C.accentSoft,border:"1px solid rgba(124,154,126,0.2)",fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,cursor:"pointer",transition:transitionSmooth}}>Global</button>
      <button style={{flex:1,padding:"12px 0",borderRadius:999,background:"transparent",border:"1px solid "+C.border,fontSize:12,fontFamily:sans,fontWeight:600,color:C.text3,cursor:"pointer",transition:transitionSmooth}}>Friends</button>
    </div></FadeIn>
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      {leaderboard.map((u,i)=><FadeIn key={u.rank} delay={0.1+i*0.05}><div style={{background:C.surface,borderRadius:16,padding:14,border:"1px solid "+(u.you?C.accentSoft:C.border),display:"flex",alignItems:"center",gap:12}}>
        <div style={{width:36,height:36,borderRadius:"50%",background:u.you?C.accentSoft:C.card,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontFamily:sans,fontWeight:600,color:u.you?C.accent:C.text}}>{u.rank}</div>
        <div style={{flex:1}}><div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text}}>{u.name} {u.badge}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>{u.score} pts</div></div>
        <div style={{fontSize:18}}>{u.badge}</div>
      </div></FadeIn>)}
    </div>
  </div>;
}

function MembershipPage() {
  const tiers=[{name:"Free",price:"$0",features:["5 meditations","+Community access","Basic tracking","Mobile app"],color:C.text3,cta:"Current"},{name:"Premium",price:"$9.99",period:"/mo",features:["Unlimited content","All classes","Advanced insights","No ads","Priority support"],color:C.accent,cta:"Upgrade",popular:true}];
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Membership</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Choose your wellness plan</div></div></FadeIn>
    <div style={{display:"flex",flexDirection:"column",gap:16}}>
      {tiers.map((t,i)=><FadeIn key={t.name} delay={0.1+i*0.1}><div style={{background:C.surface,borderRadius:18,padding:24,border:"2px solid "+(t.popular?C.accent:C.border),position:"relative"}}>
        {t.popular&&<div style={{position:"absolute",top:0,left:20,transform:"translateY(-50%)",background:C.accent,color:C.bg,padding:"4px 12px",borderRadius:999,fontSize:9,fontFamily:sans,fontWeight:600,textTransform:"uppercase"}}>Popular</div>}
        <div style={{marginBottom:20}}>
          <div style={{fontSize:18,fontFamily:sans,fontWeight:600,color:C.text}}>{t.name}</div>
          <div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:t.color,marginTop:8}}>{t.price}<span style={{fontSize:12,color:C.text3}}>{t.period}</span></div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
          {t.features.map((f,j)=><div key={j} style={{fontSize:12,fontFamily:sans,color:C.text,display:"flex",gap:8}}><span style={{color:t.color}}>✓</span> {f}</div>)}
        </div>
        <button style={{width:"100%",padding:"12px 0",borderRadius:999,background:t.popular?C.accentSoft:"rgba(240,237,230,0.04)",border:"1px solid "+(t.popular?"rgba(124,154,126,0.2)":C.border),fontSize:12,fontFamily:sans,fontWeight:600,color:t.popular?C.accent:C.text3,cursor:"pointer",transition:transitionSmooth}}>{t.cta}</button>
      </div></FadeIn>)}
    </div>
  </div>;
}

function CoachPage() {
  const [recs]=useState([{type:"Breathing",title:"You've been stressed lately",sub:"Try this 5-min 4-7-8 breathing",reason:"Based on your mood patterns"},{type:"Movement",title:"Energy is low today",sub:"Start with gentle yoga",reason:"You typically feel better after movement"},{type:"Sleep",title:"Rest priority week",sub:"Wind-down meditation before bed",reason:"Your sleep has been declining"}]);
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingTop:60,paddingBottom:100}}>
    <FadeIn><div style={{padding:"0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>AI Coach</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Your personalized companion</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{background:"linear-gradient(135deg, "+C.accentSoft+" 0%, rgba(124,154,126,0.05) 100%)",borderRadius:20,padding:24,border:"1px solid rgba(124,154,126,0.2)"}}>
      <div style={{fontSize:14,fontFamily:serif,fontStyle:"italic",fontWeight:300,color:C.text,lineHeight:1.8}}>"Hey Sarah! I noticed your mood dipped yesterday. Let's focus on grounding today. Your best sessions are after movement—shall we start with a gentle 10-minute flow?"</div>
    </div></FadeIn>
    <FadeIn delay={0.15}>
      <SL>Personalized For You</SL>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
        {recs.map((r,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:16,border:"1px solid "+C.border,cursor:"pointer",transition:transitionSmooth}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
            <div style={{fontSize:10,fontFamily:sans,fontWeight:600,color:C.accent,background:C.accentSoft,padding:"3px 8px",borderRadius:6,textTransform:"uppercase"}}>{r.type}</div>
          </div>
          <div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text}}>{r.title}</div>
          <div style={{fontSize:11,fontFamily:sans,color:C.text2,marginTop:6}}>{r.sub}</div>
          <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:8}}>💡 {r.reason}</div>
        </div>)}
      </div>
    </FadeIn>
  </div>;
}

function SleepTrackerPage({onNavigate}) {
  const sleepScore=82;
  const sleepData=[{day:"M",quality:65,color:C.accent},{day:"T",quality:78,color:C.accent},{day:"W",quality:55,color:C.warm},{day:"T",quality:88,color:C.accent},{day:"F",quality:72,color:C.accent},{day:"S",quality:92,color:C.accent},{day:"S",quality:82,color:C.accent}];
  const radius=72;const circ=2*Math.PI*radius;const strokeDash=circ*(sleepScore/100);
  const scoreLabel=sleepScore>=80?"Good":sleepScore>=60?"Fair":"Needs Work";
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><BackButton onClick={()=>onNavigate("home")}/><div style={{fontSize:10,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:6,textTransform:"uppercase",marginTop:12}}>STOA</div></FadeIn>
    <FadeIn delay={0.08}><div style={{display:"flex",justifyContent:"center",padding:"8px 0"}}>
      <div style={{position:"relative",width:190,height:190}}>
        <svg width={190} height={190} style={{transform:"rotate(-90deg)"}}>
          <defs>
            <linearGradient id="sleepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={C.purple}/>
              <stop offset="50%" stopColor={C.rose}/>
              <stop offset="100%" stopColor={C.accent}/>
            </linearGradient>
          </defs>
          <circle cx={95} cy={95} r={radius} fill="none" stroke={C.border} strokeWidth={5}/>
          <circle cx={95} cy={95} r={radius} fill="none" stroke="url(#sleepGrad)" strokeWidth={5} strokeDasharray={circ} strokeDashoffset={circ-strokeDash} strokeLinecap="round" style={{transition:"stroke-dashoffset 1.5s cubic-bezier(0.16,1,0.3,1)"}}/>
        </svg>
        <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
          <div style={{fontSize:48,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1}}>{sleepScore}</div>
          <div style={{fontSize:12,fontFamily:sans,fontWeight:500,color:C.text2,marginTop:4}}>Sleep Score</div>
          <div style={{fontSize:10,fontFamily:sans,color:C.bg,background:C.accent,borderRadius:999,padding:"3px 12px",marginTop:6,fontWeight:600}}>{scoreLabel}</div>
        </div>
      </div>
    </div></FadeIn>
    <FadeIn delay={0.12}><div style={{display:"flex",gap:12}}>
      <div style={{flex:1,background:C.surface,borderRadius:16,padding:"16px 18px",border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:20,color:C.purple}}>☽</span>
        <div><div style={{fontSize:10,fontFamily:sans,color:C.text3,fontWeight:500}}>Bedtime</div><div style={{fontSize:16,fontFamily:sans,fontWeight:600,color:C.text}}>11:15 PM</div></div>
      </div>
      <div style={{flex:1,background:C.surface,borderRadius:16,padding:"16px 18px",border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:12}}>
        <span style={{fontSize:20,color:C.warm}}>☀</span>
        <div><div style={{fontSize:10,fontFamily:sans,color:C.text3,fontWeight:500}}>Wake Time</div><div style={{fontSize:16,fontFamily:sans,fontWeight:600,color:C.text}}>7:30 AM</div></div>
      </div>
    </div></FadeIn>
    <FadeIn delay={0.18}><div>
      <div style={{fontSize:16,fontFamily:serif,fontWeight:400,color:C.text,marginBottom:16}}>Sleep Quality</div>
      <div style={{background:C.surface,borderRadius:18,padding:"20px 16px",border:"1px solid "+C.border}}>
        <div style={{display:"flex",alignItems:"flex-end",gap:8,height:120}}>
          {sleepData.map((d,i)=><div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{height:d.quality*1.1,width:"100%",maxWidth:24,background:d.quality>70?C.accent:C.warm,borderRadius:5,opacity:0.85,transition:"height 1.2s cubic-bezier(0.16,1,0.3,1)"}}/>
            <div style={{fontSize:10,fontFamily:sans,color:C.text3,fontWeight:500}}>{d.day}</div>
          </div>)}
        </div>
      </div>
    </div></FadeIn>
    <FadeIn delay={0.22}><div style={{background:C.surface,borderRadius:18,padding:"20px 22px",border:"1px solid "+C.border,display:"flex",gap:14,alignItems:"flex-start"}}>
      <span style={{fontSize:20,color:C.accent,marginTop:2}}>🌿</span>
      <div>
        <div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text,marginBottom:6}}>Wind down tip</div>
        <div style={{fontSize:13,fontFamily:sans,color:C.text2,lineHeight:1.5}}>Try a 5-minute meditation before bed to improve deep sleep and relaxation.</div>
      </div>
    </div></FadeIn>
  </div>;
}

function WorkoutBuilderPage({onNavigate}) {
  const [workoutName,setWorkoutName]=useState("");
  const [selectedCat,setSelectedCat]=useState("Strength");
  const [exercises,setExercises]=useState([{name:"Goblet Squat",sets:3,reps:12,rest:60,done:true},{name:"Push-ups",sets:3,reps:12,rest:60,done:true},{name:"Plank",sets:3,reps:12,rest:60,done:false}]);
  const categories=[{id:"Strength",icon:"🏋️"},{id:"Yoga",icon:"🧘"},{id:"Pilates",icon:"🌿"},{id:"Cardio",icon:"❤️"},{id:"Recovery",icon:"🔄"}];
  const totalDuration=exercises.length*15;
  const addExercise=()=>setExercises([...exercises,{name:"",sets:3,reps:10,rest:60,done:false}]);
  return <div style={{display:"flex",flexDirection:"column",gap:24,paddingBottom:100}}>
    <FadeIn><BackButton onClick={()=>onNavigate("home")}/>
      <div style={{fontSize:32,fontFamily:serif,fontWeight:300,color:C.text,marginTop:8}}>Build</div>
      <div style={{fontSize:14,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:4}}>Design your practice</div>
    </FadeIn>
    <FadeIn delay={0.06}><input value={workoutName} onChange={(e)=>setWorkoutName(e.target.value)} placeholder="Workout Name" style={{width:"100%",background:C.surface,border:"1px solid "+C.border,borderRadius:14,padding:"14px 18px",fontSize:14,fontFamily:sans,color:C.text,boxSizing:"border-box"}}/></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"flex",gap:8,overflowX:"auto",scrollbarWidth:"none",paddingBottom:4}}>
      {categories.map(cat=><button key={cat.id} onClick={()=>setSelectedCat(cat.id)} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"12px 16px",borderRadius:14,background:selectedCat===cat.id?C.accentSoft:C.surface,border:"1px solid "+(selectedCat===cat.id?"rgba(124,154,126,0.3)":C.border),cursor:"pointer",transition:transitionSmooth,flexShrink:0,minWidth:68}}>
        <span style={{fontSize:22}}>{cat.icon}</span>
        <span style={{fontSize:10,fontFamily:sans,fontWeight:600,color:selectedCat===cat.id?C.accent:C.text3,letterSpacing:0.5}}>{cat.id}</span>
      </button>)}
    </div></FadeIn>
    <FadeIn delay={0.15}><div style={{display:"flex",flexDirection:"column",gap:10}}>
      {exercises.map((ex,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 20px",border:"1px solid "+C.border,display:"flex",alignItems:"center",gap:14}}>
        <div style={{width:28,height:28,borderRadius:8,background:ex.done?C.accent:"transparent",border:ex.done?"none":"2px solid "+C.border,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,cursor:"pointer",transition:transitionSmooth}} onClick={()=>{const n=[...exercises];n[i].done=!n[i].done;setExercises(n);}}>
          {ex.done&&<span style={{color:C.bg,fontSize:14,fontWeight:700}}>✓</span>}
        </div>
        <div style={{flex:1}}>
          <div style={{fontSize:15,fontFamily:sans,fontWeight:600,color:C.text}}>{ex.name||"New Exercise"}</div>
          <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:4}}>{ex.sets} sets x {ex.reps} reps · Rest: {ex.rest}s</div>
        </div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.2}><button onClick={addExercise} style={{width:"100%",padding:"14px",background:C.accentSoft,border:"1px dashed rgba(124,154,126,0.4)",borderRadius:14,fontSize:13,fontFamily:sans,fontWeight:600,color:C.accent,cursor:"pointer",transition:transitionSmooth,display:"flex",alignItems:"center",justifyContent:"center",gap:8}}>
      <span style={{fontSize:16}}>+</span> Add Exercise
    </button></FadeIn>
    <FadeIn delay={0.25}><div style={{textAlign:"center",padding:"8px 0"}}>
      <div style={{fontSize:13,fontFamily:sans,color:C.text3}}>Total Duration: <span style={{color:C.text,fontWeight:600}}>{totalDuration} min</span></div>
    </div></FadeIn>
    <FadeIn delay={0.28}><button style={{width:"100%",padding:"16px",background:C.accent,border:"none",borderRadius:14,fontSize:14,fontFamily:sans,fontWeight:600,color:C.bg,cursor:"pointer",transition:transitionSmooth}}>Save Workout</button></FadeIn>
  </div>;
}

function TrainerBookingPage({onNavigate}) {
  const [selectedTrainer,setSelectedTrainer]=useState(null);
  const [selectedDate,setSelectedDate]=useState(12);
  const [selectedTime,setSelectedTime]=useState("07:00 AM");
  const trainers=[
    {id:1,name:"Sarah M.",specialty:"Yoga & Meditation",rating:4.9,photo:"https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=300&h=350&fit=crop&crop=face"},
    {id:2,name:"Amara J.",specialty:"Pilates & Strength",rating:4.8,photo:"https://images.unsplash.com/photo-1594381898411-846e7d193883?w=300&h=350&fit=crop&crop=face"},
    {id:3,name:"Nadia C.",specialty:"Mindfulness & Breathwork",rating:5.0,photo:"https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&h=350&fit=crop&crop=face"}
  ];
  const calDays=[{day:"Mon",num:10},{day:"Tue",num:11},{day:"Wed",num:12},{day:"Thu",num:13},{day:"Fri",num:14},{day:"Sat",num:15},{day:"Sun",num:16}];
  const morningTimes=["07:00 AM","08:30 AM","10:00 AM"];
  const afternoonTimes=["12:00 PM","01:30 PM","03:00 PM"];
  const eveningTimes=["05:00 PM","06:30 PM","08:00 PM"];
  return <div style={{display:"flex",flexDirection:"column",gap:24,paddingBottom:100}}>
    <FadeIn><BackButton onClick={()=>onNavigate("home")}/>
      <div style={{fontSize:32,fontFamily:serif,fontWeight:300,color:C.text,marginTop:8}}>Book</div>
      <div style={{fontSize:14,fontFamily:sans,color:C.text2,marginTop:4}}>Connect with your guide</div>
    </FadeIn>
    <FadeIn delay={0.08}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {trainers.map(t=><div key={t.id} onClick={()=>setSelectedTrainer(t.id)} style={{cursor:"pointer",transition:transitionSmooth,opacity:selectedTrainer===t.id||!selectedTrainer?1:0.5}}>
        <div style={{width:"100%",aspectRatio:"0.85",borderRadius:12,overflow:"hidden",background:C.surface,border:selectedTrainer===t.id?"2px solid "+C.accent:"2px solid "+C.border,transition:transitionSmooth}}>
          <img src={t.photo} alt={t.name} style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
        </div>
        <div style={{marginTop:10}}>
          <div style={{fontSize:14,fontFamily:sans,fontWeight:600,color:C.text}}>{t.name}</div>
          <div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:2,lineHeight:1.3}}>{t.specialty}</div>
          <div style={{fontSize:11,fontFamily:sans,color:C.warm,marginTop:4}}>★ {t.rating}/5</div>
        </div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.12}><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
      {calDays.map(d=><button key={d.num} onClick={()=>setSelectedDate(d.num)} style={{padding:"8px 0",background:selectedDate===d.num?C.accent:"transparent",border:"none",borderRadius:10,cursor:"pointer",transition:transitionSmooth,textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
        <span style={{fontSize:11,fontFamily:sans,fontWeight:400,color:selectedDate===d.num?C.bg:C.text3}}>{d.day}</span>
        <span style={{fontSize:16,fontFamily:sans,fontWeight:600,color:selectedDate===d.num?C.bg:C.text}}>{d.num}</span>
      </button>)}
    </div></FadeIn>
    <FadeIn delay={0.14}><div style={{height:1,background:C.border}}/></FadeIn>
    <FadeIn delay={0.16}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {[{label:"Morning",times:morningTimes},{label:"Afternoon",times:afternoonTimes},{label:"Evening",times:eveningTimes}].map(col=><div key={col.label}>
        <div style={{fontSize:13,fontFamily:sans,fontWeight:600,color:C.text,marginBottom:10,textAlign:"center"}}>{col.label}</div>
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {col.times.map(t=><button key={t} onClick={()=>setSelectedTime(t)} style={{padding:"14px 6px",background:selectedTime===t?C.accent:C.surface,border:"none",borderRadius:10,fontSize:12,fontFamily:sans,fontWeight:600,color:selectedTime===t?C.bg:C.text,cursor:"pointer",transition:transitionSmooth,textAlign:"center"}}>
            {t}
          </button>)}
        </div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.22}><button style={{width:"100%",padding:"18px",background:C.accent,border:"none",borderRadius:14,fontSize:16,fontFamily:sans,fontWeight:600,color:C.bg,cursor:"pointer",transition:transitionSmooth,letterSpacing:0.5}}>Confirm Booking</button></FadeIn>
  </div>;
}

function AIChatSheet({open,onClose}) {
  const [messages,setMessages]=useState([{type:"ai",text:"Hi! I'm your wellness coach. How can I support you today?"}]);
  const [input,setInput]=useState("");
  const quickPrompts=["How am I doing?","Suggest a ritual","Help me sleep"];
  const handleSend=(text)=>{if(!text.trim())return;setMessages([...messages,{type:"user",text}]);setTimeout(()=>setMessages(m=>[...m,{type:"ai",text:"That's great! Keep it up. 🌿"}]),300);setInput("");};
  if(!open)return null;
  return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:99,display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn 0.3s ease"}} onClick={onClose}>
    <div style={{width:"100%",maxWidth:430,height:"80vh",background:C.surface,borderTopLeftRadius:28,borderTopRightRadius:28,boxShadow:"0 -8px 32px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",border:"1px solid "+C.border,borderBottom:"none",onClick:e=>e.stopPropagation()}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px",borderBottom:"1px solid "+C.border}}>
        <div style={{fontSize:16,fontFamily:sans,fontWeight:600,color:C.text}}>Wellness Coach</div>
        <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,color:C.text3,cursor:"pointer"}}>✕</button>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:12}}>
        {messages.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.type==="user"?"flex-end":"flex-start"}}><div style={{maxWidth:"80%",padding:"12px",borderRadius:14,background:m.type==="user"?C.accent:C.card,color:m.type==="user"?C.bg:C.text,fontSize:13,fontFamily:sans,lineHeight:1.4}}>{m.text}</div></div>)}
      </div>
      <div style={{padding:"12px 16px",borderTop:"1px solid "+C.border}}>
        {messages.length===1&&<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:12}}>
          {quickPrompts.map(p=><button key={p} onClick={()=>handleSend(p)} style={{padding:"8px",background:C.card,border:"1px solid "+C.border,borderRadius:10,fontSize:11,fontFamily:sans,color:C.text2,cursor:"pointer",transition:transitionSmooth}}>
            {p}
          </button>)}
        </div>}
        <div style={{display:"flex",gap:8}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyPress={e=>e.key==="Enter"&&handleSend(input)} placeholder="Ask me anything..." style={{flex:1,background:C.card,border:"1px solid "+C.border,borderRadius:12,padding:"10px",fontSize:12,fontFamily:sans,color:C.text}}/>
          <button onClick={()=>handleSend(input)} style={{background:C.accent,border:"none",borderRadius:12,width:40,height:40,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,cursor:"pointer",transition:transitionSmooth}}>→</button>
        </div>
      </div>
    </div>
  </div>;
}

export default function App() {
  const [page,setPage]=useState("home");
  const [menuOpen,setMenuOpen]=useState(false);
  const [selectedVideo,setSelectedVideo]=useState(null);
  const [chatOpen,setChatOpen]=useState(false);
  
  const handleNavigate=(newPage)=>{setPage(newPage);};
  
  return <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:sans,color:C.text,position:"relative",overflow:"hidden"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{display:none}html{scroll-behavior:smooth}body{background:#0f0e1a}::placeholder{color:${C.text3}}textarea:focus,textarea{border-color:${C.borderLight}!important;outline:none}button{transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}button:hover{opacity:0.85}button:active{transform:scale(0.98)}@keyframes breathe{0%,100%{transform:translateY(-50%) scale(1);opacity:0.15}50%{transform:translateY(-50%) scale(1.15);opacity:0.25}}@keyframes fall{to{transform:translateY(100vh);opacity:0}}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <VideoModal video={selectedVideo} onClose={()=>setSelectedVideo(null)}/>
    <AmbientSoundPill/>
    <Header onMenuOpen={()=>setMenuOpen(true)}/>
    <PremiumMenu open={menuOpen} onNav={setPage} onClose={()=>setMenuOpen(false)}/>
    <div style={{padding:"0 20px",paddingTop:60,paddingBottom:100}}>
      {page==="home"&&<HomePage selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo} onNavigate={handleNavigate}/>}
      {page==="mind"&&<MindPage onNavigate={handleNavigate}/>}
      {page==="sleep"&&<SleepTrackerPage onNavigate={handleNavigate}/>}
      {page==="workout"&&<WorkoutBuilderPage onNavigate={handleNavigate}/>}
      {page==="trainer"&&<TrainerBookingPage onNavigate={handleNavigate}/>}
      {page==="community"&&<CommunityPage/>}
      {page==="progress"&&<ProgressPage/>}
      {page==="profile"&&<ProfilePage/>}
      {page==="goals"&&<GoalsPage/>}
      {page==="onboarding"&&<OnboardingPage/>}
      {page==="library"&&<LibraryPage/>}
      {page==="insights"&&<InsightsPage/>}
      {page==="social"&&<SocialPage/>}
      {page==="membership"&&<MembershipPage/>}
      {page==="coach"&&<CoachPage/>}
    </div>
    
    {page!=="sleep"&&page!=="workout"&&page!=="trainer"&&<button onClick={()=>setChatOpen(true)} style={{position:"fixed",bottom:90,right:20,width:56,height:56,borderRadius:"50%",background:C.accentSoft,border:"1px solid rgba(124,154,126,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,cursor:"pointer",transition:transitionSmooth,boxShadow:`0 8px 24px rgba(124,154,126,0.2)`,zIndex:60}}>💬</button>}
    
    <AIChatSheet open={chatOpen} onClose={()=>setChatOpen(false)}/>
    <NavBar active={page} onNav={setPage}/>
  </div>;
}
