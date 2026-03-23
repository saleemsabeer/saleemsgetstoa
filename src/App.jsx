import { useState, useEffect, useRef } from "react";

const C = {
  bg:"#080808",surface:"#131313",card:"#151515",
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
  return <div style={{position:"fixed",top:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:99,background:"rgba(8,8,8,0.88)",backdropFilter:"blur(40px) saturate(180%)",WebkitBackdropFilter:"blur(40px) saturate(180%)",borderBottom:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",paddingTop:"max(12px, env(safe-area-inset-top))"}}>
    <div style={{fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:2,textTransform:"uppercase"}}>Stoa</div>
    <button onClick={onMenuOpen} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,color:C.text,opacity:0.7,transition:transitionSmooth}}>=</button>
  </div>;
}

function NavBar({active,onNav}) {
  const items=[{id:"home",label:"Home",icon:"⌂"},{id:"mind",label:"Mind",icon:"◐"},{id:"community",label:"Circle",icon:"◎"},{id:"progress",label:"Progress",icon:"△"},{id:"profile",label:"You",icon:"○"}];
  return <nav style={{position:"fixed",bottom:0,left:"50%",transform:"translateX(-50%)",width:"100%",maxWidth:430,zIndex:100,background:"rgba(8,8,8,0.88)",backdropFilter:"blur(40px) saturate(180%)",WebkitBackdropFilter:"blur(40px) saturate(180%)",borderTop:"1px solid "+C.border,display:"flex",justifyContent:"space-around",alignItems:"center",paddingTop:8,paddingBottom:"max(8px, env(safe-area-inset-bottom))"}}>
    {items.map(item=><button key={item.id} onClick={()=>onNav(item.id)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"6px 14px",transition:"all 0.3s",opacity:active===item.id?1:0.35}}>
      <span style={{fontSize:18,fontFamily:sans,color:C.text,filter:active===item.id?"drop-shadow(0 0 6px "+C.accent+")":"none"}}>{item.icon}</span>
      <span style={{fontSize:9,fontFamily:sans,fontWeight:active===item.id?600:400,color:C.text,letterSpacing:1.5,textTransform:"uppercase"}}>{item.label}</span>
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
    {right&&<span style={{fontSize:11,fontFamily:sans,color:C.text3}}>{right}</span>}
  </div>;
}

function HomePage() {
  const [mood,setMood]=useState(null);
  const [time,setTime]=useState("");
  useEffect(()=>{const h=new Date().getHours();setTime(h<12?"Good morning":h<17?"Good afternoon":h<21?"Good evening":"Goodnight")},[]);
  const moods=[{emoji:"✦",label:"Radiant",color:C.accent},{emoji:"☀",label:"Good",color:C.warm},{emoji:"~",label:"Neutral",color:C.text2},{emoji:"☁",label:"Low",color:C.rose},{emoji:"◆",label:"Heavy",color:C.purple}];
  const stats=[{icon:"◦",label:"Water",value:"5",unit:"of 8",sub:"glasses",color:C.accent,progress:0.625},{icon:"↗",label:"Movement",value:"22",unit:"of 30",sub:"minutes",color:C.warm,progress:0.73},{icon:"●",label:"Stillness",value:"15",unit:"of 20",sub:"minutes",color:C.purple,progress:0.75},{icon:"☽",label:"Sleep",value:"7.2",unit:"of 8",sub:"hours",color:C.rose,progress:0.9}];
  const playlists=[{name:"Morning Ritual",by:"Sarah M.",tracks:12,color:"#2a3328"},{name:"Deep Focus",by:"Amara J.",tracks:18,color:"#2d2a22"},{name:"Wind Down",by:"Nadia C.",tracks:9,color:"#2a2533"}];
  const movements=[{type:"Yoga",name:"Morning Flow",by:"Sarah M.",dur:"25 min"},{type:"Pilates",name:"Sculpt & Tone",by:"Nadia C.",dur:"30 min"},{type:"Walk",name:"Walk + Breathe",by:"Amara J.",dur:"20 min"},{type:"Strength",name:"Full Body",by:"Sarah M.",dur:"35 min"}];
  const groups=[{name:"Morning Circle",members:248},{name:"Pilates Sisters",members:186},{name:"Mind Matters",members:412}];

  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{height:340,borderRadius:24,overflow:"hidden",position:"relative",background:"linear-gradient(135deg, "+C.surface+" 0%, #1a201a 50%, "+C.surface+" 100%)"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse at 70% 30%, "+C.accentSoft+" 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(184,130,138,0.05) 0%, transparent 50%)"}}/>
      <div style={{position:"absolute",top:44,left:0,right:0,textAlign:"center",fontSize:12,fontFamily:sans,fontWeight:500,color:C.text3,letterSpacing:8,textTransform:"uppercase"}}>Stoa</div>
      <div style={{position:"absolute",bottom:36,left:28,right:28}}>
        <div style={{fontSize:36,fontFamily:serif,fontWeight:300,color:C.text,lineHeight:1.1}}>{time}</div>
        <div style={{fontSize:14,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text2,marginTop:8}}>Rest is sacred.</div>
      </div>
      <div style={{position:"absolute",top:"50%",left:"65%",transform:"translate(-50%,-50%)",width:200,height:200,borderRadius:"50%",border:"1px solid "+C.border,opacity:0.4}}/>
      <div style={{position:"absolute",top:"50%",left:"65%",transform:"translate(-50%,-50%)",width:140,height:140,borderRadius:"50%",border:"1px solid "+C.border,opacity:0.25}}/>
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
        {stats.map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 18px 16px",border:"1px solid "+C.border,position:"relative",overflow:"hidden",transition:transitionSmooth}}>
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

    <FadeIn delay={0.2}><div style={{borderRadius:22,overflow:"hidden",position:"relative",height:200,background:"linear-gradient(160deg, #141a14 0%, #0f1510 50%, #121212 100%)",border:"1px solid "+C.border}}>
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
        <div style={{fontSize:9,fontFamily:sans,fontWeight:600,color:C.text3,letterSpacing:2.5,textTransform:"uppercase",marginBottom:14}}>Today I'm grateful for</div>
        <textarea placeholder="What brought you peace today?" style={{width:"100%",minHeight:70,background:"rgba(240,237,230,0.02)",border:"1px solid "+C.border,borderRadius:12,padding:"14px 16px",fontSize:13,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text,resize:"none",outline:"none",lineHeight:1.6,boxSizing:"border-box",transition:transitionSmooth}}/>
        <button style={{width:"100%",padding:"13px 0",borderRadius:999,marginTop:14,background:"rgba(240,237,230,0.04)",border:"none",fontSize:12,fontFamily:sans,fontWeight:600,color:C.text3,cursor:"pointer",transition:transitionSmooth}}>Save Gratitude</button>
      </div>
    </div></FadeIn>

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
      <SL right="See all">Movement</SL>
      <div style={{display:"flex",gap:10,overflowX:"auto",paddingBottom:4,marginTop:14,scrollbarWidth:"none"}}>
        {movements.map((m,i)=><div key={i} style={{minWidth:140,background:C.surface,borderRadius:16,border:"1px solid "+C.border,padding:"18px 16px",display:"flex",flexDirection:"column",justifyContent:"space-between",height:140,cursor:"pointer",flexShrink:0,transition:transitionSmooth}}>
          <div><div style={{fontSize:8,fontFamily:sans,fontWeight:700,color:C.text3,letterSpacing:1.5,textTransform:"uppercase",background:"rgba(240,237,230,0.04)",padding:"4px 8px",borderRadius:6,display:"inline-block",marginBottom:12}}>{m.type}</div>
          <div style={{fontSize:14,fontFamily:sans,fontWeight:600,color:C.text,lineHeight:1.3}}>{m.name}</div></div>
          <div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>{m.by}</div><div style={{fontSize:10,fontFamily:sans,color:C.text3}}>{m.dur}</div></div>
        </div>)}
      </div>
    </FadeIn>

    <FadeIn delay={0.39}>
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

    <FadeIn delay={0.4}><div style={{textAlign:"center",padding:"24px 20px"}}>
      <div style={{fontSize:14,fontFamily:serif,fontWeight:300,fontStyle:"italic",color:C.text2,lineHeight:1.8}}>"Sleep is the best meditation."</div>
      <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:6}}>— Dalai Lama</div>
    </div></FadeIn>
  </div>;
}

