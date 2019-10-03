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

Show.methods.increaseRank = function(cb) {
	return this.model("Show")
}

module.exports = mongoose.model('Show', Show);
