const {Builder, Key, By, until} = require('selenium-webdriver');

async function openWebsite() {
    let driver = await new Builder().forBrowser("chrome").build()

    try {
      await driver.get('https://www.myntra.com/')
      await driver.wait(until.titleIs('Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra'), 1000)
      .then(console.log("Opened website successfully"));

    } catch(err) {
      console.log(err);
      
    }finally{
        await driver.quit();
    }

}

openWebsite();