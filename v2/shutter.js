/* shop shutter: shutterDown(then) rolls it down and calls then(); shutterUp(then) rolls it up on arrival */
(()=>{
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const logo=document.currentScript&&document.currentScript.dataset.logo||'../images/about-page/logo.png';
const el=document.createElement('div');el.className='shutter';el.setAttribute('aria-hidden','true');
el.innerHTML='<div class="sh-box"><i></i><i></i><i></i><i></i></div><span class="sh-rail l"></span><span class="sh-rail r"></span>'+
  '<div class="sh-door"><img class="sh-logo" src="'+logo+'" alt=""><div class="sh-bar"><span class="lk"></span><span class="hd"></span><span class="lk"></span></div></div>';
const mount=()=>document.body.prepend(el);
document.body?mount():document.addEventListener('DOMContentLoaded',mount);
const door=()=>el.querySelector('.sh-door');
window.shutterDown=then=>{
  if(RM){then&&then();return}
  el.classList.add('on');
  /* falls with gravity, lands, and settles with a small rebound like a real roller shutter */
  const a=door().animate([{transform:'translateY(-101%)',easing:'cubic-bezier(.55,0,.85,.4)'},{transform:'translateY(0)',offset:.82,easing:'cubic-bezier(.2,.6,.4,1)'},
    {transform:'translateY(-1.6%)',offset:.91,easing:'cubic-bezier(.5,0,.7,.4)'},{transform:'translateY(0)'}],{duration:1250,delay:120,fill:'both'});
  a.onfinish=()=>setTimeout(()=>then&&then(),320);
};
window.shutterUp=then=>{
  const root=document.documentElement;
  if(RM||!root.classList.contains('arrive')){then&&then();return}
  el.classList.add('on');root.classList.remove('arrive');
  /* a short tug down, then it rolls up into the housing, quick at first and easing in at the top */
  const a=door().animate([{transform:'translateY(0)',easing:'cubic-bezier(.4,0,.6,1)'},{transform:'translateY(1.2%)',offset:.12,easing:'cubic-bezier(.45,0,.2,1)'},{transform:'translateY(-101%)'}],
    {duration:1500,delay:350,fill:'both'});
  a.onfinish=()=>{el.classList.remove('on');then&&then()};
};
addEventListener('pageshow',e=>{if(e.persisted){el.classList.remove('on');door().getAnimations().forEach(a=>a.cancel())}});
})();
