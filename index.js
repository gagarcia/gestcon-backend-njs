// configuracao inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

const Projeto = require('./models/Projeto')
const Area = require('./models/Area')

// leitura de JSON
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// cors
app.use(cors())

// rotas Projeto
const projetosRoutes = require('./routes/projetosRoutes')

app.use('/projetos', projetosRoutes)

// Rotas Areas

const areasRoutes = require('./routes/areasRoutes')

app.use('/areas', areasRoutes)

// Rota inicial
app.get('/', (req,res) => {
    res.json({ message: 'Ola mundo!' })
})

// NL0dpB1QeGchGKqe
// mongodb+srv://gagarcia:NL0dpB1QeGchGKqe@caseporto.ifwh1.mongodb.net/projetosdb?retryWrites=true&w=majority

// entrega de porta
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@caseporto.ifwh1.mongodb.net/projetosdb?retryWrites=true&w=majority`)
.then(() => {
    console.log("conectado ao mongo DB!")
    app.listen(3000)
})
.catch((err) => console.log(err))