function MindPage() {
  const items=[{title:"Breathing",sub:"4-7-8 technique",dur:"5 min",color:C.accentSoft,accent:C.accent},{title:"Body Scan",sub:"Progressive relaxation",dur:"12 min",color:C.purpleSoft,accent:C.purple},{title:"Loving Kindness",sub:"Metta meditation",dur:"15 min",color:C.roseSoft,accent:C.rose},{title:"Sound Bath",sub:"Tibetan singing bowls",dur:"20 min",color:C.warmSoft,accent:C.warm}];
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Your Mind</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Cultivate inner stillness</div></div></FadeIn>
    {items.map((item,i)=><FadeIn key={i} delay={0.1+i*0.06}><div style={{background:C.surface,borderRadius:18,padding:22,cursor:"pointer",border:"1px solid "+C.border,display:"flex",justifyContent:"space-between",alignItems:"center",transition:transitionSmooth}}>
      <div style={{display:"flex",alignItems:"center",gap:16}}>
        <div style={{width:48,height:48,borderRadius:14,background:item.color,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:item.accent}}>◎</div>
        <div><div style={{fontSize:14,fontFamily:sans,fontWeight:500,color:C.text}}>{item.title}</div><div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:2}}>{item.sub}</div></div>
      </div>
      <div style={{fontSize:10,fontFamily:sans,color:C.text3,background:"rgba(240,237,230,0.04)",padding:"6px 12px",borderRadius:999}}>{item.dur}</div>
    </div></FadeIn>)}
  </div>;
}

