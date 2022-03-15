const router = require('express').Router()

const Projeto = require('../models/Projeto')


// Rotas da API

// Post de criacao de projeto
router.post('/', async (req,res) => {

    // req.body
    const {area_responsavel_id, nome, responsavel, equipe, descricao_oportunidade, metodologia, solucoes, status, tipo, duracao, desafios, palavras_chave, pitch, aprovado} = req.body

    if(!nome) {
        res.status.json({
            error: "O nome é obrigatório"
        })
    }

    const projeto = {area_responsavel_id, nome, responsavel, equipe, descricao_oportunidade, metodologia, solucoes, status, tipo, duracao, desafios, palavras_chave, pitch, aprovado}

    // metodo create

    try {
        
        // criacao de dados no db
        await Projeto.create(projeto)

        res.status(201).json(projeto)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Leitura de projetos
router.get('/', async (req,res) => {
    try {
        const projetos = await Projeto.find()

        res.status(200).json(projetos)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// filtro de projetos
router.get('/:id', async (req,res) => {

    const id = req.params.id

    try {
        const projeto = await Projeto.findOne({_id: id})

        if(!projeto) {
            res.status(422).json({message: 'O projeto não foi encontrado!'})
            return
        }

        res.status(200).json(projeto)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// atualizacao do projeto
router.patch('/:id', async (req,res) => {

    const id = req.params.id

    const {area_responsavel_id, nome, responsavel, equipe, descricao_oportunidade, metodologia, solucoes, status, tipo, duracao, desafios, palavras_chave, pitch, aprovado} = req.body

    const projeto = {area_responsavel_id, nome, responsavel, equipe, descricao_oportunidade, metodologia, solucoes, status, tipo, duracao, desafios, palavras_chave, pitch, aprovado}

    try {
        
        const updateProjeto = await Projeto.updateOne({_id: id}, projeto)

        if(updateProjeto.matchedCount === 0) {
            res.status(422).json({message: 'O projeto não foi encontrado!'})
            return
        }

        res.status(200).json(projeto)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Deleta projetos

router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const projeto = await Projeto.findOne({_id: id})

    if(!projeto) {
        res.status(422).json({message: 'O projeto não foi encontrado!'})
        return
    }

    try {
        
        await Projeto.deleteOne({_id: id})

        res.status(200).json({message: "Projeto deletado com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router