import { test, expect } from '@playwright/test';

test('should search for addis ababa and from results it will select the first one and give the current temprtature', async ({page}) => {
  await page.goto('https://www.accuweather.com/', {
    timeout: 50000
  });
  await page.getByText('I Understand').click();
  await page.getByPlaceholder('Search your Address, City or Zip Code').fill('Addis Ababa');
  await page.locator('.search-icon').click();
  await page.getByText('Addis Ababa').first().click()

  // await page.waitForSelector('.title-container');
  await page.locator('.title-container').click();


  // extract the current temprature
  const current_temprature = await page.textContent('.display-temp');
  console.log("The Current temprature at Addis Ababa is " + current_temprature);

  await page.screenshot({ path: 'weather_results.png'});

  
})
