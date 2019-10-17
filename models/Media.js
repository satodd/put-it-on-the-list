const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Media = new Schema({
  type: String,
  title: String,
  season: String,
  service: String,
  length: String,
  tags: Object,
  rank: Number,
  isWatching: Boolean
});

module.exports = mongoose.model('Media', Media);
