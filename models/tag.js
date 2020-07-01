const mongoose = require('mongoose');
const e = require('express');
const { findOne } = require('./experience');

const tagSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "Tag must have a name"],
        trim: true,
        unique: true
    }
})

tagSchema.statics.generateTags = async function (tags) {
    const ltags = tags.map(e => e.toLowerCase().trim()); // trim and lowerCase all strings
    const tagIDs = ltags.map(async e => {
        let tag = await this.findOne({ tag: e });
        // check if tag exists, return tag document
        if (tag)
            return tag
        // else create a new tag document
        tag = await this.create({ tag: e })
        return tag
    })
    const result = Promise.all(tagIDs) // execute all promises in the array
    return result
}
module.exports = mongoose.model("Tag", tagSchema);