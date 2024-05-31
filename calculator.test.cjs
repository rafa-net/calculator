const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('your_live_server_url', { waitUntil: 'networkidle0' });

  const tests = [
    { sequence: ['1', '+', '2', '='], expectedResult: '3' },
    { sequence: ['3', '*', '5', '='], expectedResult: '15' },
    { sequence: ['25', '/', '5', '='], expectedResult: '5' },
    { sequence: ['30', '-', '7', '='], expectedResult: '23' },
    { sequence: ['2', '**', '3', '='], expectedResult: '8' },
    { sequence: ['100', '%', '25', '='], expectedResult: '25' },
    { sequence: ['9', 'sqrt', '='], expectedResult: '3' },
    { sequence: ['50', '+', '50', '*', '2', '-', '30', '/', '2', '='], expectedResult: '85' } 

  ];

  for (const test of tests) {
    for (const input of test.sequence) {
      await page.click(`button[data-value="${input}"]`);
    }
    const displayValue = await page.evaluate(() => document.getElementById('display').innerText);
    console.log(`Test ${test.sequence.join(' ')}: Expected ${test.expectedResult}, got ${displayValue}`);
    await page.click('button[data-value="AC"]');
  }

  await browser.close();
})();
