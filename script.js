(function(){
var R=document.documentElement,fs=1.1,K='vc_',$=function(i){return document.getElementById(i)};
function sv(k,v){try{localStorage.setItem(K+k,v)}catch(e){}}
function ld(k){try{return localStorage.getItem(K+k)}catch(e){return null}}
function setFs(v){fs=Math.min(2.2,Math.max(.9,v));R.style.setProperty('--fs',fs+'rem');R.style.setProperty('--k',fs/1.1);sv('fs',fs)}
$('inc').onclick=function(){setFs(fs+.15)};$('dec').onclick=function(){setFs(fs-.15)};
var tb=document.querySelectorAll('[data-t]');
function setT(t){if(t==='dark')R.removeAttribute('data-theme');else R.setAttribute('data-theme',t);tb.forEach(function(b){b.setAttribute('aria-pressed',b.dataset.t===t)});sv('t',t)}
tb.forEach(function(b){b.onclick=function(){setT(b.dataset.t)}});
function tog(id,fn,key){var b=$(id);b.onclick=function(){var on=b.getAttribute('aria-pressed')!=='true';b.setAttribute('aria-pressed',on);fn(on);sv(key,on?1:0)};return function(on){b.setAttribute('aria-pressed',on);fn(on)}}
var setSp=tog('sp',function(on){R.style.setProperty('--ls',on?'.06em':'0');R.style.setProperty('--lh',on?'2':'1.65')},'sp');
var setAn=tog('an',function(on){R.classList.toggle('noanim',!on)},'an');
var setCu=tog('cu',function(on){R.classList.toggle('bigcur',on)},'cu');
var S=window.speechSynthesis,tts=$('tts'),rt=$('rt'),vs=$('vs'),vl=[],Q=[],qi=0,tok=0,paused=false,hl=null;
function sc(v){var n=v.name.toLowerCase();return(/natural|neural|online|google|microsoft|luciana|francisca|thalita|antonio/.test(n)?2:0)+(/br/i.test(v.lang)?1:0)}
function lv(){if(!S)return;vl=S.getVoices().filter(function(v){return/^pt/i.test(v.lang)}).sort(function(a,b){return sc(b)-sc(a)});vs.innerHTML='';vl.forEach(function(v,i){var o=document.createElement('option');o.value=i;o.textContent=v.name;vs.appendChild(o)});var s=ld('vo');if(s)vl.forEach(function(v,i){if(v.name===s)vs.value=i})}
if(S){lv();S.onvoiceschanged=lv}
var r0=ld('rt');if(r0)rt.value=r0;rt.onchange=function(){sv('rt',rt.value)};vs.onchange=function(){if(vl[vs.value])sv('vo',vl[vs.value].name)};
function build(){Q=[];document.querySelectorAll('#main h2,#main h3,#main p,#main li,#main summary,#main dt,#main dd').forEach(function(e){var t=e.innerText.replace(/\s+/g,' ').trim();if(!t)return;(t.match(/[^.!?]+[.!?]*/g)||[t]).forEach(function(x){x=x.trim();if(!x)return;var l=Q[Q.length-1];if(l&&l.e===e&&l.t.length+x.length<220)l.t+=' '+x;else Q.push({e:e,t:x})})})}
function say(){if(qi>=Q.length){stop();return}var it=Q[qi],my=tok,u=new SpeechSynthesisUtterance(it.t);u.lang='pt-BR';u.rate=parseFloat(rt.value);if(vl[vs.value])u.voice=vl[vs.value];u.onend=u.onerror=function(){if(my===tok){qi++;say()}};if(hl)hl.classList.remove('now');hl=it.e;hl.classList.add('now');hl.scrollIntoView({block:'center',behavior:'smooth'});S.speak(u)}
function stop(){tok++;if(S)S.cancel();qi=0;paused=false;if(hl)hl.classList.remove('now');tts.setAttribute('aria-pressed','false')}
tts.onclick=function(){if(!S){alert('Seu navegador não tem leitura em voz alta.');return}stop();build();tts.setAttribute('aria-pressed','true');setTimeout(say,150)};
$('tx').onclick=stop;
$('tp').onclick=function(){if(!S||!Q.length)return;if(paused){paused=false;setTimeout(say,150)}else if(tts.getAttribute('aria-pressed')==='true'){paused=true;tok++;S.cancel()}};
var fonts=[['Padrão','Tahoma,Verdana,sans-serif'],['Arial','Arial,Helvetica,sans-serif'],['Comic Sans','"Comic Sans MS","Comic Neue",sans-serif'],['Pixel','"Pixelify Sans","MS Sans Serif",Tahoma,sans-serif'],['Atkinson','"Atkinson Hyperlegible",Verdana,sans-serif']],fi=0,ft=$('ft');
function setF(i){fi=i;R.classList.toggle('pixfont',i===3);R.classList.toggle('cf',i>0);document.body.style.fontFamily=i?fonts[i][1]:'';ft.textContent='Fonte: '+fonts[i][0];sv('ft',i)}
ft.onclick=function(){setF((fi+1)%5)};
var rb=document.createElement('div');rb.className='ruler';rb.hidden=true;document.body.appendChild(rb);
function mv(y){rb.style.top=(y-28)+'px'}
addEventListener('mousemove',function(e){if(!rb.hidden)mv(e.clientY)});
addEventListener('touchmove',function(e){if(!rb.hidden)mv(e.touches[0].clientY)},{passive:true});
$('rl').onclick=function(){var on=rb.hidden;rb.hidden=!on;this.setAttribute('aria-pressed',on);if(on)mv(innerHeight/2)};
$('rs').onclick=function(){try{localStorage.clear()}catch(e){}location.reload()};
var e1=$('e1'),e2=$('e2'),ey=$('eyes');e2.innerHTML=e1.outerHTML.replace(' id="e1"','');
function setG(on){ey.setAttribute('aria-pressed',on);sv('gl',on?1:0)}
ey.onclick=function(){setG(ey.getAttribute('aria-pressed')!=='true')};
if(ld('gl')==='1')setG(true);
var qk='',qs=0;
function go(){var v=$('q').value.trim().toLowerCase(),r=$('qr');if(!v)return;if(v!==qk){qk=v;qs=0}
var m=Array.prototype.filter.call(document.querySelectorAll('#main h2,#main h3,#main summary,#main li,#main p,#main dt,#main dd'),function(e){return e.textContent.toLowerCase().indexOf(v)>-1});
if(!m.length){r.textContent='Nada encontrado para “'+$('q').value+'”.';return}
var h=m[qs%m.length];r.textContent='Resultado '+(qs%m.length+1)+' de '+m.length+'. Clique em Busca para ver o próximo.';qs++;
var d=h.closest('details');if(d)d.open=true;h.scrollIntoView({block:'center',behavior:'smooth'});h.classList.add('now');setTimeout(function(){h.classList.remove('now')},3500)}
$('qb').onclick=go;$('q').onkeydown=function(e){if(e.key==='Enter')go()};
var vn=(parseInt(ld('vc'))||0)+1;sv('vc',vn);$('vc').textContent=('0000'+vn).slice(-4);
var cb=document.querySelectorAll('#cl input');
function upd(){var n=0;cb.forEach(function(c){if(c.checked)n++});var p=Math.round(n/cb.length*100);$('pf').style.width=p+'%';$('pb').setAttribute('aria-valuenow',p);$('pt').textContent=n+' de '+cb.length+' hábitos marcados.';sv('cl',Array.prototype.map.call(cb,function(c){return c.checked?1:0}).join(''))}
cb.forEach(function(c){c.onchange=upd});
var f=parseFloat(ld('fs'));if(f)setFs(f);
var tCX=$('ctx'),tCB=$('cbg'),crE=$('cr');
function lum(h){var c=[1,3,5].map(function(i){var v=parseInt(h.substr(i,2),16)/255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)});return .2126*c[0]+.7152*c[1]+.0722*c[2]}
function applyC(){R.style.setProperty('--ctx',tCX.value);R.style.setProperty('--cbg',tCB.value);var a=lum(tCX.value),b=lum(tCB.value),r=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);crE.textContent='Contraste '+r.toFixed(1)+':1 '+(r>=7?'(ótimo)':r>=4.5?'(bom)':'(fraco, tente outras cores)');sv('cx',tCX.value);sv('cb',tCB.value)}
var cx0=ld('cx'),cb0=ld('cb');if(cx0)tCX.value=cx0;if(cb0)tCB.value=cb0;applyC();
tCX.oninput=tCB.oninput=function(){applyC();setT('custom')};
$('yb').onclick=function(){tCX.value='#ffff00';tCB.value='#00008b';applyC();setT('custom')};
[['bd','bold'],['ws','wsp'],['nr','narrow'],['bb','bigbtn'],['sm','simple'],['gr','f-gr'],['iv','f-iv']].forEach(function(a){var k='x'+a[1],set=tog(a[0],function(on){R.classList.toggle(a[1],on)},k);if(ld(k)==='1')set(true)});
var wmE=document.createElement('div');wmE.className='warm';wmE.hidden=true;wmE.setAttribute('aria-hidden','true');document.body.appendChild(wmE);
var setWm=tog('wm',function(on){wmE.hidden=!on},'xwm');if(ld('xwm')==='1')setWm(true);
var lb=document.createElement('div');lb.className='lupa';lb.hidden=true;lb.setAttribute('aria-hidden','true');document.body.appendChild(lb);var lpOn=false;
var setLp=tog('lp',function(on){lpOn=on;if(!on)lb.hidden=true},'xlp');if(ld('xlp')==='1')setLp(true);
function lz(x,y){if(!lpOn)return;var n,o,p;if(document.caretPositionFromPoint){p=document.caretPositionFromPoint(x,y);if(p){n=p.offsetNode;o=p.offset}}else if(document.caretRangeFromPoint){p=document.caretRangeFromPoint(x,y);if(p){n=p.startContainer;o=p.startOffset}}
if(!n||n.nodeType!==3||!n.textContent.trim()){lb.hidden=true;return}
var t=n.textContent,a=Math.max(0,o-18),b=Math.min(t.length,o+26),m=document.createElement('mark');m.textContent=t.slice(o,o+1);lb.textContent='';lb.appendChild(document.createTextNode(t.slice(a,o)));lb.appendChild(m);lb.appendChild(document.createTextNode(t.slice(o+1,b)));
lb.hidden=false;var w=lb.offsetWidth,h=lb.offsetHeight;lb.style.left=Math.max(8,Math.min(x+18,innerWidth-w-8))+'px';lb.style.top=Math.max(8,(y+24+h>innerHeight)?y-h-18:y+24)+'px'}
addEventListener('mousemove',function(e){lz(e.clientX,e.clientY)});addEventListener('touchmove',function(e){lz(e.touches[0].clientX,e.touches[0].clientY)},{passive:true});
addEventListener('keydown',function(e){if(e.ctrlKey||e.metaKey||e.altKey||/INPUT|SELECT|TEXTAREA/.test(e.target.tagName))return;var k=e.key;
if(k==='+'||k==='=')setFs(fs+.15);else if(k==='-'||k==='_')setFs(fs-.15);else if(k==='t'||k==='T'){var th=['dark','light','contrast'],cu=R.getAttribute('data-theme')||'dark';setT(th[(th.indexOf(cu)+1)%3])}else if(k==='s'||k==='S')$('sm').click();else if(k==='m'||k==='M')$('lp').click()});
$('pr').onclick=function(){document.querySelectorAll('details.f').forEach(function(d){d.open=true});window.print()};
var t=ld('t')||((matchMedia('(prefers-color-scheme: light)').matches)?'light':'dark');setT(t);
if(ld('sp')==='1')setSp(true);var f0=parseInt(ld('ft'));if(f0)setF(f0);if(ld('cu')==='1')setCu(true);
var mq=matchMedia('(min-width:1024px)'),tg=$('tgl');
function setTl(on){R.classList.toggle('tools-off',!on);tg.setAttribute('aria-expanded',on);sv('tl',on?1:0)}
tg.onclick=function(){setTl(R.classList.contains('tools-off'))};
addEventListener('keydown',function(e){if(e.key==='Escape'&&mq.matches&&!R.classList.contains('tools-off')){setTl(false);tg.focus()}});
function lay(){$('tbx').open=mq.matches}
lay();if(mq.addEventListener)mq.addEventListener('change',lay);else mq.addListener(lay);
setTl(ld('tl')==='1');
if(ld('an')==='0'||matchMedia('(prefers-reduced-motion: reduce)').matches)setAn(false);
var c=ld('cl');if(c)cb.forEach(function(x,i){x.checked=c[i]==='1'});upd();
})();
