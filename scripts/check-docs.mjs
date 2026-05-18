import fs from 'node:fs';
import path from 'node:path';

const requiredFiles = [
  'README.md',
  'CHANGELOG.md',
  'SECURITY.md',
  'SUPPORT.md',
  'docs/README.md',
  'docs/RELEASE_1_0.md',
  'docs/SESSION_AND_DATA.md',
  'docs/ARCHITECTURE.md',
  'docs/API.md',
  'docs/TESTING.md',
  'docs/QUALITY.md',
  'docs/REPO_HYGIENE.md',
  'docs/MAINTAINER_GUIDE.md',
  'docs/DEPLOYMENT.md',
  'docs/GETTING_STARTED.md',
  'docs/assets/wildscape-release-hero.svg',
  'docs/assets/wildscape-system-flow.svg'
];

const markdownRoots = ['README.md', 'CHANGELOG.md', 'SECURITY.md', 'SUPPORT.md', 'docs'];
const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    failures.push(`Missing required release artifact: ${file}`);
  }
}

const walk = (target) => {
  if (!fs.existsSync(target)) return [];
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith('.md') ? [target] : [];
  return fs.readdirSync(target).flatMap((entry) => walk(path.join(target, entry)));
};

const markdownFiles = markdownRoots.flatMap((entry) => walk(entry));
for (const file of markdownFiles) {
  const text = fs.readFileSync(file, 'utf8');
  if (text.includes('\u2014')) {
    failures.push(`Em dash found in ${file}`);
  }
  if (/TODO|TBD|coming soon/i.test(text)) {
    failures.push(`Placeholder language found in ${file}`);
  }
}

const readme = fs.existsSync('README.md') ? fs.readFileSync('README.md', 'utf8') : '';
for (const expected of ['docs/assets/wildscape-release-hero.svg', 'docs/RELEASE_1_0.md',
  'docs/SESSION_AND_DATA.md', 'docs/REPO_HYGIENE.md', 'npm run hygiene']) {
  if (!readme.includes(expected)) {
    failures.push(`README.md does not reference ${expected}`);
  }
}

if (failures.length > 0) {
  console.error('Documentation hygiene check failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Documentation hygiene check passed for ${markdownFiles.length} Markdown files and ${requiredFiles.length} required artifacts.`);
