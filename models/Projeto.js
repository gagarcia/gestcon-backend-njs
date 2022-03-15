const mongoose = require('mongoose')

const Projeto = mongoose.model('Projeto', {
    area_responsavel_id: Number,
    nome: String,
    responsavel: String,
    equipe: String,
    descricao_oportunidade: String,
    metodologia: String,
    solucoes: String,
    status: String,
    tipo: String,
    duracao: Number,
    desafios: String,
    palavras_chave: String,
    pitch: Boolean,
    aprovado: Boolean
})

module.exports = Projeto