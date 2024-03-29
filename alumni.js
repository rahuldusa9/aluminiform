const { urlencoded } = require('express');
const mongoose = require('mongoose');

const alumniSchema = new mongoose.Schema({
    name: String,
    batch: String,
    profile:String,
    photo:String,
    profession:String,
    achivements:String,
    email:String,
});

module.exports = mongoose.model('Alumni', alumniSchema);
