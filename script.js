const releaseUrl="https://api.github.com/repos/team3nerd/nova-website/releases/latest";
const fallbackDownload="https://github.com/team3nerd/nova-website/releases/latest/download/NOVA.apk";
document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

async function loadRelease(){
  const version=document.getElementById("release-version");
  const heroVersion=document.getElementById("hero-version");
  const button=document.getElementById("download-button");
  try{
    const res=await fetch(releaseUrl,{headers:{Accept:"application/vnd.github+json"}});
    if(!res.ok) throw new Error("No release");
    const release=await res.json();
    const tag=release.tag_name||"latest";
    version.textContent=tag;
    heroVersion.textContent=tag.replace(/^v/,"");
    const apk=(release.assets||[]).find(a=>a.name.toLowerCase()==="nova.apk");
    button.href=apk?.browser_download_url||fallbackDownload;
  }catch(e){
    version.textContent="Latest";
    heroVersion.textContent="latest";
    button.href=fallbackDownload;
  }
}
loadRelease();

document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener("click",e=>{
    const target=document.querySelector(link.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"})}
  });
});