function ProgressPage() {
  const days=Array.from({length:35},()=>({active:Math.random()>0.35,intensity:Math.random()}));
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Progress</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Your wellness journey</div></div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {[{val:"23",label:"Day Streak",icon:"◆"},{val:"4.8",label:"Avg Mood",icon:"☀"},{val:"142",label:"Sessions",icon:"●"}].map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"20px 16px",textAlign:"center",border:"1px solid "+C.border}}>
        <div style={{fontSize:14,color:C.accent,marginBottom:8}}>{s.icon}</div>
        <div style={{fontSize:26,fontFamily:serif,fontWeight:300,color:C.text}}>{s.val}</div>
        <div style={{fontSize:9,fontFamily:sans,color:C.text3,letterSpacing:1,textTransform:"uppercase",marginTop:4}}>{s.label}</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.15}><SL>Activity heatmap</SL><div style={{background:C.surface,borderRadius:18,padding:20,marginTop:14,border:"1px solid "+C.border}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7, 1fr)",gap:4}}>{days.map((d,i)=><div key={i} style={{aspectRatio:"1",borderRadius:4,background:d.active?"rgba(124,154,126,"+(0.15+d.intensity*0.45)+")":"rgba(240,237,230,0.03)",transition:transitionSmooth}}/>)}</div>
      <div style={{display:"flex",justifyContent:"space-between",marginTop:12}}><span style={{fontSize:9,fontFamily:sans,color:C.text3}}>Less</span><div style={{display:"flex",gap:3}}>{[0.05,0.15,0.3,0.45,0.6].map((o,i)=><div key={i} style={{width:10,height:10,borderRadius:2,background:"rgba(124,154,126,"+o+")"}}/>)}</div><span style={{fontSize:9,fontFamily:sans,color:C.text3}}>More</span></div>
    </div></FadeIn>
    <FadeIn delay={0.2}><SL>Weekly summary</SL><div style={{background:C.surface,borderRadius:18,padding:20,marginTop:14,border:"1px solid "+C.border,display:"flex",flexDirection:"column",gap:16}}>
      {[{label:"Movement",val:"4.2 hrs",pct:84,color:C.accent},{label:"Stillness",val:"98 min",pct:70,color:C.purple},{label:"Journaling",val:"6 entries",pct:86,color:C.warm},{label:"Sleep quality",val:"7.2 avg",pct:90,color:C.rose}].map((item,i)=><div key={i}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:12,fontFamily:sans,color:C.text}}>{item.label}</span><span style={{fontSize:12,fontFamily:sans,color:C.text2}}>{item.val}</span></div>
        <div style={{height:3,background:C.border,borderRadius:2}}><div style={{height:"100%",width:item.pct+"%",background:item.color,borderRadius:2,transition:"width 1.5s cubic-bezier(0.16,1,0.3,1)"}}/></div>
      </div>)}
    </div></FadeIn>
  </div>;
}

