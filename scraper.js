// EuroRails Price Tracker - Scraper Module

const { launchBrowser, closeBrowser } = require('./browser-utils');

// Mock data for testing
const mockPrices = {
    'Paris': { oneWay: 39.99, roundTrip: 79.98 },
    'Brussels': { oneWay: 29.99, roundTrip: 59.98 },
    'Amsterdam': { oneWay: 24.99, roundTrip: 49.98 },
    'Berlin': { oneWay: 49.99, roundTrip: 99.98 },
    'Vienna': { oneWay: 59.99, roundTrip: 119.98 },
};

// Scrape EuroRails for real-time prices
async function scrapeEuroRails(destination, roundTrip = false) {
    // Mock data for testing
    if (mockPrices[destination]) {
        return roundTrip ? mockPrices[destination].roundTrip : mockPrices[destination].oneWay;
    }
    
    // In a real implementation, this would use a headless browser
    console.log(`Scraping EuroRails for ${destination} (${roundTrip ? 'round-trip' : 'one-way'})...`);
    
    // Example: Launch browser and scrape
    const browser = await launchBrowser();
    const page = await browser.newPage();
    
    await page.goto('https://eurorails.com/', { waitUntil: 'networkidle2' });
    
    // Fill in the search form (example selectors - adjust as needed)
    await page.type('#origin', 'Cologne');
    await page.type('#destination', destination);
    await page.click(roundTrip ? '#round-trip' : '#one-way');
    await page.click('#search-button');
    
    // Wait for results and extract price
    await page.waitForSelector('.price');
    const price = await page.$eval('.price', el => parseFloat(el.textContent.replace('€', '')));
    
    await closeBrowser(browser);
    return price;
}

module.exports = { scrapeEuroRails };