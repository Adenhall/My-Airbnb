const mongoose = require('mongoose')

const expSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "The event needs a name"],
        trim: true,
        minlength: 5,
        maxlength: 100
    },
    description: {
        type: String,
        trim: true,
        minlength: 5,
        maxlength: 1000
    },
    host: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Who is the host?"]
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: "Tag",
        required: [true, "Include tags please!"]
    }]
}, {
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

module.exports = mongoose.model("Exp", expSchema)