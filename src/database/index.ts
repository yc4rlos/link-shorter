const DBAddress = "localhost:27017/linkshorter"

const mongoose = require('mongoose');

mongoose.connect("mongodb://" + DBAddress);

const model = new mongoose.Schema({
    shortid: String,
    link: String
});

const shortedModel = mongoose.model("shorted", model);

module.exports = shortedModel;