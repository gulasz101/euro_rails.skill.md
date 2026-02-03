// EuroRails Price Tracker - Browser Utilities

const puppeteer = require('puppeteer');

// Launch a headless browser
async function launchBrowser() {
    return await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
}

// Close the browser
async function closeBrowser(browser) {
    if (browser) {
        await browser.close();
    }
}

module.exports = { launchBrowser, closeBrowser };