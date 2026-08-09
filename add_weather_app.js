import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const weatherBlock = `
      <div class="project-card reveal" onclick="openGallery('weather_application', 4)">
        <div class="project-video-preview" style="width: 100%; height: 200px; overflow: hidden; position: relative; border-radius: 8px 8px 0 0;">
          <video src="/images/projects/weather_application/weather.mp4" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
          <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <i class="fas fa-images"></i> 4 Images
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">Weather Application</div>
          <div class="project-desc">A beautiful weather app displaying real-time forecasts.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">REST API</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>
      
      <div class="project-card reveal">
        <div class="project-thumb"`;

html = html.replace(/<div class="project-card reveal">\s*<div class="project-thumb"/, weatherBlock);

fs.writeFileSync('index.html', html);
console.log('Added weather application project card.');
