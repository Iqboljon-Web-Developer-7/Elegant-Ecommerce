const chromium = require('@sparticuz/chromium-min');

module.exports = {
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  puppeteer: {
    executablePath: chromium.executablePath('https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar'),
  },
};