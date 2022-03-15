const router = require('express').Router()

const Area = require('../models/Area')


// Rotas da API

// Post de criacao de area
router.post('/', async (req,res) => {

    // req.body
    const {nome, responsavel, vertical} = req.body

    if(!nome) {
        res.status.json({
            error: "O nome é obrigatório"
        })
    }

    const area = {nome, responsavel, vertical}

    // metodo create

    try {
        
        // criacao de dados no db
        await Area.create(area)

        res.status(201).json(area)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// Leitura de areas
router.get('/', async (req,res) => {
    try {
        const areas = await Area.find()

        res.status(200).json(areas)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// filtro de areas
router.get('/:id', async (req,res) => {

    const id = req.params.id

    try {
        const area = await Area.findOne({_id: id})

        if(!area) {
            res.status(422).json({message: 'A area não foi encontrado!'})
            return
        }

        res.status(200).json(area)

    } catch (error) {
        res.status(500).json({error: error})
    }
})

// atualizacao do area
router.patch('/:id', async (req,res) => {

    const id = req.params.id

    const {nome, responsavel, vertical} = req.body

    const area = {nome, responsavel, vertical}

    try {
        
        const updateArea = await Area.updateOne({_id: id}, area)

        if(updateArea.matchedCount === 0) {
            res.status(422).json({message: 'A area não foi encontrado!'})
            return
        }

        res.status(200).json(area)

    } catch (error) {
        res.status(500).json({error: error})
    }

})

//Deleta areas

router.delete('/:id', async (req,res) => {

    const id = req.params.id

    const area = await Area.findOne({_id: id})

    if(!area) {
        res.status(422).json({message: 'A area não foi encontrado!'})
        return
    }

    try {
        
        await Area.deleteOne({_id: id})

        res.status(200).json({message: "Area deletada com sucesso!"})

    } catch (error) {
        res.status(500).json({error: error})
    }
})

module.exports = router