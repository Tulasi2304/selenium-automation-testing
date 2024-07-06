const {Builder, Key, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
var assert = require('assert');

describe('Open Myntra and automate search', function () {

  let driver;
  let options = new chrome.Options();

  before(async () => {

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(options.detachDriver(true))
      .build();
    
    await driver.get('https://www.myntra.com/')
    
  });

  it('Search for product', async () => {

    driver.manage().window().maximize();
    await driver.wait(until.titleIs('Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra'), 1000)
    .then(console.log("Opened website successfully"));

    await driver.findElement(By.className("desktop-searchBar")).sendKeys("suitcase");
    await driver.findElement(By.className("desktop-submit")).click();

  });

  it('Open product', async () => {
    await driver.findElement(By.xpath("//img[@title=\"Nasher Miles Vienna Hard-Sided Medium Trolley Suitcase\"]")).click();
  });

  // after(async () =>{ 
  //   driver.quit();
  // });

});

  // finally{
  //     await driver.quit();
  // }
  // process.stdin.resume();