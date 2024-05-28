const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:5500/src/index.html', { waitUntil: 'networkidle0' });


  const tests = [
    { sequence: ['1', '+', '2', '='], expectedResult: '3' },
    { sequence: ['3', '*', '5', '='], expectedResult: '15' },
    { sequence: ['2', '5', '/', '5', '='], expectedResult: '5' },
    { sequence: ['3', '0', '-', '7', '='], expectedResult: '23' },
    { sequence: ['1', '0', '0', '*', '2', '5', '%', '='], expectedResult: '25' },
    { sequence: ['9', 'sqrt', '='], expectedResult: '3' },
    { sequence: ['5', '0', '+', '5', '0', '*', '2', '-', '3', '0', '/', '2', '='], expectedResult: '85' },
    { sequence: ['1', '2', '+', '8', '='], expectedResult: '20' },
    { sequence: ['1', '4', '4', 'sqrt', '='], expectedResult: '12' },
    { sequence: ['9', '0', '-', '3', '5', '='], expectedResult: '55' },
    { sequence: ['5', '*', '5', '='], expectedResult: '25' },
    { sequence: ['1', '0', '0', '/', '4', '='], expectedResult: '25' },
    { sequence: ['2', '0', '0', '*', '1', '5', '%', '='], expectedResult: '30' },
    { sequence: ['1', '2', '3', '+', '4', '5', '6', '='], expectedResult: '579' },
    { sequence: ['2', '5', '*', '4', '0', '%', '='], expectedResult: '10' },
    { sequence: ['7', '8', '+', '9', '0', '1', '='], expectedResult: '979' },
    { sequence: ['5', '5', '5', '*', '2', '='], expectedResult: '1110' },
    { sequence: ['3', '0', '0', '/', '2', '0', '%', '='], expectedResult: '1500' },
    { sequence: ['5', '0', '0', '-', '2', '4', '3', '='], expectedResult: '257' },
    { sequence: ['1', '0', '+', '2', '0', '+', '3', '0', '='], expectedResult: '60' },
    { sequence: ['4', '4', '4', '4', '/', '1', '1', '1', '1', '='], expectedResult: '4' },
    { sequence: ['1', '1', '1', '*', '1', '1', '1', '='], expectedResult: '12321' },
    { sequence: ['9', '8', '7', '-', '3', '2', '1', '='], expectedResult: '666' },
    { sequence: ['7', '2', '/', '2', '4', '='], expectedResult: '3' },
    { sequence: ['1', '5', '0', '*', '2', '0', '%', '='], expectedResult: '30' },
    { sequence: ['1', '2', '3', '+', '4', '5', '6', 'bksp', '=', '1', '7', '8'], expectedResult: '178' },
    { sequence: ['2', '5', '.', '5', '*', '2', '=', '5', '1', '.', '0'], expectedResult: '51.0' },
    { sequence: ['1', '4', '4', 'sqrt', '=', '1', '2'], expectedResult: '12' },
    { sequence: ['2', '0', '0', '+', '1', '5', '0', 'CE', '2', '5', '='], expectedResult: '225' },
    { sequence: ['1', '2', '3', '4', '.', '5', '6', 'bksp', 'bksp', '='], expectedResult: '1234' },
    { sequence: ['1', '0', '0', '0', '*', '5', '0', '%', '='], expectedResult: '500' },
    { sequence: ['9', 'sqrt', '='], expectedResult: '3' },
    { sequence: ['5', '0', '0', '*', '5', '0', '%', 'bksp', '*', '2', '/', '9', '='], expectedResult: '5.5' },
    { sequence: ['5', '0', '+', '5', '0', '=', '='], expectedResult: '150' },
    { sequence: ['2', '5', '+', '1', '5', 'CE', '2', '0', '='], expectedResult: '45' },
    { sequence: ['3', '0', '0', '-', '1', '0', '0', 'CE', '2', '0', '0', '='], expectedResult: '100' },
    { sequence: ['9', '9', '9', '*', '0', '.', '0', '1', '='], expectedResult: '9.99' },
    { sequence: ['8', '4', '/', '2', 'CE', '4', '='], expectedResult: '21' },
    { sequence: ['6', '4', 'sqrt', '='], expectedResult: '8' },
    { sequence: ['1', '0', '0', '/', '2', '0', '%', '='], expectedResult: '500' },
    { sequence: ['1', '2', '3', '.', '4', '+', '5', '6', '7', '.', '8', '9', '=', '='], expectedResult: '1259.18' },
    { sequence: ['3', '5', '4', 'sqrt', '='], expectedResult: '18.8' },
    { sequence: ['1', '0', '0', '*', '2', '5', '%', '='], expectedResult: '25' },
    { sequence: ['5', '0', '0', '-', '2', '0', '0', '+', '1', '5', '0', 'CE', '5', '0', '='], expectedResult: '350' },
    { sequence: ['9', '.', '9', '*', '3', '='], expectedResult: '29.7' },
    { sequence: ['2', '5', '0', '+', '1', '0', '0', '%', '='], expectedResult: '500' },
    { sequence: ['1', '5', '0', '*', '2', '0', '%', '-', '3', '0', '='], expectedResult: '0' },
    { sequence: ['7', '7', '7', '*', '1', '1', '1', '='], expectedResult: '86247' },
    { sequence: ['1', '0', '*', '1', '0', '=', '='], expectedResult: '1000' },
    { sequence: ['9', '9', '9', '/', '3', '='], expectedResult: '333' },
    { sequence: ['4', '4', '4', '+', '2', '2', '2', '='], expectedResult: '666' },
    { sequence: ['3', '6', '0', '/', '6', '='], expectedResult: '60' },
    { sequence: ['1', '2', '3', '4', '5', 'bksp', 'bksp', 'bksp', '='], expectedResult: '12' },
    { sequence: ['1', '0', '0', '0', '/', '2', '5', '%', '='], expectedResult: '4000' },
    { sequence: ['1', '0', '*', '5', '0', '%', '='], expectedResult: '5' },
    { sequence: ['2', '5', '*', '4', '=', 'sqrt'], expectedResult: '10' },
    { sequence: ['1', '0', '0', '/', '2', '0', '%', '='], expectedResult: '500' },
    { sequence: ['2', '5', '*', '4', '=', 'sqrt'], expectedResult: '10' },
    { sequence: ['2', '5', '*', '4', 'sqrt'], expectedResult: '2' },
    { sequence: ['2', '*', '4', '.', '5', '=', 'sqrt'], expectedResult: '3' },
    { sequence: ['8', '*', '8', '=', 'sqrt'], expectedResult: '8' },
    { sequence: ['2', '6', '5', '*', '2', '/', '6', '+', '5', '='], expectedResult: '93.3' },
    { sequence: ['8', '5', '*', '1', '2', 'sqrt', 'CE', '*', '2', '='], expectedResult: '0' },
    { sequence: ['3', '2', '-', '1', '8', '0', '*', '5', '='], expectedResult: '-740' },
    { sequence: ['7', '6', '+', '2', '/', '6', '*', '5', '0', '%', 'sqrt', '=', '=', '=', '='], expectedResult: '5601.2729' }
  ];

  for (const test of tests) {
    for (const input of test.sequence) {
      await page.click(`button[data-value="${input}"]`);
    }
    const numberBox = await page.evaluate(() => document.getElementById('displayText').innerText);
    console.log(`Test ${test.sequence.join(' ')}: Expected ${test.expectedResult}, got ${numberBox}`);
    await page.click('button[data-value="AC"]');
  }

  await browser.close();
})();
