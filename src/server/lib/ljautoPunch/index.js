// 自动打卡
const puppeteer = require('puppeteer-core');


puppeteer.launch().then(async browser => {
  const page = await browser.newPage();
  await page.goto('http://kaoqin.hr.ke.com/attendance/calendar');
  const bnt = page.$('.attendance-calendar-btn-punch');

  console.log(11, bnt);
  // await browser.close();
});