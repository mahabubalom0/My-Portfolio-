

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
  }, 1000); // Reduced to 1 second
}

// Call it directly since type="module" runs after DOM parse
hideLoader();

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
  
  class Shape{
    constructor(){
      this.x=Math.random()*canvas.width;this.y=Math.random()*canvas.height;
      this.vx=(Math.random()-.5)*.2;this.vy=(Math.random()-.5)*.2;
      this.size=Math.random()*50+20;
      this.alpha=Math.random()*.15+.05;
      this.color=Math.random()>.5?'124,58,237':'6,182,212';
      this.type=Math.floor(Math.random()*3); // 0: rect, 1: hollow circle, 2: line
      this.angle=Math.random()*Math.PI*2;
      this.vAngle=(Math.random()-.5)*.01;
    }
    draw(){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.angle);
      ctx.strokeStyle=`rgba(${this.color},${this.alpha})`;
      ctx.lineWidth=1.5;
      if(this.type===0){
        ctx.strokeRect(-this.size/2,-this.size/2,this.size,this.size);
      }else if(this.type===1){
        ctx.beginPath();ctx.arc(0,0,this.size/2,0,Math.PI*2);ctx.stroke();
      }else if(this.type===2){
        ctx.beginPath();ctx.moveTo(-this.size,0);ctx.lineTo(this.size,0);ctx.stroke();
      }
      ctx.restore();
    }
    update(){
      this.x+=this.vx;this.y+=this.vy;this.angle+=this.vAngle;
      if(this.x<-100)this.x=canvas.width+100;
      if(this.x>canvas.width+100)this.x=-100;
      if(this.y<-100)this.y=canvas.height+100;
      if(this.y>canvas.height+100)this.y=-100;
    }
  }

  let shapes=[];
  for(let i=0;i<80;i++)particles.push(new Particle());
  for(let i=0;i<15;i++)shapes.push(new Shape());

  // WEATHER SYSTEM
  let weatherState = 0; // 0: clear/sun, 1: clouds, 2: rain
  let weatherTimer = 0;
  const WEATHER_DURATION = 600; 
  const WEATHER_FADE = 100;

  class RainDrop {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = (Math.random() * 50) + (canvas.height * 0.4);
      this.length = Math.random() * 20 + 10;
      this.speed = Math.random() * 10 + 10;
      this.alpha = Math.random() * 0.3 + 0.1;
    }
    draw(globalAlpha) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x - this.length * 0.2, this.y + this.length);
      ctx.strokeStyle = `rgba(124, 212, 255, ${this.alpha * globalAlpha})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    update() {
      this.y += this.speed;
      this.x -= this.speed * 0.2;
      if (this.y > canvas.height) this.reset();
    }
  }

  class Cloud {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * (canvas.height * 0.5);
      this.size = Math.random() * 40 + 30;
      this.speed = Math.random() * 0.3 + 0.1;
      this.alpha = Math.random() * 0.08 + 0.03;
    }
    draw(globalAlpha) {
      ctx.save();
      ctx.shadowColor = `rgba(255, 255, 255, ${this.alpha * globalAlpha})`;
      ctx.shadowBlur = 20;
      ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * globalAlpha})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.arc(this.x + this.size * 0.9, this.y - this.size * 0.5, this.size * 1.2, 0, Math.PI * 2);
      ctx.arc(this.x + this.size * 2.1, this.y - this.size * 0.2, this.size * 0.9, 0, Math.PI * 2);
      ctx.arc(this.x + this.size * 2.7, this.y + this.size * 0.3, this.size * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    update() {
      this.x += this.speed;
      if (this.x - this.size * 3 > canvas.width) {
        this.x = -this.size * 3;
        this.y = Math.random() * (canvas.height * 0.5);
      }
    }
  }

  class Sun {
    constructor() {
      this.angle = 0;
    }
    draw(globalAlpha) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      
      let coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, canvas.height * 0.5);
      coreGrad.addColorStop(0, `rgba(255, 200, 50, ${0.15 * globalAlpha})`);
      coreGrad.addColorStop(0.3, `rgba(255, 150, 0, ${0.05 * globalAlpha})`);
      coreGrad.addColorStop(1, `rgba(255, 150, 0, 0)`);
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(0, 0, canvas.height * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.rotate(this.angle);
      const numRays = 12;
      for (let i = 0; i < numRays; i++) {
        ctx.rotate((Math.PI * 2) / numRays);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const dist = Math.max(canvas.width, canvas.height);
        ctx.lineTo(dist * 0.15, dist);
        ctx.lineTo(-dist * 0.15, dist);
        
        let rayGrad = ctx.createLinearGradient(0, 0, 0, dist);
        rayGrad.addColorStop(0, `rgba(255, 220, 100, ${0.04 * globalAlpha})`);
        rayGrad.addColorStop(1, `rgba(255, 200, 50, 0)`);
        ctx.fillStyle = rayGrad;
        ctx.fill();
      }
      ctx.restore();
    }
    update() {
      this.angle += 0.001; 
    }
  }

  let raindrops = [];
  for(let i=0; i<150; i++) raindrops.push(new RainDrop());
  let clouds = [];
  for(let i=0; i<12; i++) clouds.push(new Cloud());
  let suns = [new Sun()];

  class House {
    constructor() {
      this.width = 100;
      this.height = 100;
    }
    draw(globalAlpha) {
      const x = canvas.width - this.width - 50;
      const y = canvas.height - this.height; 
      ctx.save();
      ctx.shadowColor = `rgba(6, 182, 212, ${globalAlpha})`;
      ctx.shadowBlur = 15;
      ctx.strokeStyle = `rgba(6, 182, 212, ${globalAlpha})`;
      ctx.lineWidth = 3;
      
      ctx.beginPath();
      // Body
      ctx.rect(x, y, this.width, this.height);
      // Roof
      ctx.moveTo(x - 20, y);
      ctx.lineTo(x + this.width / 2, y - 60);
      ctx.lineTo(x + this.width + 20, y);
      // Door
      const doorW = 30;
      const doorH = 50;
      ctx.rect(x + this.width/2 - doorW/2, y + this.height - doorH, doorW, doorH);
      ctx.stroke();
      ctx.restore();
    }
  }

  class Mosque {
    constructor() {
      this.x = 30;
    }
    draw() {
      const y = canvas.height - 10;
      ctx.save();
      ctx.font = '100px Arial';
      ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
      ctx.shadowBlur = 20;
      ctx.fillText('🕌', this.x, y);
      ctx.restore();
    }
  }

  class ProgrammerRoom {
    constructor() {
      this.width = 140;
      this.height = 110;
      this.x = canvas.width - 340;
      this.y = canvas.height - this.height;
    }
    draw(programmerState) {
      ctx.save();
      // Room glow
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.4)'; 
      ctx.shadowColor = 'rgba(236, 72, 153, 0.4)';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
      
      // Desk
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)'; 
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(this.x + 30, this.y + 70);
      ctx.lineTo(this.x + 120, this.y + 70);
      ctx.moveTo(this.x + 40, this.y + 70);
      ctx.lineTo(this.x + 40, this.y + 110);
      ctx.moveTo(this.x + 110, this.y + 70);
      ctx.lineTo(this.x + 110, this.y + 110);
      ctx.stroke();

      // Chair
      ctx.strokeStyle = 'rgba(124, 58, 237, 0.8)';
      ctx.shadowColor = 'rgba(124, 58, 237, 0.8)';
      ctx.beginPath();
      ctx.moveTo(this.x + 20, canvas.height - 10);
      ctx.lineTo(this.x + 20, canvas.height - 50);
      ctx.moveTo(this.x + 20, canvas.height - 30);
      ctx.lineTo(this.x + 40, canvas.height - 30);
      ctx.moveTo(this.x + 40, canvas.height - 30);
      ctx.lineTo(this.x + 40, canvas.height - 10);
      ctx.stroke();

      // Laptop (left behind if away)
      if (programmerState !== 0) {
        ctx.font = '35px Arial';
        ctx.shadowBlur = 0;
        ctx.fillText('💻', this.x + 60, this.y + 68);
      }
      ctx.restore();
    }
  }

  class Programmer {
    constructor(room, mosque) {
      this.room = room;
      this.mosque = mosque;
      this.x = room.x + 20; 
      this.state = 0; // 0=typing, 1=walk to mosque, 2=praying, 3=walk back
      this.walkTimer = 0;
    }
    draw() {
      ctx.save();
      ctx.font = '60px Arial';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
      ctx.shadowBlur = 10;
      const y = canvas.height - 25; 
      
      if (this.state === 0) {
        ctx.fillText('👨‍💻', this.room.x + 15, y);
      } else if (this.state === 2) {
        ctx.fillText('🧎‍♂️', this.mosque.x + 80, y); 
      } else {
        const bob = Math.abs(Math.sin(this.walkTimer) * 8);
        const tilt = Math.cos(this.walkTimer) * 0.15;
        if (this.state === 1) {
          ctx.translate(this.x + 60, y - bob);
          ctx.scale(-1, 1);
          ctx.rotate(tilt);
          ctx.fillText('🚶‍♂️', 0, 0);
          if (weatherState === 2) {
            ctx.font = '50px Arial';
            ctx.fillText('☔', -10, -50);
          }
        } else if (this.state === 3) {
          ctx.translate(this.x, y - bob);
          ctx.rotate(tilt);
          ctx.fillText('🚶‍♂️', 0, 0);
          if (weatherState === 2) {
            ctx.font = '50px Arial';
            ctx.fillText('☔', -10, -50);
          }
        }
      }
      ctx.restore();
    }
    update(azanActive) {
      if (azanActive && this.state === 0) {
        this.state = 1; 
        this.x = this.room.x + 20;
      }
      
      if (this.state === 1) {
        this.x -= 2; 
        this.walkTimer += 0.15;
        if (this.x <= this.mosque.x + 100) {
          this.state = 2;
        }
      } else if (this.state === 2) {
        if (!azanActive) {
          this.state = 3; 
        }
      } else if (this.state === 3) {
        this.x += 2; 
        this.walkTimer += 0.15;
        if (this.x >= this.room.x + 20) {
          this.state = 0; 
        }
      }
    }
  }

  class Person {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = -Math.random() * 500 - 50; 
      this.y = canvas.height - 25; 
      this.speed = Math.random() * 2 + 2;
      this.legAngle = 0;
      this.active = true;
      this.state = 0; // 0: running, 1: catching rain, 2: playing
      this.willPlay = false; // no longer playing outside
      this.playTimer = 0;
      this.jumpY = 0;
      this.playDirection = -1;
    }
    draw(globalAlpha) {
      if (!this.active) return;
      ctx.save();
      ctx.strokeStyle = `rgba(168, 85, 247, ${globalAlpha})`;
      ctx.shadowColor = `rgba(168, 85, 247, ${globalAlpha})`;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      
      const drawY = this.y - this.jumpY;
      const headY = drawY - 35;
      
      ctx.beginPath();
      ctx.arc(this.x, headY, 5, 0, Math.PI * 2);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(this.x, headY + 5);
      ctx.lineTo(this.x + 5, drawY - 15);
      ctx.stroke();

      if (this.state === 1) {
        // Arms catching rain
        ctx.beginPath();
        ctx.moveTo(this.x + 2, headY + 10);
        ctx.lineTo(this.x - 10, headY - 5);
        ctx.moveTo(this.x + 2, headY + 10);
        ctx.lineTo(this.x + 15, headY - 5);
        ctx.stroke();
      } else {
        // Arms swinging
        const armSwing = Math.sin(this.legAngle) * 8;
        ctx.beginPath();
        ctx.moveTo(this.x + 2, headY + 10);
        ctx.lineTo(this.x + 5 + armSwing, drawY - 20);
        ctx.moveTo(this.x + 2, headY + 10);
        ctx.lineTo(this.x + 5 - armSwing, drawY - 20);
        ctx.stroke();
      }

      if (this.state === 1) {
        // Standing legs
        ctx.beginPath();
        ctx.moveTo(this.x + 5, drawY - 15);
        ctx.lineTo(this.x - 2, drawY);
        ctx.moveTo(this.x + 5, drawY - 15);
        ctx.lineTo(this.x + 12, drawY);
        ctx.stroke();
      } else {
        // Running legs
        const legSwing = Math.sin(this.legAngle) * 12;
        const legLift = Math.cos(this.legAngle) * 4;
        ctx.beginPath();
        ctx.moveTo(this.x + 5, drawY - 15);
        ctx.lineTo(this.x + legSwing, drawY - (legSwing > 0 ? legLift : 0));
        ctx.moveTo(this.x + 5, drawY - 15);
        ctx.lineTo(this.x - legSwing, drawY - (legSwing < 0 ? legLift : 0));
        ctx.stroke();
      }
      ctx.restore();
    }
    update(houseX) {
      if (!this.active) return;
      if (this.state === 0) {
        this.x += this.speed;
        this.legAngle += this.speed * 0.15;
        if (this.x > houseX - Math.random() * 30) {
          this.state = 1;
        }
      } else if (this.state === 1) {
        if (this.willPlay) {
          this.playTimer++;
          if (this.playTimer > 100 + Math.random() * 200) {
            this.state = 2;
          }
        }
      } else if (this.state === 2) {
        this.x += this.speed * this.playDirection * 0.7;
        this.legAngle += this.speed * 0.15;
        if (Math.random() < 0.03 && this.jumpY === 0) this.jumpY = 25;
        if (this.jumpY > 0) this.jumpY -= 1.5;
        if (this.jumpY < 0) this.jumpY = 0;
        
        if (this.x < houseX - 250) this.playDirection = 1;
        if (this.x > houseX - 50) this.playDirection = -1;
      }
    }
  }

  let house = new House();
  let mosque = new Mosque();
  let progRoom = new ProgrammerRoom();
  let programmer = new Programmer(progRoom, mosque);
  let people = [];
  for(let i=0; i<5; i++) people.push(new Person());

  let azanTimer = 0;
  const AZAN_INTERVAL = 1200; // Works in room for 20s
  const AZAN_DURATION = 1200; // Stays at mosque for 20s
  let isAzan = false;
  
  // Audio for Azan (uses HTML element for reliability)
  const azanAudio = document.getElementById('azanAudioPlayer');

  function connect(){
    for(let i=0;i<particles.length;i++)for(let j=i+1;j<particles.length;j++){
      const d=Math.hypot(particles[i].x-particles[j].x,particles[i].y-particles[j].y);
      if(d<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle=`rgba(124,58,237,${.1*(1-d/120)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
  }
  
  function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Weather State Logic
    weatherTimer++;
    const currentDuration = weatherState === 2 ? 1500 : 600; // Rain lasts 25s, others 10s
    if (weatherTimer > currentDuration) {
      weatherTimer = 0;
      weatherState = (weatherState + 1) % 3;
      if (weatherState === 0) {
        people.forEach(p => p.reset()); // Reset people when rain ends
      }
    }

    let sunAlpha = 0, cloudAlpha = 0, rainAlpha = 0;
    function getAlpha(targetState) {
      if (weatherState === targetState) {
        return Math.min(1, weatherTimer / WEATHER_FADE);
      } else if ((weatherState === (targetState + 1) % 3)) {
        return Math.max(0, 1 - (weatherTimer / WEATHER_FADE));
      }
      return 0;
    }

    sunAlpha = getAlpha(0);
    cloudAlpha = getAlpha(1);
    rainAlpha = getAlpha(2);

    // When raining (state 2), clouds persist
    if (weatherState === 1 || weatherState === 2) {
      if (weatherState === 1 && weatherTimer <= WEATHER_FADE) {
        cloudAlpha = Math.min(1, weatherTimer / WEATHER_FADE);
      } else {
        cloudAlpha = 1;
      }
    } else if (weatherState === 0 && weatherTimer <= WEATHER_FADE) {
      cloudAlpha = Math.max(0, 1 - (weatherTimer / WEATHER_FADE));
    }

    if (sunAlpha > 0) {
      suns.forEach(r => { r.update(); r.draw(sunAlpha); });
    }
    // Azan Logic
    azanTimer++;
    let shouldPray = false;
    
    if (azanTimer > AZAN_INTERVAL) {
      if (!isAzan) {
        isAzan = true;
        azanAudio.volume = 0.2; // Low volume always
        azanAudio.currentTime = 0;
        azanAudio.play().catch(e => console.log("Audio play blocked. User must interact (click) the page first."));
      }
      
      // Stop the audio after exactly 10 seconds (600 frames)
      if (azanTimer === AZAN_INTERVAL + 600) {
        azanAudio.pause();
      }
      
      // Starts praying (walking) 2 seconds after Azan starts (120 frames)
      if (azanTimer > AZAN_INTERVAL + 120) {
        shouldPray = true;
      }
      
      if (azanTimer > AZAN_INTERVAL + AZAN_DURATION) {
        isAzan = false;
        shouldPray = false;
        azanTimer = 0;
      }
    }

    // Always draw mosque, programmer room, and programmer
    mosque.draw();
    progRoom.draw(programmer.state);
    programmer.update(shouldPray);
    programmer.draw();

    if (rainAlpha > 0) {
      raindrops.forEach(r => { r.update(); r.draw(rainAlpha); });
      house.draw(rainAlpha);
      const doorX = canvas.width - house.width/2 - 40;
      people.forEach(p => { 
        if (!p.active && rainAlpha > 0.8 && Math.random() < 0.01) p.reset();
        p.update(doorX); 
        p.draw(rainAlpha); 
      });
    }
    if (cloudAlpha > 0) {
      clouds.forEach(c => { c.update(); c.draw(cloudAlpha); });
    }

    shapes.forEach(s=>{s.update();s.draw();});
    particles.forEach(p=>{p.update();p.draw();});
    connect();
    requestAnimationFrame(animate);
  }
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

