import fs from 'fs';
let content = fs.readFileSync('index.html', 'utf-8');
// match `<script>...code...</script>` but not `<script type="module" src="./src/main.js"></script>`
const scriptRegex = /<script>\s*\/\/ NAV SCROLL SHRINK[\s\S]*?<\/script>/g;
content = content.replace(scriptRegex, '');
fs.writeFileSync('index.html', content);
console.log('Cleanup complete');
