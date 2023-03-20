const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class ClienteService {

    constructor() {}

    async buscarTodosOsClientes(req = Request, res = Response) {
        const cliente = await prisma.cliente.findMany()
        if(cliente.length > 0)
            res.status(200).json(cliente)
        else
            res.status(404).json({message: 'Nenhum cliente encontrado'})
    }

    async criarCliente(req = Request, res = Response) {
        const { id, email, name, vendedorId } = req.body
        try {
            const cliente = await prisma.cliente.create({
                data: {
                    id,
                    email,
                    name,
                    vendedorId
                }
            })
            res.status(201).json(cliente)
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Erro ao criar cliente'})
        }
    }

    async buscarClientePorId(req = Request, res = Response) {
        const { id } = req.params
        try {
            const cliente = await prisma.cliente.findUnique({
                where: {
                    id: Number(id)
                }
            })
            res.status(200).json(cliente)
        } catch(err) {
            console.log(err)
            res.status(404).json({message: 'Nenhum cliente encontrado'})
        }
    }

    async deletarCliente(req = Request, res = Response) {
        const { id } = req.params
        try {
            const cliente = await prisma.cliente.delete({
                where: {
                    id: Number(id)
                }
            })
            res.status(204).json({message: 'Cliente deletado com sucesso', cliente})
        } catch(err) {
            console.log(err)
            res.status(404).json({message: 'Não existe este cliente'})
        }
    }
}

module.exports = ClienteService