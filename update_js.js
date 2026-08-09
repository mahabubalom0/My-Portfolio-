import fs from 'fs';

let js = fs.readFileSync('src/main.js', 'utf-8');

const galleryJS = `
// =========================================
// GALLERY LIGHTBOX LOGIC
// =========================================
let currentGallery = [];
let currentGalleryIndex = 0;
let currentProjectId = '';

window.openGallery = function(projectId, totalImages) {
  currentProjectId = projectId;
  // Create an array of image paths for the project
  currentGallery = Array.from({length: totalImages}, (_, i) => \`/images/projects/\${projectId}/\${i+1}.jpg\`);
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
    img.src = \`https://via.placeholder.com/800x600/1e293b/ffffff?text=\${currentProjectId}+-+(Image+\${currentGalleryIndex+1}+Not+Found)\`;
  };
  
  img.src = currentGallery[currentGalleryIndex];
  counter.innerText = \`\${currentGalleryIndex + 1} / \${currentGallery.length}\`;
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
`;

if (!js.includes('window.openGallery')) {
  fs.writeFileSync('src/main.js', js + '\\n' + galleryJS);
  console.log('main.js updated with gallery logic.');
} else {
  console.log('main.js already contains gallery logic.');
}
