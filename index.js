const { createClient } = require('./src/genius');
const { createGeniusTool } = require('./src/genius-tool');
const { geniusScraper } = require('./src/genius-scraper');

module.exports.createClient = createClient;
module.exports.createGeniusTool = createGeniusTool;
module.exports.geniusScraper = geniusScraper;
