const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class CriarUsuario {
    id
    email
    name
    password

    constructor(id, email, name, password) {
        this.id = id
        this.email = email
        this.name = name
        this.password = password
    }

    async execute() {
        const usuario = await prisma.usuario.create({
            data: {
                id: this.id,
                email: this.email,
                name: this.name,
                password: this.password
            }
        })
        return usuario
    }
}

module.exports = CriarUsuario