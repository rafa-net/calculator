const puppeteer = require('puppeteer');

(async () => {
  // Start the browser and open a new page
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to your local or deployed calculator
  await page.goto('http://127.0.0.1:5500/src/index.html');

  // Simulate user interactions
  // Click the number '5'
  await page.click('button[data-value="5"]');
  // Click the '+'
  await page.click('button[data-value="+"]');
  // Click the number '3'
  await page.click('button[data-value="3"]');
  // Click the '='
  await page.click('button[data-value="="]');

  // Get the display result
  const result = await page.$eval('#display', el => el.textContent);
  console.log('Calculation result:', result);

  // Assert the result
  if (result === '8') {
    console.log('Test passed');
  } else {
    console.error('Test failed');
  }

  // Close the browser
  await browser.close();
})();
