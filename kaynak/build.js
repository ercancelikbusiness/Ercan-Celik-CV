// CV'yi cv.html'den PDF'e çevirir.
// Kurulum (bir kez): npm i playwright && npx playwright install chromium
// Çalıştırma: node kaynak/build.js  → ../Ercan_Celik_CV.pdf ve kaynak/cv-preview.png
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await page.goto('file:///' + path.join(__dirname, 'cv.html').replace(/\\/g, '/'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const overflow = await page.evaluate(() => {
    const m = document.querySelector('main'), a = document.querySelector('aside');
    return { main: m.scrollHeight - m.clientHeight, aside: a.scrollHeight - a.clientHeight };
  });
  console.log('overflow px (0 olmalı):', overflow);
  await page.screenshot({ path: path.join(__dirname, 'cv-preview.png') });
  await page.pdf({ path: path.join(__dirname, '..', 'Ercan_Celik_CV.pdf'), format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
})();
