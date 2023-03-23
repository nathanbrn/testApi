const express = require('express')
const app = express()
const router = require('./routes')
var cors = require('cors')


const port = 3001

app.use(cors({
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}))

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(router)

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})