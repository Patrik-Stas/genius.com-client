const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

async function parseLyrics(geniusHtml) {
  const $ = cheerio.load(geniusHtml);

  $.prototype.textln = function textln() {
    this.find('br').replaceWith('\n');
    this.find('*').each(function replace() {
      $(this).replaceWith($(this).html());
    });
    return this;
  };

  const res = $('div .lyrics').textln().text();
  const noMeta = res.replace(/\[.+?\]/g, ' ');
  return noMeta.replace(/( +[\r\n]+)+/g, '');
}

async function getHtml(geniusUrl) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(geniusUrl);
  // eslint-disable-next-line no-undef
  const bodyHTML = await page.evaluate(() => document.body.innerHTML);
  await browser.close();
  return bodyHTML;
}

async function scrapeLyrics(geniusUrl) {
  const html = await getHtml(geniusUrl);
  return parseLyrics(html);
}

module.exports.geniusScraper = { scrapeLyrics };
