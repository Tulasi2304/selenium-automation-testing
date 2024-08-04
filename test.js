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
    console.log("\nOpened website successfully\n");

  });

  it('2. Search for product', async () => {
    await driver.findElement(By.className("desktop-searchBar")).sendKeys(process.env.PRODUCT_NAME);
    await driver.findElement(By.className("desktop-submit")).click();

    let product = await driver.findElement(By.className("title-title")).getText();
    assert.equal(product, process.env.PRODUCT_NAME);
    console.log("\nProduct found\n");

  });

  it('3. Open product', async () => {
    await driver.findElement(By.xpath("//ul[@class=\"results-base\"]/li[1]")).click();

    let currentTab = await driver.getWindowHandle();
    const windows = await driver.getAllWindowHandles();

    windows.forEach( async newTab => {
      if (newTab !== currentTab) {
        await driver.switchTo().window(newTab); 
      }
    });

    let add = await driver.wait(until.elementLocated(By.className("pdp-add-to-bag")), 10000).getText();
    assert.equal(add, "ADD TO BAG");
    console.log("\nProduct opened\n");

  });

  it('4. Add product to bag', async () => {
    await driver.findElement(By.xpath("//div[@class=\"size-buttons-size-buttons\"]/div[1]")).click();
    await driver.findElement(By.className("pdp-add-to-bag")).click();
    await driver.findElement(By.className("desktop-iconBag")).click();

    let offers = await driver.findElement(By.xpath("//div[@class=\"offersV2-base-title \"]")).getText();
    assert.equal(offers, "Available Offers");
    console.log("\nGo to bag\n");

  });

  it("5. Proceed to payment", async () => {
    await driver.findElement(By.css("button.css-ibwr57")).click();
    let deliveryAddr = await driver
      .findElement(By.css("div.addressList-base-title"))
      .getText();
    assert.equal(deliveryAddr, "Select Delivery Address");

    console.log("\nSelect delivery address\n");
  });

  it('6. Remove product from bag', async () => {
    await driver.navigate().back();
    setTimeout(() => { }, 5000);
    
    await driver.findElement(By.className("itemContainer-base-closeIcon")).click();
    await driver.findElement(By.className("inlinebuttonV2-base-action confirmOrCancelModal-buttonClass")).click();

    let bagEmpty = await driver.wait(until.elementLocated(By.xpath('//div[@class="emptyCart-base-emptyText"]')), 10000).getText();
    assert.equal(bagEmpty, "Hey, it feels so light!");
    console.log("\nMake payment\n");
    
    // await driver.navigate().back();

  });

  // after(async () =>{ 
  //   driver.quit();
  // });

});
