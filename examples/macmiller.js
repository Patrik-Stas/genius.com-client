const util = require('util');
const fs = require('fs');
const { createClient } = require('../index');
const { createGeniusTool } = require('../index');
const _ = require('lodash');

const geniusArtistId = 820; // mac miller
const fsWriteFile = util.promisify(fs.writeFile);

async function prettifyToFile(fileName, o) {
  await fsWriteFile(fileName, JSON.stringify(o, null, 2));
  console.log(`Saved to file '${fileName}'.`);
}

async function getLyrics(geniusTool, songs) {
  const lyrics = [];
  for (let i = 0; i < songs.length; i++) {
    const song = songs[i];
    // eslint-disable-next-line no-await-in-loop
    lyrics.push(await geniusTool.getLyricsForSong(song));
  }
  return lyrics;
}

async function run() {
  const genius = createClient(process.env.GENIUS_TOKEN);
  const geniusTool = createGeniusTool(genius);
  const songs = await genius.getPagedSongs(geniusArtistId, 1, 5);
  console.log(`Fetched completely '${songs.length}' songs.`);
  await prettifyToFile('songs.json', songs);

  const ids = await _.map(songs, s => s.id);
  const detailedSongs = await geniusTool.getSongsDetails(ids);
  console.log(`Fetched detailed '${detailedSongs.length}' songs.`);
  await prettifyToFile('detailed-songs.json', detailedSongs);

  const lyrics = await getLyrics(geniusTool, songs);
  console.log(`All the lyrics ${lyrics}`);
}

run();

