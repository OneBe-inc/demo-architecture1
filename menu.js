(()=>{
const services=[{"name":"軽天工事","en":"LIGHT GAUGE STEEL","slug":"light-gauge"},{"name":"天井内装仕上げ","en":"CEILING FINISH","slug":"ceiling"},{"name":"壁張り工事","en":"WALL FINISH","slug":"wall"},{"name":"間仕切り工事","en":"PARTITION","slug":"partition"},{"name":"防音工事","en":"ACOUSTIC","slug":"acoustic"},{"name":"畳・ふすまの工事","en":"TATAMI / FUSUMA","slug":"tatami"}];
const onHome=!!document.querySelector('.explorer'),root=document.body.dataset.root||'./';
const currentService=()=>onHome?Number(document.querySelector('.progress').value):Number(document.body.dataset.service);
const menu=document.querySelector('#site-menu'),menuToggles=[...document.querySelectorAll('[data-menu]')],menuShade=document.querySelector('.menu-shade');
let menuOpen=false,menuTrigger=null,menuHideTimer;
menu.querySelector('.drawer-links').innerHTML=services.map((s,i)=>`<a href="${root}${onHome?`#service-${i+1}`:`services/${s.slug}.html`}" data-menu-go="${i}" style="--item:${i}"><span class="menu-number">0${i+1}</span><span class="menu-service"><strong>${s.name}</strong><small>${s.en}</small></span><span class="menu-arrow" aria-hidden="true">↗</span></a>`).join('');
function closeMenu(restore=true){
  if(!menuOpen)return;
  menuOpen=false;document.body.classList.remove('menu-open');
  menu.setAttribute('aria-hidden','true');menu.inert=true;
  menuToggles.forEach(b=>{b.setAttribute('aria-expanded','false');b.setAttribute('aria-label','メニューを開く');});
  clearTimeout(menuHideTimer);menuHideTimer=setTimeout(()=>{menuShade.hidden=true;},matchMedia('(prefers-reduced-motion:reduce)').matches?0:460);
  if(restore){const target=menuTrigger?.getClientRects().length?menuTrigger:menuToggles.find(b=>b.getClientRects().length);target?.focus({preventScroll:true});}
}
function openMenu(trigger){
  clearTimeout(menuHideTimer);menuTrigger=trigger;menuOpen=true;menuShade.hidden=false;
  menu.inert=false;menu.setAttribute('aria-hidden','false');
  menu.querySelectorAll('[data-menu-go]').forEach(a=>{if(Number(a.dataset.menuGo)===currentService())a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
  menuToggles.forEach(b=>{b.setAttribute('aria-expanded','true');b.setAttribute('aria-label','メニューを閉じる');});
  document.body.classList.add('menu-open');
  menu.querySelector('.menu-close').focus({preventScroll:true});
}
menuToggles.forEach(b=>b.addEventListener('click',()=>menuOpen?closeMenu():openMenu(b)));
menu.querySelector('.menu-close').addEventListener('click',()=>closeMenu());
menuShade.addEventListener('click',()=>closeMenu());
menu.querySelectorAll('[data-menu-go]').forEach(a=>a.addEventListener('click',e=>{if(onHome){e.preventDefault();closeMenu(false);document.dispatchEvent(new CustomEvent('service-navigate',{detail:Number(a.dataset.menuGo)}));}}));
document.addEventListener('keydown',e=>{if(menuOpen&&e.key==='Escape'){e.preventDefault();closeMenu();}});
document.addEventListener('focusin',e=>{if(menuOpen&&!menu.contains(e.target)&&!menuToggles.includes(e.target))closeMenu(false);});

})();
