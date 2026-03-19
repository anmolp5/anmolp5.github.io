const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 713 });
  await page.goto('http://localhost:5173/projects/room-improvement');
  
  // Wait for 3D model to load
  await page.waitForTimeout(3000);
  
  // Scroll to end by pressing ArrowDown 20 times quickly
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(2000);
  
  // Try taking a screenshot with 92vh and 1.54
  await page.evaluate(() => {
    const modal = document.querySelector('.laptop-interface-modal');
    if(modal) {
       modal.style.width = 'calc(93vh * 1.53)';
       modal.style.height = 'min(93vh, calc(95vw / 1.53))';
       modal.style.left = '49%';
       modal.style.top = '48%';
       modal.style.opacity = '0.5';
    }
  });
  
  await page.screenshot({ path: '/tmp/overlay-test1.png' });
  await browser.close();
})();
