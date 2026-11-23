# د Certificates وروستۍ نسخه — 2026-11-23

- ۸ اصلي سندونه، د کارونکي له رالېږل شوو عکسونو څخه، په `public/images/certificates/` کې د کارتونو لپاره په WebP او د اصلي کیفیت ساتلو لپاره byte-for-byte د هماغو رالېږل شوو فایلونو جلا کاپي هم پکې ساتل شوې ده.
- د ۶ Coursera Certificate لینکونه د سندونو له عکسونو څخه اخیستل شوي؛ ۲ Cisco verification لینکونه د عکسونو له QR کوډونو استخراج شوي دي.
- **د لینکونو بهرنی کار/فعالیت** زموږ له چاپېریال څخه بشپړ نه شي تاییدېدای؛ د Coursera او Cisco تڼۍ د اصلي سند له لینکونو سره سمې دي.
- `/#/certificates` ځانګړې پاڼه ده، او `/#/about` کې هم همدا ۸ سندونه ښکاري.
- Search، Category Filter، Fullscreen Preview، ESC to close، Download Original Image، Verify with Issuer، Keyboard Focus او Mobile Layout شامل دي.
- `index.html` کې SEO title, description, Open Graph او د ټولنیزو شبکو انځور اضافه شوی. **د ویب‌سایټ د عامه Hosting وروسته** د `og:image` لپاره مکمل `https://.../social-preview.jpg` URL ولیکئ؛ نسبتي ادرس ښايي په ټولنیزو شبکو کې ونه پېژندل شي.
- دا React/HashRouter پروژه ده؛ د ټولو route URLs د search engine د انډېکس لپاره غوره لاره وروسته SSR/SSG او د pre-rendering جوړښت دی.

## چلول
```powershell
npm install
npm run dev
npm run build
```
د Vite Local URL ته لاړ شئ او `/#/certificates` خلاص کړئ.

**Privacy:** اصلي سندونه په عامه ویبپاڼه کې ښکاره کېږي؛ QR/ID هم په سند کې ښکاري، چې کارونکي یې د خپرولو غوښتنه کړې ده.
