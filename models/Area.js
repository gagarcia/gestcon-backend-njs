const mongoose = require('mongoose')

const Area = mongoose.model('Area', {
    nome: String,
    responsavel: String,
    vertical: String
})

module.exports = Area