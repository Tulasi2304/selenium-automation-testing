const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

require("dotenv").config();

describe('Open Myntra and automate search', function () {

  let driver;
  let options = new chrome.Options();
  options.addArguments("--disable-notifications");
  options.addArguments("--log-level=1");

  before(async () => {

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.detachDriver(true))
      .build();

    await driver.get(process.env.LINK);
    
  });

  it('1. Open website', async () => {

    driver.manage().window().maximize();

    let title = await driver.getTitle();
    assert.equal(title, 'Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra')
    console.log("Opened website successfully\n");

    // await driver.wait(until.titleIs('Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra'), 1000)
    // .then(console.log("Opened website successfully"));

  });

  it('2. Search for product', async () => {
    await driver.findElement(By.className("desktop-searchBar")).sendKeys(process.env.PRODUCT_NAME);
    await driver.findElement(By.className("desktop-submit")).click();

    let product = await driver.findElement(By.className("title-title")).getText();
    assert.equal(product, process.env.PRODUCT_NAME);
    console.log("Product found successfully\n");


  });

  it('3. Open product', async () => {
    // await driver.findElement(By.xpath("//img[@title = \"Nasher Miles Vienna Hard-Sided Medium Trolley Suitcase\"]")).click();
    await driver.findElement(By.xpath("//ul[@class=\"results-base\"]/li[1]")).click();
  });

  it('4. Add product to bag', async () => {

    let currentTab = await driver.getWindowHandle();
    const windows = await driver.getAllWindowHandles();
    windows.forEach( async newTab => {
      if (newTab !== currentTab) {
        await driver.switchTo().window(newTab); 
      }
    }); 

    await driver.findElement(By.xpath("//div[@class=\"size-buttons-size-buttons\"]/div[1]")).click();
    await driver.findElement(By.className("pdp-add-to-bag")).click();
    await driver.findElement(By.className("desktop-iconBag")).click();

  });

  // it('Read items in bag', async () => {
  //   items = await driver.findElement(By.xpath("//div[@class=\"cartItemsList\"]"))
  // });

  it('5. Remove product from bag', async () => {

    await driver.findElement(By.className("itemContainer-base-closeIcon")).click();
    await driver.findElement(By.className("inlinebuttonV2-base-action confirmOrCancelModal-buttonClass")).click();

    // await driver.navigate().back();

  });

  // after(async () =>{ 
  //   driver.quit();
  // });

});
