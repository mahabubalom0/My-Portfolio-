

// NAV SCROLL SHRINK
window.addEventListener('scroll',()=>{
  const nav=document.querySelector('nav');
  if(window.scrollY>60){
    nav.style.padding='.5rem 2rem';
    nav.style.background='rgba(5,8,16,0.97)';
  } else {
    nav.style.padding='.75rem 2rem';
    nav.style.background='rgba(5,8,16,0.88)';
  }
});

// LOADER
function hideLoader() {
  setTimeout(()=>{
    const loader = document.getElementById('loader');
    if(loader) {
      loader.classList.add('hide');
      setTimeout(()=>loader.remove(),600);
    }
  }, 3000); // Wait 3 seconds as requested
}

if (document.readyState === 'complete') {
  hideLoader();
} else {
  window.addEventListener('load', hideLoader);
}

// PARTICLES
const canvas=document.getElementById('particles-canvas');
if(canvas) {
  const ctx=canvas.getContext('2d');
  let particles=[];
  function resize(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  class Particle{
    constructor(){
      this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;
      this.vx=(Math.random()-.5)*.4;this.vy=(Math.random()-.5)*.4;
      this.r=Math.random()*1.5+.5;this.alpha=Math.random()*.5+.1;
      this.color=Math.random()>.5?'124,58,237':'6,182,212';
    }
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(${this.color},${this.alpha})`;ctx.fill();}
    update(){
      this.x+=this.vx;this.y+=this.vy;
      if(this.x<0||this.x>canvas.width)this.vx*=-1;
      if(this.y<0||this.y>canvas.height)this.vy*=-1;
    }
  }
  for(let i=0;i<80;i++)particles.push(new Particle());
  function connect(){
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
      const d=Math.hypot(particles[i].x-particles[j].x,particles[i].y-particles[j].y);
      if(d<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(124,58,237,${.1*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
  }
  function animate(){ctx.clearRect(0,0,canvas.width,canvas.height);particles.forEach(p=>{p.update();p.draw();});connect();requestAnimationFrame(animate);}
  animate();
}

// TYPED
const texts=['Application Developer','Flutter Developer','Graphics Designer','Mobile App Developer'];
let ti=0,ci=0,del=false;
function type(){
  const el=document.getElementById('typed-text');
  if(!el)return;
  const t=texts[ti];
  if(!del){el.textContent=t.slice(0,++ci);if(ci===t.length){del=true;setTimeout(type,2000);return;}}
  else{el.textContent=t.slice(0,--ci);if(ci===0){del=false;ti=(ti+1)%texts.length;}}
  setTimeout(type,del?50:90);
}
setTimeout(type,500);

// SCROLL REVEAL
document.querySelectorAll('.skill-fill').forEach(bar=>{
  bar.setAttribute('data-width', bar.style.width || '0%');
  bar.style.width = '0%';
});

const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      e.target.querySelectorAll('.skill-fill').forEach((bar,i)=>{
        const target = bar.getAttribute('data-width') || '0%';
        setTimeout(()=>{ bar.style.width = target; }, i * 80);
      });
      revealObserver.unobserve(e.target);
    }
  });
}, {
  threshold: 0.05,
  rootMargin: '0px 0px 0px 0px'
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    setTimeout(()=>{
      document.querySelectorAll('.skill-panel.active .skill-fill').forEach((bar,i)=>{
        const target = bar.getAttribute('data-width') || '0%';
        bar.style.width = '0%';
        setTimeout(()=>{ bar.style.width = target; }, i * 60);
      });
    }, 80);
  });
});

// SKILLS TAB (Global scope for inline HTML handlers)
window.switchTab = function(name,btn){
  document.querySelectorAll('.skill-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  btn.classList.add('active');
};

// NAV MOBILE
const ham=document.getElementById('hamburger');
const menu=document.getElementById('mobileMenu');
if(ham && menu) {
  ham.addEventListener('click',()=>{ham.classList.toggle('open');menu.classList.toggle('open');});
}
window.closeMobile = function(){
  if(ham && menu) {
    ham.classList.remove('open');
    menu.classList.remove('open');
  }
};

// CONTACT
window.sendMsg = function(e){
  const btn=e.currentTarget; // use currentTarget in case click is on child icon
  btn.innerHTML='<i class="fas fa-check"></i> Sent!';
  btn.style.background='linear-gradient(135deg,#10b981,#059669)';
  setTimeout(()=>{
    btn.innerHTML='<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background='';
  },3000);
};
\n
// =========================================
// GALLERY LIGHTBOX LOGIC
// =========================================
let currentGallery = [];
let currentGalleryIndex = 0;
let currentProjectId = '';

window.openGallery = function(projectId, totalImages) {
  currentProjectId = projectId;
  // Create an array of image paths for the project
  currentGallery = Array.from({length: totalImages}, (_, i) => `/images/projects/${projectId}/${i+1}.jpg`);
  currentGalleryIndex = 0;
  
  const modal = document.getElementById('galleryModal');
  if(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent scrolling behind modal
    updateGalleryImage();
  }
};

window.closeGallery = function() {
  const modal = document.getElementById('galleryModal');
  if(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
};

window.changeGalleryImage = function(direction) {
  currentGalleryIndex += direction;
  if (currentGalleryIndex >= currentGallery.length) {
    currentGalleryIndex = 0;
  } else if (currentGalleryIndex < 0) {
    currentGalleryIndex = currentGallery.length - 1;
  }
  updateGalleryImage();
};

function updateGalleryImage() {
  const img = document.getElementById('galleryMainImage');
  const counter = document.getElementById('galleryCounter');
  const content = document.getElementById('galleryContent');
  
  if(!img || !counter || !content) return;

  img.classList.remove('loaded');
  content.classList.add('loading');
  
  img.onload = function() {
    img.classList.add('loaded');
    content.classList.remove('loading');
  };
  
  img.onerror = function() {
    // Fallback if image hasn't been added yet by the user
    img.src = `https://via.placeholder.com/800x600/1e293b/ffffff?text=${currentProjectId}+-+(Image+${currentGalleryIndex+1}+Not+Found)`;
  };
  
  img.src = currentGallery[currentGalleryIndex];
  counter.innerText = `${currentGalleryIndex + 1} / ${currentGallery.length}`;
}

// Close modal on escape key or clicking outside
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeGallery();
  if(e.key === 'ArrowRight') changeGalleryImage(1);
  if(e.key === 'ArrowLeft') changeGalleryImage(-1);
});

document.addEventListener('click', (e) => {
  const modal = document.getElementById('galleryModal');
  if(e.target === modal) {
    closeGallery();
  }
});
