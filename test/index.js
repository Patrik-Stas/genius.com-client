const {assert} = require('chai');
const {geniusScraper}  = require('../index');

describe('Awesome test.', () => {
  it('should test default awesome function', async () => {
    const lyrics = await geniusScraper.scrapeLyrics('https://genius.com/Mac-miller-whats-the-use-lyrics');
    assert(lyrics.includes('You can love it, you can leave'));
    assert(lyrics.includes('It just freaks me out'));
    assert(lyrics.length > 2600);
    assert(lyrics.length < 2700);
  }).timeout(5000);
});
