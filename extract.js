import fs from 'fs';

const mdPath = 'C:\\Users\\Mahabub Alom\\.gemini\\antigravity-ide\\brain\\fbcde900-3916-4e36-97bd-7d00f23c8794\\.system_generated\\steps\\20\\content.md';
let content = fs.readFileSync(mdPath, 'utf-8');

// Strip frontmatter
const htmlStartIndex = content.indexOf('<!DOCTYPE html>');
if (htmlStartIndex !== -1) {
    content = content.substring(htmlStartIndex);
}

// Extract style
const styleRegex = /<style>([\s\S]*?)<\/style>/i;
const match = content.match(styleRegex);

let cssContent = '';
if (match) {
    cssContent = match[1];
    content = content.replace(styleRegex, '<link rel="stylesheet" href="./src/style.css">');
}

// Add main.js script before </body>
const bodyEndRegex = /<\/body>/i;
if (bodyEndRegex.test(content)) {
    content = content.replace(bodyEndRegex, '  <script type="module" src="./src/main.js"></script>\n</body>');
} else {
    content += '\n<script type="module" src="./src/main.js"></script>';
}

fs.writeFileSync('src/style.css', cssContent.trim());
fs.writeFileSync('index.html', content.trim());
console.log('Extraction complete.');
