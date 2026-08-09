import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');

const projects = [
  {
    id: 'dino_didi',
    count: 7,
    video: 'dino didi.mp4'
  },
  {
    id: 'expense_tracker',
    count: 27,
    video: 'video.mp4'
  },
  {
    id: 'smart_banking',
    count: 22,
    video: 'smart banking.mp4'
  },
  {
    id: 'news_app',
    count: 7,
    video: 'news app video.mp4'
  }
];

projects.forEach(p => {
  // Replace the onclick handler
  const regexOnclick = new RegExp(`onclick="openGallery\\('${p.id}', \\d+\\)"`, 'g');
  html = html.replace(regexOnclick, `onclick="openGallery('${p.id}', ${p.count})"`);

  // Define the new video preview HTML
  const videoPreview = `<div class="project-video-preview" style="width: 100%; height: 200px; overflow: hidden; position: relative; border-radius: 8px 8px 0 0;">
          <video src="/images/projects/${p.id}/${p.video}" autoplay loop muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
          <div style="position: absolute; bottom: 10px; right: 10px; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); color: white; padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
            <i class="fas fa-images"></i> ${p.count} Images
          </div>
        </div>`;

  // Find the old project-gallery-preview block for this project.
  // We can look for the block immediately following the onclick...
  // Or simply replace the generic block. Since they are identical except for the folder name, we can do a targeted regex replace.
  
  const blockRegex = new RegExp(`<div class="project-gallery-preview">[\\s\\S]*?<img src="/images/projects/${p.id}/1\\.jpg"[\\s\\S]*?</div>\\s*</div>\\s*</div>`, 'g');
  html = html.replace(blockRegex, videoPreview);
});

fs.writeFileSync('index.html', html);
console.log('Restored videos and image counts in index.html');
