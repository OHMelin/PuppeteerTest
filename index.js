import puppeteer from 'puppeteer';

(async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto('https://www.elgiganten.dk/product/hvidevarer/vask-tor/vaskemaskine/samsung-vaskemaskine-ww95ta047ae/185561');
  
  const cookies = '.coi-banner__accept';
  await page.waitForSelector(cookies);
  await page.click(cookies);

  const n = await page.$(".attribute-group__wrapper")
  const t = await (await n.getProperty('textContent')).jsonValue()

  console.log(t);
  
  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();