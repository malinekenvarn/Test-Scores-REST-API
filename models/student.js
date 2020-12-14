const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    scores: {
        type: String,
        required: true
    },
    grade:{
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('student', studentSchema)