const mongoose = require("mongoose");

const schema =  new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        default: null,
    },
    Updates: {
        type: Number,
        required: true,
        default: 0,
    },
    rank: {
        type: String,
        required: false,
        default: null,
    },
    description: {
        type: String,
        default: null,
    },




    })
module.exports = mongoose.model("database", schema);
