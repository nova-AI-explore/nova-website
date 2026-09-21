const nav=document.getElementById("nav");
const mobile=document.getElementById("mobile");
const menu=document.getElementById("menu");
const cursor=document.querySelector(".cursor-glow");
const sphere=document.getElementById("novaSphere");
const aiWindow=document.getElementById("aiWindow");

addEventListener("scroll",()=>{
  if(nav) nav.classList.toggle("scrolled",scrollY>28);
},{passive:true});

menu?.addEventListener("click",()=>{
  mobile?.classList.toggle("open");
  mobile?.setAttribute("aria-hidden",mobile.classList.contains("open")?"false":"true");
});

mobile?.querySelectorAll("a").forEach(a=>{
  a.addEventListener("click",()=>{
    mobile.classList.remove("open");
    mobile.setAttribute("aria-hidden","true");
  });
});

const io=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("on");
      io.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

const cookie=document.getElementById("cookie");
const cookieBtn=document.getElementById("cookieBtn");
if(localStorage.getItem("nova-cookie-ok")==="1") cookie?.classList.add("hide");
cookieBtn?.addEventListener("click",()=>{
  localStorage.setItem("nova-cookie-ok","1");
  cookie?.classList.add("hide");
});

const finePointer=matchMedia("(pointer:fine)").matches;
if(finePointer){
  addEventListener("pointermove",(e)=>{
    if(cursor){
      cursor.style.left=e.clientX+"px";
      cursor.style.top=e.clientY+"px";
    }
    const x=(e.clientX/innerWidth-.5)*2;
    const y=(e.clientY/innerHeight-.5)*2;
    if(sphere) sphere.style.transform=`rotateY(${x*7}deg) rotateX(${-y*7}deg) translate3d(${x*3}px,${y*-3}px,0)`;
    if(aiWindow) aiWindow.style.transform=`perspective(1000px) rotateY(${x*1.7}deg) rotateX(${-y*1.2}deg)`;
  },{passive:true});
}

document.querySelectorAll(".magnetic").forEach(el=>{
  if(!finePointer) return;
  el.addEventListener("pointermove",(e)=>{
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.12}px,${y*.12}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

const worldStack=document.getElementById("worldStack");
if(worldStack){
  addEventListener("scroll",()=>{
    const r=worldStack.getBoundingClientRect();
    const p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height*.45)));
    const cards=[...worldStack.querySelectorAll(".world-card")];
    cards.forEach((card,i)=>{
      const offset=(i-p*2.2)*18;
      card.style.transform=`translateY(${offset}px) rotate(${i===0?-0.7:(i===1?2:-2)}deg)`;
    });
  },{passive:true});
}