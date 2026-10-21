// Publish only website assets, excluding authoring tools and local files.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const entry of ['index.html', 'blog', 'css', 'assets', 'files', 'images']) {
    fs.cpSync(path.join(root, entry), path.join(output, entry), { recursive: true });
}