function ProfilePage() {
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{textAlign:"center",padding:"30px 0 10px"}}>
      <div style={{width:80,height:80,borderRadius:"50%",margin:"0 auto 16px",background:C.accentSoft,border:"2px solid rgba(124,154,126,0.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28,fontFamily:serif,fontWeight:300,color:C.accent}}>S</div>
      <div style={{fontSize:22,fontFamily:serif,fontWeight:400,color:C.text}}>Sarah</div>
      <div style={{fontSize:12,fontFamily:sans,color:C.text3,marginTop:4}}>Member since January 2024</div>
    </div></FadeIn>
    <FadeIn delay={0.1}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
      {[{val:"89",label:"Days Active"},{val:"23",label:"Streak"},{val:"4.8",label:"Avg Mood"}].map((s,i)=><div key={i} style={{background:C.surface,borderRadius:16,padding:"18px 12px",textAlign:"center",border:"1px solid "+C.border}}>
        <div style={{fontSize:24,fontFamily:serif,fontWeight:300,color:C.text}}>{s.val}</div>
        <div style={{fontSize:9,fontFamily:sans,color:C.text3,marginTop:4,letterSpacing:0.5,textTransform:"uppercase"}}>{s.label}</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.15}>{["Wellness Goals","Notifications","Appearance","Privacy","Help & Support","About Stoa"].map((item,i)=><div key={i} style={{padding:"16px 4px",borderBottom:i<5?"1px solid "+C.border:"none",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",transition:transitionSmooth}}>
      <span style={{fontSize:14,fontFamily:sans,color:C.text}}>{item}</span><span style={{fontSize:14,color:C.text3}}>›</span>
    </div>)}</FadeIn>
  </div>;
}

function CommunityPage() {
  return <div style={{display:"flex",flexDirection:"column",gap:28,paddingBottom:100}}>
    <FadeIn><div style={{padding:"20px 0 0"}}><div style={{fontSize:28,fontFamily:serif,fontWeight:300,color:C.text}}>Circle</div><div style={{fontSize:13,fontFamily:serif,fontStyle:"italic",color:C.text2,marginTop:6}}>Your wellness community</div></div></FadeIn>
    <FadeIn delay={0.1}><SL right="See all">Groups</SL><div style={{display:"flex",flexDirection:"column",gap:10,marginTop:14}}>
      {[{name:"Morning Ritual Circle",members:248,desc:"Start each day with intention"},{name:"Manifestation Lab",members:412,desc:"Visualize your best life"},{name:"Pilates Sisters",members:186,desc:"Strength through movement"}].map((g,i)=><div key={i} style={{background:C.surface,borderRadius:18,padding:20,border:"1px solid "+C.border,cursor:"pointer",transition:transitionSmooth}}>
        <div style={{fontSize:14,fontFamily:sans,fontWeight:500,color:C.text}}>{g.name}</div>
        <div style={{fontSize:11,fontFamily:sans,color:C.text3,marginTop:4}}>{g.desc}</div>
        <div style={{fontSize:10,fontFamily:sans,color:C.text3,marginTop:8,background:"rgba(240,237,230,0.04)",display:"inline-block",padding:"4px 10px",borderRadius:999}}>{g.members} members</div>
      </div>)}
    </div></FadeIn>
    <FadeIn delay={0.2}><button style={{width:"100%",padding:16,borderRadius:999,cursor:"pointer",background:C.accentSoft,border:"1px solid rgba(124,154,126,0.2)",fontSize:12,fontFamily:sans,fontWeight:600,color:C.accent,letterSpacing:1,textTransform:"uppercase",transition:transitionSmooth}}>Create a Group</button></FadeIn>
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

export default function App() {
  const [page,setPage]=useState("home");
  const [menuOpen,setMenuOpen]=useState(false);
  return <div style={{background:C.bg,minHeight:"100vh",maxWidth:430,margin:"0 auto",fontFamily:sans,color:C.text,position:"relative",overflow:"hidden"}}>
    <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{display:none}html{scroll-behavior:smooth}::placeholder{color:${C.text3}}textarea:focus,textarea{border-color:${C.borderLight}!important;outline:none}button{transition:all 0.3s cubic-bezier(0.16,1,0.3,1)}button:hover{opacity:0.85}button:active{transform:scale(0.98)}@keyframes breathe{0%,100%{transform:translateY(-50%) scale(1);opacity:0.15}50%{transform:translateY(-50%) scale(1.15);opacity:0.25}}@keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
    <Header onMenuOpen={()=>setMenuOpen(true)}/>
    <PremiumMenu open={menuOpen} onNav={setPage} onClose={()=>setMenuOpen(false)}/>
    <div style={{padding:"0 20px",paddingTop:60,paddingBottom:100}}>
      {page==="home"&&<HomePage/>}
      {page==="mind"&&<MindPage/>}
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
    <NavBar active={page} onNav={setPage}/>
  </div>;
}
