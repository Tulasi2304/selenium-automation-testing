const {Builder, Key, By, until} = require('selenium-webdriver');

async function openWebsite() {
    let driver = await new Builder().forBrowser("chrome").build();

    try {
      await driver.get('https://www.myntra.com/')
      driver.manage().window().maximize();

      await driver.wait(until.titleIs('Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra'), 1000)
      .then(console.log("Opened website successfully"));

      await driver.findElement(By.className("desktop-searchBar")).sendKeys("suitcase");
      await driver.findElement(By.className("desktop-submit")).click();
      await driver.findElement(By.xpath("//img[@title=\"Nasher Miles Vienna Hard-Sided Medium Trolley Suitcase\"]")).click();

    } catch(err) {
      console.log(err);
      
    }finally{
        // await driver.quit();
    }
}



openWebsite();