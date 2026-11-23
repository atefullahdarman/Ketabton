import {existsSync,readFileSync} from 'node:fs';
const required=['index.html','src/App.jsx','src/main.jsx','src/styles.css','src/data/categories.js','src/data/pashtoBooks.js','src/pages/PashtoLibrary.jsx','src/lib/books.js','public/images/developer.webp','src/components/CertificatesGallery.jsx','src/pages/Certificates.jsx','src/data/portfolio.js','public/images/social-preview.jpg','.github/workflows/deploy.yml'];
let failed=false;
for(const f of required){const exists=existsSync(f);console.log(`${exists?'OK':'MISSING'}: ${f}`);if(!exists)failed=true;}
const app=readFileSync('src/App.jsx','utf8');
for(const route of ['/pashto','/catalog','/categories','/books/:id','/favorites','/dashboard','/contact','/about','/read/:id','/certificates']){if(!app.includes(`path="${route}"`)){console.log(`MISSING route ${route}`);failed=true;}}
if(failed)process.exit(1);
console.log('Structure and route checks passed. Run npm install && npm run build to verify dependencies and produce dist/.');

import {readdirSync} from 'node:fs';
const covers=readdirSync('public/images/certificates').filter(f=>f.endsWith('.webp'));
if(covers.length!==8){console.error(`Expected 8 original certificate images, got ${covers.length}`);process.exitCode=1;}
else console.log('All 8 certificate images are included.');
