const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
// var assert = require('assert');

describe('Open Myntra and automate search', function () {

  let driver;
  let options = new chrome.Options();
  options.addArguments("--disable-notifications");

  before(async () => {

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.detachDriver(true))
      .build();
    
    await driver.get('https://www.myntra.com/')
    
  });

  it('1. Search for product', async () => {

    driver.manage().window().maximize();
    await driver.wait(until.titleIs('Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra'), 1000)
    .then(console.log("Opened website successfully"));

    await driver.findElement(By.className("desktop-searchBar")).sendKeys("suitcase");
    await driver.findElement(By.className("desktop-submit")).click();

  });

  it('2. Open product', async () => {
    await driver.findElement(By.xpath("//img[@title=\"Nasher Miles Vienna Hard-Sided Medium Trolley Suitcase\"]")).click();
  });

  it('3. Add product to bag', async () => {

    let currentTab = await driver.getWindowHandle();
    const windows = await driver.getAllWindowHandles();
    windows.forEach( async tab => {
      if (!tab !== currentTab) {
        await driver.switchTo().window(tab); 
      }
    }); 

    await driver.findElement(By.xpath("//a[@href=\"/24880030?skuId=79999012\"]")).click();
    await driver.findElement(By.className("pdp-add-to-bag")).click();
    await driver.findElement(By.className("desktop-iconBag")).click();

  });

  // it('4. Remove product from from', async () => {

  // });

  // after(async () =>{ 
  //   driver.quit();
  // });

});
