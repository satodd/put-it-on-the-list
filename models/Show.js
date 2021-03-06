const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Show = new Schema({
  title: String,
  season: String,
  service: String,
  length: String,
  tags: Object,
  rank: Number,
  isWatching: Boolean
});

module.exports = mongoose.model('Show', Show);
