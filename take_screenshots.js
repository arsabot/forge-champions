const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function capture() {
  const screenshotsDir = path.join(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
    headless: 'new',
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });

  // Wait 2.5s for components, logos and fonts to settle
  await new Promise(r => setTimeout(r, 2500));

  console.log('Capturing screenshots...');

  // 1. Full Page
  await page.screenshot({
    path: path.join(screenshotsDir, '01_full_page.png'),
    fullPage: true,
  });
  console.log('Saved 01_full_page.png');

  // 2. Hero Section
  await page.screenshot({
    path: path.join(screenshotsDir, '02_hero_section.png'),
    clip: { x: 0, y: 0, width: 1440, height: 780 },
  });
  console.log('Saved 02_hero_section.png');

  // 3. Propuesta de Valor Section
  const propuestaElem = await page.$('#propuesta');
  if (propuestaElem) {
    await propuestaElem.screenshot({
      path: path.join(screenshotsDir, '03_propuesta_valor.png'),
    });
    console.log('Saved 03_propuesta_valor.png');
  }

  // 4. Champions Sessions Section
  const muroElem = await page.$('#muro');
  if (muroElem) {
    await muroElem.screenshot({
      path: path.join(screenshotsDir, '04_champions_sessions.png'),
    });
    console.log('Saved 04_champions_sessions.png');
  }

  // 5. Calendario Operativo Section
  const calendarioElem = await page.$('#calendario');
  if (calendarioElem) {
    await calendarioElem.screenshot({
      path: path.join(screenshotsDir, '05_calendario_operativo.png'),
    });
    console.log('Saved 05_calendario_operativo.png');
  }

  // 6. Formulario de Postulación Section
  const formElem = await page.$('#postulacion-form');
  if (formElem) {
    await formElem.screenshot({
      path: path.join(screenshotsDir, '06_formulario_postulacion.png'),
    });
    console.log('Saved 06_formulario_postulacion.png');
  }

  console.log('All screenshots captured successfully in', screenshotsDir);
  await browser.close();
}

capture().catch(err => {
  console.error('Error capturing screenshots:', err);
  process.exit(1);
});
