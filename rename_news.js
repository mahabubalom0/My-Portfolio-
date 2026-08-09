import fs from 'fs';
import path from 'path';

const dir = 'public/images/projects/news_app';
const files = fs.readdirSync(dir);

let count = 1;
files.forEach(file => {
  if (file.endsWith('.jpeg')) {
    const oldPath = path.join(dir, file);
    const newPath = path.join(dir, `${count}.jpg`);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed ${file} to ${count}.jpg`);
    count++;
  }
});
console.log(`Total renamed: ${count - 1}`);
