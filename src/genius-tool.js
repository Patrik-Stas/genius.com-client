const _ = require('lodash');
const { geniusScraper } = require('./genius-scraper');


module.exports.createGeniusTool = function createGeniusTool(geniusClient) {
  async function getSongsDetails(songIds) {
    console.log(`Get details for ${songIds.length} songs.`)
    const songs = [];
    for (let i = 0; i<songIds.length; i++) {
      // eslint-disable-next-line
      songs.push(await geniusClient.getSongDetails(songIds[i]));
    }
    return songs;
  }

  async function getAllSongs(geniusArtistId) {
    let page = 1;
    let songs = [];
    let newSongs = await geniusClient.getPagedSongs(geniusArtistId, page);
    while (newSongs.length > 0) {
      songs = _.concat(songs, newSongs);
      // console.log(`Scraped '${newSongs.length}' more songs on page '${page}'.`);
      page += 1;
      // eslint-disable-next-line
      const tmpSongs = await getPagedSongs(geniusArtistId, page);
      newSongs = tmpSongs;
    }
    return songs;
  }

  async function getLyricsForSong(song) {
    return geniusScraper.scrapeLyrics(song.url);
  }

  return {
    getAllSongs,
    getLyricsForSong,
    getSongsDetails
  };
};
