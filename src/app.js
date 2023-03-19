const express = require('express')
const app = express()
const { PrismaClient } = require('@prisma/client')

const port = 3001
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

async function criarUsuario() {
    const usuario = await prisma.usuario
    const { id, email } = usuario
    if(await usuario.findMany()) {
        console.log('Usuário já existe');
    } else {
        usuario.create({
            data: {
                id: 45,
                nome: 'João',
                email: 'joao@mail.com',
                password: '123456'
            }
        })
    }
}


// criarUsuario()
//     .then(() => {
//     prisma.$disconnect()
//     })
//     .catch((err) => {
//     console.log(err)
//     prisma.$disconnect()
//     process.exit(1)
//     })

async function buscarUsuario() {
    const usuario = await prisma.usuario.findMany()
    if(usuario.length > 0)
        console.log(usuario)
    else
        console.log('Não existe usuário cadastrado')
}

buscarUsuario()
    .then(() => {
    prisma.$disconnect()
    })
    .catch((err) => {
    console.log(err)
    prisma.$disconnect()
    process.exit(1)
    })



app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})