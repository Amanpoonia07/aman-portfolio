const theme=document.getElementById('theme');
const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
const progress=document.getElementById('progress');
const sections=[...document.querySelectorAll('main section')];
const links=[...document.querySelectorAll('.links a')];

theme.addEventListener('click',()=>{document.body.classList.toggle('light');theme.textContent=document.body.classList.contains('light')?'☀':'☾';});
menuBtn.addEventListener('click',()=>navLinks.classList.toggle('open'));
links.forEach(a=>a.addEventListener('click',()=>navLinks.classList.remove('open')));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add('show');});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
    }
  });
},{rootMargin:'-40% 0px -55% 0px'});
sections.forEach(sectionObserver.observe);

window.addEventListener('scroll',()=>{
  const h=document.documentElement;
  const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
  progress.style.width=Math.min(100,p)+'%';
});

const modal=document.getElementById('certModal');
const modalImage=document.getElementById('modalImage');
const modalTitle=document.getElementById('modalTitle');
const modalClose=document.getElementById('modalClose');
document.querySelectorAll('.cert[data-image]').forEach(card=>{
  card.addEventListener('click',()=>{
    modalImage.src=card.dataset.image;
    modalTitle.textContent=card.dataset.title;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });
});
function closeModal(){modal.classList.remove('show');modal.setAttribute('aria-hidden','true');modalImage.src='';}
modalClose.addEventListener('click',closeModal);
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});