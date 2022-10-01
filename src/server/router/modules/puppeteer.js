import express from 'express'
import puppeteer from 'puppeteer-core';

import findChrome from 'carlo/lib/find_chrome';
const router = express.Router()

router.get('/', (req, res) => {

 findChrome({}).then(res => {
  console.log(22, res.executablePath);
  return puppeteer.launch({
    executablePath: res.executablePath,
    headless: false,
  }).then(async browser => {
    const page = await browser.newPage();
    await page.goto('http://kaoqin.hr.ke.com/attendance/calendar');
    const bnt = page.$('.attendance-calendar-btn-punch');
    console.log(11, bnt);
    // await browser.close();
  });
 })

  res.send(`启动 puppeteer`)
})

export default router;