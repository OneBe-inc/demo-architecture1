const services = [
  {name:'軽天工事',en:'LIGHT GAUGE STEEL',title:'見えないところから、空間をつくる。',body:'壁や天井の下地となる軽量鉄骨の骨組みをつくる工事です。仕上げ材を支える下地を整え、その先の内装へつなげます。',points:['壁・天井の位置と高さ','照明や設備との取り合い','使用する仕上げ材と工事範囲']},
  {name:'天井内装仕上げ',en:'CEILING FINISH',title:'見上げる景色まで、心地よく。',body:'天井の色や素材は、光の広がり方や空間の印象につながります。用途や下地の状態を踏まえて、仕上げを考えます。',points:['天井の素材と色','照明・空調との位置関係','既存の下地の状態']},
  {name:'壁張り工事',en:'WALL FINISH',title:'一枚の壁で、空間が変わる。',body:'クロスや木材などの仕上げで、壁に新しい表情を。見た目の好みと、使い方やお手入れのしやすさを合わせて検討します。',points:['色・柄・質感のイメージ','部屋の使い方','下地の状態と張り替え範囲']},
  {name:'間仕切り工事',en:'PARTITION',title:'仕切ることで、広がる使い方。',body:'動線や採光、将来の用途を考えながら、空間の分け方を整えます。必要な設備や建物の条件を確認したうえで計画します。',points:['新しい部屋の用途','人の動きと出入り口','光・空調・設備への影響']},
  {name:'防音工事',en:'ACOUSTIC',title:'静けさも、空間の品質。',body:'気になる音の種類、伝わる経路、部屋の使い方に合わせて対策を検討します。工法や得られる効果は、現場の条件によって異なります。',points:['抑えたい音の種類','音の発生場所と時間帯','建物の構造と周辺環境']},
  {name:'畳・ふすまの工事',en:'JAPANESE FINISH',title:'和の心地よさを、いまの暮らしに。',body:'畳の質感と、ふすまの表情を整える工事です。今ある状態を確認し、暮らし方や希望の雰囲気に合わせて仕上げを考えます。',points:['畳・ふすまの現在の状態','張り替えや交換の範囲','素材・色柄のイメージ']}
];
const explorer=document.querySelector('.explorer'), chapters=[...document.querySelectorAll('.chapter')], links=[...document.querySelectorAll('.service-nav a')], range=document.querySelector('.progress'), current=document.querySelector('#current'), status=document.querySelector('#status'), media=matchMedia('(max-width:899px)'), reduced=matchMedia('(prefers-reduced-motion:reduce)'), dialog=document.querySelector('#info'), content=document.querySelector('#dialog-content');
let active=0,frame=0,hashTimer,returnFocus=null,wheelSum=0,wheelLock=0,drag=null;
const offset=i=>media.matches?chapters[i].offsetTop:chapters[i].offsetLeft;
function go(i,smooth=true){i=Math.max(0,Math.min(5,i));explorer.scrollTo({[media.matches?'top':'left']:offset(i),behavior:smooth&&!reduced.matches?'smooth':'instant'});}
function setActive(i){if(i===active&&links[i].getAttribute('aria-current')==='true')return;active=i;links.forEach((a,j)=>{if(j===i)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});range.value=i;range.style.setProperty('--progress',`${i/5*100}%`);range.setAttribute('aria-valuetext',services[i].name);current.textContent=String(i+1).padStart(2,'0');status.textContent=`${i+1} / 6 ${services[i].name}`;if(media.matches){const nav=links[i].parentElement;nav.scrollTo({left:links[i].offsetLeft-nav.clientWidth/2+links[i].clientWidth/2,behavior:reduced.matches?'instant':'smooth'});}clearTimeout(hashTimer);hashTimer=setTimeout(()=>history.replaceState(null,'',`#service-${i+1}`),180);}
function nearest(){const p=media.matches?explorer.scrollTop:explorer.scrollLeft;return chapters.reduce((best,_,i)=>Math.abs(offset(i)-p)<Math.abs(offset(best)-p)?i:best,0);}
explorer.addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(()=>{frame=0;setActive(nearest());});},{passive:true});
links.forEach((a,i)=>a.addEventListener('click',e=>{e.preventDefault();go(i);}));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>go(Number(b.dataset.go))));
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>go((active+1)%6)));
document.querySelectorAll('a[href="#service-1"]:not(.service-nav a)').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();go(0);}));
range.addEventListener('input',()=>go(Number(range.value),false));
explorer.addEventListener('keydown',e=>{if(e.target!==explorer)return;const keys=media.matches?['ArrowUp','ArrowDown']:['ArrowLeft','ArrowRight'];if(e.key===keys[0]||e.key===keys[1]){e.preventDefault();go(active+(e.key===keys[0]?-1:1));}else if(e.key==='Home'||e.key==='End'){e.preventDefault();go(e.key==='Home'?0:5);}});
explorer.addEventListener('wheel',e=>{if(media.matches||e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY))return;e.preventDefault();const now=performance.now();if(now<wheelLock)return;wheelSum+=e.deltaY*(e.deltaMode===1?16:e.deltaMode===2?explorer.clientHeight:1);if(Math.abs(wheelSum)>45){go(active+Math.sign(wheelSum));wheelSum=0;wheelLock=now+650;}},{passive:false});
explorer.addEventListener('pointerdown',e=>{if(media.matches||e.pointerType!=='mouse'||e.button!==0||e.target.closest('a,button,input'))return;drag={x:e.clientX,left:explorer.scrollLeft,id:e.pointerId,moved:false};});
explorer.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;if(Math.abs(dx)>5&&!drag.moved){drag.moved=true;explorer.classList.add('dragging');explorer.setPointerCapture(e.pointerId);}if(drag.moved)explorer.scrollLeft=drag.left-dx;});
function finishDrag(){if(!drag)return;const moved=drag.moved;drag=null;explorer.classList.remove('dragging');if(moved)go(nearest());}
explorer.addEventListener('pointerup',finishDrag);explorer.addEventListener('pointercancel',finishDrag);explorer.addEventListener('lostpointercapture',finishDrag);
let resizeFrame;addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>go(active,false));});
function openDialog(html){returnFocus=document.activeElement;content.innerHTML=html;dialog.showModal();}
function closeDialog(){dialog.close();}
dialog.querySelector('.dialog-close').addEventListener('click',closeDialog);
dialog.addEventListener('click',e=>{const r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))closeDialog();});
dialog.addEventListener('close',()=>returnFocus?.focus({preventScroll:true}));
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{const s=services[Number(b.dataset.service)];openDialog(`<p class="dialog-kicker">${s.en}</p><h2>${s.name}</h2><h3>${s.title}</h3><p>${s.body}</p><h3>相談前に整理しておきたいこと</h3><ul>${s.points.map(p=>`<li>${p}</li>`).join('')}</ul><button class="detail" id="dialog-contact">ブランドについて見る <span>↗</span></button><p class="notice">デザインデモのための一般的な工事紹介です。架空ブランドのデモであり、工事の受付は行っていません。</p>`);document.querySelector('#dialog-contact').addEventListener('click',showContact);}));
function contactHTML(){return '<p class="dialog-kicker">SORANOWA INTERIOR / DESIGN DEMO</p><h2>株式会社ソラノワ内装</h2><p>壁・床・天井から、暮らしの心地よさを考える。<br>住宅内装をテーマにした架空のブランドです。</p><dl><dt>事業イメージ</dt><dd>軽天工事・天井内装仕上げ・壁張り工事・間仕切り工事・防音工事・畳、ふすまの工事</dd><dt>お問い合わせ</dt><dd>デモのため、受付は行っていません。</dd></dl><p class="notice">会社名・ブランドはこのデモのための架空設定です。実在する企業とは関係ありません。住所・電話番号・送信機能は設けていません。写真は生成画像であり、実際の施工事例ではありません。</p>';}
function showContact(){if(dialog.open)content.innerHTML=contactHTML();else openDialog(contactHTML());}
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',showContact));
document.querySelector('[data-floor]').addEventListener('click',()=>openDialog('<p class="dialog-kicker">FLOOR / MATERIAL</p><h2>暮らしを支える、床の質感。</h2><p>色や素材、足触りによって、空間の心地よさは変わります。和の仕上げについては「畳・ふすまの工事」をご覧ください。</p><button class="detail" id="floor-next">畳・ふすまの工事へ →</button><p class="notice">写真は住宅内装のイメージです。</p>'));
content.addEventListener('click',e=>{if(e.target.closest('#floor-next')){dialog.close();go(5);}});
document.querySelector('[data-menu]').addEventListener('click',()=>{openDialog(`<p class="dialog-kicker">SORANOWA INTERIOR / INDEX</p><h2>空間をつくる、6つの仕事。</h2><div class="menu-links">${services.map((s,i)=>`<button data-menu-go="${i}"><span>0${i+1}</span>${s.name}</button>`).join('')}</div>`);content.querySelectorAll('[data-menu-go]').forEach(b=>b.addEventListener('click',()=>{dialog.close();go(Number(b.dataset.menuGo));}));});
function fromHash(){const m=location.hash.match(/^#service-([1-6])$/);if(m)go(Number(m[1])-1,false);}
addEventListener('hashchange',fromHash);requestAnimationFrame(fromHash);
