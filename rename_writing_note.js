import fs from 'fs';
import path from 'path';

const dir = 'public/images/projects/writing_note';
const files = fs.readdirSync(dir);

// Filter image files
const images = files.filter(f => !f.endsWith('.mp4'));

// Rename to tmp first to avoid collisions
images.forEach((file, index) => {
  fs.renameSync(path.join(dir, file), path.join(dir, `tmp_${index}.jpg`));
});

// Rename to 1.jpg, 2.jpg...
const tmpFiles = fs.readdirSync(dir).filter(f => f.startsWith('tmp_'));
tmpFiles.forEach((file, index) => {
  const newName = `${index + 1}.jpg`;
  fs.renameSync(path.join(dir, file), path.join(dir, newName));
  console.log(`Renamed ${file} to ${newName}`);
});

console.log(`Total images processed: ${tmpFiles.length}`);