// =========================================
// GALLERY LIGHTBOX LOGIC
// =========================================
let currentGallery = [];
let currentGalleryIndex = 0;
let currentProjectId = '';

window.openGallery = function(projectId, totalImages, videoUrl) {
  currentProjectId = projectId;
  // Create an array of image paths for the project
  currentGallery = Array.from({length: totalImages}, (_, i) => `/images/projects/${projectId}/${i+1}.jpg`);
  
  if (videoUrl) {
    currentGallery.push(videoUrl);
  }
  
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
  const videoEl = document.getElementById('galleryMainVideo');
  if(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  if (videoEl) {
    videoEl.pause();
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
  const videoEl = document.getElementById('galleryMainVideo');
  const counter = document.getElementById('galleryCounter');
  const content = document.getElementById('galleryContent');
  
  if(!img || !counter || !content) return;

  const currentSrc = currentGallery[currentGalleryIndex];
  const isVideo = currentSrc && currentSrc.endsWith('.mp4');

  if (isVideo) {
    img.style.display = 'none';
    if (videoEl) {
      videoEl.style.display = 'block';
      videoEl.src = currentSrc;
      videoEl.play().catch(e => console.log('Video play prevented:', e));
    }
    content.classList.remove('loading');
  } else {
    if (videoEl) {
      videoEl.style.display = 'none';
      videoEl.pause();
    }
    img.style.display = 'block';
    
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
    
    img.src = currentSrc;
  }
  
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
