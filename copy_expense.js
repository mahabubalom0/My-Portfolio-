import fs from 'fs';
import path from 'path';

const artifactsDir = 'C:\\Users\\Mahabub Alom\\.gemini\\antigravity-ide\\brain\\fbcde900-3916-4e36-97bd-7d00f23c8794';
const targetDir = path.join(process.cwd(), 'public/images/projects/expense_tracker');

// Ensure target dir exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all jpg files
const files = fs.readdirSync(artifactsDir).filter(f => f.startsWith('media__') && f.endsWith('.jpg')).sort();

let count = 1;
for (const file of files) {
  const src = path.join(artifactsDir, file);
  const dest = path.join(targetDir, `${count}.jpg`);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file} to ${count}.jpg`);
  count++;
}

console.log(`Total images copied for Expense Tracker: ${count - 1}`);

// Update index.html to reflect the new number of images for expense_tracker
let html = fs.readFileSync('index.html', 'utf-8');
// It currently has openGallery('expense_tracker', 4)
html = html.replace(/openGallery\('expense_tracker', \d+\)/, `openGallery('expense_tracker', ${count - 1})`);
fs.writeFileSync('index.html', html);
console.log('Updated index.html to set the correct number of images for Expense Tracker.');

