var mongoose = require('mongoose');

module.exports = mongoose.model('Word', {
    mot: String,
    motformate: String,
    def: String,
    entrant: [],
    sortant: []
});
