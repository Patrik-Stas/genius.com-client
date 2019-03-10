const axios = require('axios');
const _ = require('lodash');

module.exports.createClient = function createClient(geniusToken) {
  const instance = axios.create({
    baseURL: 'https://api.genius.com',
    timeout: 50000,
    headers: { Authorization: `Bearer ${geniusToken}` },
  });

  async function getPagedSongs(geniusArtistId, page, pageSize = 50) {
    const qs = `?per_page=${pageSize}&page=${page}`;
    const path = `/artists/${geniusArtistId}/songs${qs}`;
    console.log(`Get paged songs. Request path = ${path}`);
    const res = await instance.get(path);
    return res.data.response.songs;
  }

  async function getSongDetails(songId) {
    const path = `/songs/${songId}`;
    console.log(`Get song details. Request path = ${path}`);
    const res = await instance.get(path);
    return res.data.response.song;
  }

  return {
    getPagedSongs,
    getSongDetails,
  };
};
