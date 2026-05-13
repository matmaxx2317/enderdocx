'use strict';
const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const [major, minor] = pkg.version.split('.');
const appVersion = `${major}.${minor}`;

const railwaySha = process.env.RAILWAY_GIT_COMMIT_SHA;
let gitHashFull, gitHashShort;

if (railwaySha) {
  gitHashFull = railwaySha;
  gitHashShort = railwaySha.slice(0, 7);
} else {
  try {
    gitHashFull = execSync('git rev-parse HEAD', { cwd: root }).toString().trim();
    gitHashShort = execSync('git rev-parse --short HEAD', { cwd: root }).toString().trim();
  } catch {
    gitHashFull = 'unknown';
    gitHashShort = 'unknown';
  }
}

const footerContent = [
  '<p style="position:fixed;bottom:0;right:0;margin:0.5rem 1rem;font-size:0.75rem;',
  'opacity:0.7;z-index:9999;">',
  `<a href="https://github.com/matmaxx2317/enderdocx/commit/${gitHashFull}"`,
  ' target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">',
  `v${appVersion}-${gitHashShort}</a>`,
  '</p>',
].join('');

const partialsDir = path.join(root, 'supplemental-ui', 'partials');
fs.mkdirSync(partialsDir, { recursive: true });
fs.writeFileSync(path.join(partialsDir, 'footer-content.hbs'), footerContent);

const result = spawnSync('npx', ['antora', 'antora-playbook.yml'], {
  stdio: 'inherit',
  cwd: root,
});
process.exit(result.status ?? 0);
