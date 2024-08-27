import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('AccuWeather Multiple Context Tests', () => {
  let results = {};

  test('Search for New York', async ({ page }) => {
    // Open the page
    await page.goto('https://www.accuweather.com');
    await page.waitForSelector('input[name="query"]');
    await page.fill('input[name="query"]', 'New York, NY, USA');
    await page.press('input[name="query"]', 'Enter');
    await page.waitForSelector('.cur-con-weather-card__panel');

    const weatherText = await page.textContent('.cur-con-weather-card__panel');
    const screenshotPath = path.resolve(__dirname, 'accuweather-screenshot-new-york.png');
    const pdfPath = path.resolve(__dirname, 'accuweather-report-new-york.pdf');

    await page.screenshot({ path: screenshotPath });
    await page.pdf({ path: pdfPath, format: 'A4' });

    // Store results for this test
    results['New York'] = {
      weather: weatherText,
      screenshot: screenshotPath,
      pdf: pdfPath,
    };
  });

  test('Search for Tokyo', async ({ page }) => {
    // Open the page
    await page.goto('https://www.accuweather.com');
    await page.waitForSelector('input[name="query"]');
    await page.fill('input[name="query"]', 'Tokyo, Japan');
    await page.press('input[name="query"]', 'Enter');
    await page.waitForSelector('.cur-con-weather-card__panel');

    const weatherText = await page.textContent('.cur-con-weather-card__panel');
    const screenshotPath = path.resolve(__dirname, 'accuweather-screenshot-tokyo.png');
    const pdfPath = path.resolve(__dirname, 'accuweather-report-tokyo.pdf');

    await page.screenshot({ path: screenshotPath });
    await page.pdf({ path: pdfPath, format: 'A4' });

    // Store results for this test
    results['Tokyo'] = {
      weather: weatherText,
      screenshot: screenshotPath,
      pdf: pdfPath,
    };
  });

  test.afterAll(() => {
    // Output results
    console.log('Test Results:', JSON.stringify(results, null, 2));

    // Optionally, write results to a file
    fs.writeFileSync('accuweather-test-results.json', JSON.stringify(results, null, 2));
  });
});
