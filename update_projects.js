import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf-8');

const projectsGridHTML = `
      <div class="project-card reveal" onclick="openGallery('dino_didi', 4)">
        <div class="project-gallery-preview">
          <div class="gallery-img-wrap"><img src="/images/projects/dino_didi/1.jpg" alt="Preview 1" onerror="this.src='https://via.placeholder.com/300x200/10b981/ffffff?text=Add+1.jpg'"></div>
          <div class="gallery-img-wrap more-overlay-wrap">
            <img src="/images/projects/dino_didi/2.jpg" alt="Preview 2" onerror="this.src='https://via.placeholder.com/300x200/10b981/ffffff?text=Add+2.jpg'">
            <div class="more-overlay"><i class="fas fa-images"></i> View All</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">Dino Didi Application</div>
          <div class="project-desc">A modern Flutter application. Click the image above to view the full gallery.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">Dart</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card reveal" onclick="openGallery('expense_tracker', 4)">
        <div class="project-gallery-preview">
          <div class="gallery-img-wrap"><img src="/images/projects/expense_tracker/1.jpg" alt="Preview 1" onerror="this.src='https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Add+1.jpg'"></div>
          <div class="gallery-img-wrap more-overlay-wrap">
            <img src="/images/projects/expense_tracker/2.jpg" alt="Preview 2" onerror="this.src='https://via.placeholder.com/300x200/0ea5e9/ffffff?text=Add+2.jpg'">
            <div class="more-overlay"><i class="fas fa-images"></i> View All</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">Expense Tracker</div>
          <div class="project-desc">Digital expense management application for daily financial tracking.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">Local DB</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card reveal" onclick="openGallery('smart_banking', 4)">
        <div class="project-gallery-preview">
          <div class="gallery-img-wrap"><img src="/images/projects/smart_banking/1.jpg" alt="Preview 1" onerror="this.src='https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Add+1.jpg'"></div>
          <div class="gallery-img-wrap more-overlay-wrap">
            <img src="/images/projects/smart_banking/2.jpg" alt="Preview 2" onerror="this.src='https://via.placeholder.com/300x200/8b5cf6/ffffff?text=Add+2.jpg'">
            <div class="more-overlay"><i class="fas fa-images"></i> View All</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">Smart Banking</div>
          <div class="project-desc">A secure and modern banking application UI with smooth animations.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">UI/UX</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card reveal" onclick="openGallery('news_app', 4)">
        <div class="project-gallery-preview">
          <div class="gallery-img-wrap"><img src="/images/projects/news_app/1.jpg" alt="Preview 1" onerror="this.src='https://via.placeholder.com/300x200/ef4444/ffffff?text=Add+1.jpg'"></div>
          <div class="gallery-img-wrap more-overlay-wrap">
            <img src="/images/projects/news_app/2.jpg" alt="Preview 2" onerror="this.src='https://via.placeholder.com/300x200/ef4444/ffffff?text=Add+2.jpg'">
            <div class="more-overlay"><i class="fas fa-images"></i> View All</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">News App</div>
          <div class="project-desc">Modern news application that fetches live news using REST API.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">REST API</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>

      <div class="project-card reveal" onclick="openGallery('smart_task', 4)">
        <div class="project-gallery-preview">
          <div class="gallery-img-wrap"><img src="/images/projects/smart_task/1.jpg" alt="Preview 1" onerror="this.src='https://via.placeholder.com/300x200/f59e0b/ffffff?text=Add+1.jpg'"></div>
          <div class="gallery-img-wrap more-overlay-wrap">
            <img src="/images/projects/smart_task/2.jpg" alt="Preview 2" onerror="this.src='https://via.placeholder.com/300x200/f59e0b/ffffff?text=Add+2.jpg'">
            <div class="more-overlay"><i class="fas fa-images"></i> View All</div>
          </div>
        </div>
        <div class="project-body">
          <div class="project-title">Smart Task</div>
          <div class="project-desc">Task management application for organizing daily goals efficiently.</div>
          <div class="tech-tags"><span class="tag">Flutter</span><span class="tag">Productivity</span></div>
          <div class="project-links">
            <a href="https://github.com/mahabubalom0" class="project-btn" target="_blank"><i class="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>
      
      <div class="project-card reveal">
        <div class="project-thumb" style="background:linear-gradient(135deg,rgba(236,72,153,0.1),rgba(168,85,247,0.1))">🎨</div>
        <div class="project-body">
          <div class="project-title">Graphics Design Portfolio</div>
          <div class="project-desc">Collection of banners, posters, social media designs, logos, and branding.</div>
          <div class="tech-tags"><span class="tag">Photoshop</span><span class="tag">Illustrator</span></div>
          <div class="project-links">
            <a href="#" class="project-btn primary"><i class="fas fa-eye"></i> View Designs</a>
          </div>
        </div>
      </div>
`;

// Replace the old projects grid
const gridStart = html.indexOf('<div class="projects-grid">');
const gridEnd = html.indexOf('</section>', gridStart);

if (gridStart !== -1 && gridEnd !== -1) {
  const before = html.substring(0, gridStart + '<div class="projects-grid">'.length);
  // find the end of the projects grid div
  let afterGridEnd = html.substring(gridStart);
  let divEndMatch = afterGridEnd.match(/<\/div>\s*<\/div>\s*<\/section>/);
  if(divEndMatch) {
    let actualEnd = gridStart + divEndMatch.index;
    html = html.substring(0, gridStart + '<div class="projects-grid">\n'.length) + projectsGridHTML + html.substring(actualEnd);
  }
}

// Add Gallery Modal at the end of the body
if (!html.includes('<div class="gallery-modal"')) {
  const modalHTML = `
  <!-- GALLERY MODAL -->
  <div class="gallery-modal" id="galleryModal">
    <div class="gallery-modal-close" onclick="closeGallery()"><i class="fas fa-times"></i></div>
    <button class="gallery-nav prev" onclick="changeGalleryImage(-1)"><i class="fas fa-chevron-left"></i></button>
    <button class="gallery-nav next" onclick="changeGalleryImage(1)"><i class="fas fa-chevron-right"></i></button>
    <div class="gallery-content" id="galleryContent">
      <img id="galleryMainImage" src="" alt="Gallery Full Image">
      <div class="gallery-counter" id="galleryCounter">1 / 1</div>
      <div class="gallery-loader" id="galleryLoader"></div>
    </div>
  </div>
`;
  html = html.replace('</body>', modalHTML + '\n</body>');
}

fs.writeFileSync('index.html', html);
console.log('index.html updated successfully.');
