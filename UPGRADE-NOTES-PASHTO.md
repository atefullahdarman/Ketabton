# Emerald Digital Library — Real Covers + Portfolio + Working Dashboard

## څه نوي شول؟

1. د کتاب پوښونه له حقیقي آنلاین سرچینو رااخلي. ۱۶ مشهور انګلیسي کلاسیک کتابونه د حقیقي چاپ ISBN پر بنسټ د Open Library پوښونه لټوي. که کوم عکس خراب شي، د Gutenberg سرچینه او بیا Open Library Search API هڅوي.
2. د پښتو کتابونو لپاره لومړی د `mail.ketabton.com`، بیا `www.ketabton.com` او بیا عادي Ketabton ادرس هڅه کېږي. ځینې درېیمګړي عکسونه د سرچینو له خوا بندېدلی شي؛ کله چې عکس نه وي، د بل کتاب غلط عکس نه ښکاره کوي.
3. د پښتو ۵۳ کتلاګ ریکارډونه موجود دي. د هر کتاب په کلیک سره تفصیلي پاڼه پرانیستل کېږي او د قانوني لوستلو/ډاونلوډ لپاره د خپرونکي سرچینې ته ځي.
4. د **About / Portfolio** پاڼه اوس ستاسو له لېږل شوي کوډ څخه بشپړه پېژندنه لري: Atefullah Zafar Zoi، Kandahar University، Nooralmadaris High School، ژبې، ۱۰ پروژې، ۵ Certificates، د مهارتونو ګرافونه، او خپل انځور.
5. Dashboard کې Favorites CSV Export، د اخیستل شویو کتابونو لټون، د لوستلو هدف (Reading Goal)، د Recent History پاکول او Favorites پاکول، Recharts، او د پښتو ژانرونو احصایه فعاله ده. ډاټا LocalStorage کې ساتل کېږي.

## Run on Windows (VS Code terminal)

```powershell
npm install
npm run dev
```

د Terminal Local ادرس خلاص کړئ. دا پروژه `HashRouter` کاروي، نو د بېلګې په توګه: `http://localhost:5173/#/about` او `http://localhost:5173/#/dashboard`.

که `esbuild allow-scripts` Warning راشي: `npm approve-scripts esbuild` او `npm rebuild esbuild` اجرا کړئ.

## GitHub Pages

```powershell
npm run build
```

GitHub Actions Deployment د `.github/workflows/deploy.yml` په فایل کې شته. Repository → Settings → Pages → Build and deployment → GitHub Actions.

## د حقیقي پوښونو محدودیت

د کتابونو پوښونه د چاپ بڼې پورې تړلي وي. د Open Library عکس ممکن د Gutenberg د متن ایډیشن سره ظاهري توپیر ولري. موږ هیڅ په لاس جوړ شوی پوښ د حقیقي پوښ په توګه نه ښیو؛ د ناکامۍ پر مهال د پوښ د نه موجودیت پیغام ښکاره کېږي. ځکه انټرنېټ ته اړتیا لري؛ د درېیمګړي سرور د لاسرسي ضمانت نشته. د دې نسخې عکسونه د Dritt-party ویب‌پاڼو حقونه مراعاتوي، د کوربه سایټ نوم او اصل ته لینک ساتي.

## Important

- یوازې Frontend React؛ حقیقي Admin Auth او مرکزي Database نشته.
- د Dashboard شمېرې د کتابونو ریښتیني API داده یا د کاروونکي LocalStorage څخه اخلي. د مهارتونو فیصدۍ ستاسو د شخصي پورټفولیو د illustrative ارزښتونو پر بنسټ دي.
- Certificates verification links ستاسو له رالېږل شوي کوډ څخه رااخیستل شوي. Certificate عکسونه نه وو رالېږل شوي، نو جعلي عکسونه نه دي اضافه شوي.
- د `https://github.com/dashboard` عامه GitHub Profile نه دی؛ کله چې صحیح Profile URL راولېږئ، په Contact/Footer کې یې کېږدئ.
