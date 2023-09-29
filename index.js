import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://www.elgiganten.dk/product/outlet/electrolux-vaskemaskine-ew8f8661u1/399017');
  
  const cookies = '.coi-banner__accept';
  await page.waitForSelector(cookies);
  await page.click(cookies);

  const n = await page.$(".attribute-group__wrapper")
  const t = await (await n.getProperty('textContent')).jsonValue()

  console.log(t);
  
  await page.screenshot({ path: 'example.png' });

  let counter = 0;
  page.on('response', async (response) => {
    const matches = /.*\.(jpg|png|svg|gif)$/.exec(response.url());
    if (matches && (matches.length === 2)) {
      const extension = matches[1];
      const buffer = await response.buffer();
      fs.writeFileSync(`images/image-${counter}.${extension}`, buffer, 'base64');
      counter += 1;
    }
  });
  await page.goto('https://www.elgiganten.dk/product/outlet/electrolux-vaskemaskine-ew8f8661u1/399017');

  await browser.close();
})();