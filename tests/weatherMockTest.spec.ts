import { test, expect } from '@playwright/test';


test('mock wather data from some api', async ({ page }) => {

    const mockApiResponse = {
        coord:{
            "lon":-91.2654,
            "lat":30.3538
        },
        weather:[{
            "id":802,
            "main":"Clouds",
            "description":"scattered clouds",
            "icon":"03n"
        }],
        base:"stations",
        main:{
            "temp":297.07,
            "feels_like":297.84,
            "temp_min":295.95,
            "temp_max":298.17,
            "pressure":1018,
            "humidity":89,
            "sea_level":1018,
            "grnd_level":1017
        },
        visibility:10000,
        wind:{
            "speed":1.26,
            "deg":347,
            "gust":1.33
        },
        clouds:{
            "all":42
        },
        dt:1724756746,
        sys:{
            "type":2,
            "id":2034371,
            "country":"US",
            "sunrise":1724758767,
            "sunset":1724805231
        },
        timezone:-18000,
        id:4314409,
        name:"Addis",
        cod:200
    };

    await page.route('**/weather**', route =>
        route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockApiResponse),
    }));

    await page.goto('https://api.openweathermap.org/data/2.5/weather?q=addis&&appid=cc95d932d5a45d33a9527d5019475f2c');
    const response = await page.evaluate(async () => {
        const res = await fetch('https://api.openweathermap.org/data/2.5/weather?q=addis&&appid=cc95d932d5a45d33a9527d5019475f2c');
        return res.json();
    });

    // evaluate the response
    expect(response.name).toBe("Addis");
    expect(response.main.temp).toBe(297.07);
    expect(response.weather[0].description).toBe("scattered clouds");
});
