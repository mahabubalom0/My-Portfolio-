import fs from 'fs';

let css = fs.readFileSync('src/style.css', 'utf-8');

const galleryCSS = `

/* =========================================
   PROJECT GALLERY PREVIEW
   ========================================= */
.project-gallery-preview {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  height: 200px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
}

.gallery-img-wrap {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.gallery-img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .gallery-img-wrap img {
  transform: scale(1.05);
}

.more-overlay-wrap {
  position: relative;
}

.more-overlay-wrap::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  transition: background 0.3s ease;
}

.project-card:hover .more-overlay-wrap::after {
  background: rgba(0, 0, 0, 0.6);
}

.more-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  pointer-events: none;
}

.more-overlay i {
  font-size: 1.5rem;
  color: var(--accent);
}

/* =========================================
   LIGHTBOX GALLERY MODAL
   ========================================= */
.gallery-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.gallery-modal.active {
  opacity: 1;
  pointer-events: all;
}

.gallery-modal-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10000;
  transition: color 0.2s ease;
}

.gallery-modal-close:hover {
  color: var(--accent);
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10000;
}

.gallery-nav:hover {
  background: var(--accent);
}

.gallery-nav.prev { left: 2rem; }
.gallery-nav.next { right: 2rem; }

.gallery-content {
  position: relative;
  max-width: 80%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-content img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  opacity: 0;
  transform: scale(0.95);
  transition: all 0.3s ease;
}

.gallery-content img.loaded {
  opacity: 1;
  transform: scale(1);
}

.gallery-counter {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255,255,255,0.7);
  font-size: 0.9rem;
  letter-spacing: 2px;
}

.gallery-loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255,255,255,0.1);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: none;
}

.gallery-content.loading .gallery-loader {
  display: block;
}

@keyframes spin {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

@media (max-width: 768px) {
  .gallery-nav {
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  .gallery-nav.prev { left: 1rem; }
  .gallery-nav.next { right: 1rem; }
  .gallery-content { max-width: 95%; }
}
`;

if (!css.includes('.project-gallery-preview')) {
  fs.writeFileSync('src/style.css', css + '\\n' + galleryCSS);
  console.log('style.css updated.');
} else {
  console.log('style.css already has gallery styles.');
}
