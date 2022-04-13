const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSchema = new Schema({
    shortUrl:{
        type: Number
    },
    longUrl: {
        type: String
    }
});


 const Url = mongoose.model("NewUrl", urlSchema);

module.exports.Url = Url;