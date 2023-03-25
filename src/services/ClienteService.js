const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

class ClienteService {

    constructor() {}

    async buscarTodosOsClientes(req = Request, res = Response) {
        const cliente = await prisma.cliente.findMany()
        
        if (cliente.length > 0) {
            return res.status(200).json(cliente)
        }
            
        return res.status(404).json({message: 'Nenhum cliente encontrado'})
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
            res.status(400).json({message: 'Erro ao criar cliente, todos os campos são obrigatórios'})
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

    async atualizarCliente(req = Request, res = Response) {
        const { id } = req.params
        const { email, name, vendedorId } = req.body
        try {
            const cliente = await prisma.cliente.update({
                where: {
                    id: Number(id)
                },
                data: {
                    email,
                    name,
                    vendedorId
                }
            })
            res.status(201).json({message: "cliente atualizado com sucesso"})
        } catch(err) {
            console.log(err)
            res.status(500).json({ message: 'Erro ao atualizar cliente'})
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

            res.status(200).json({message: 'Cliente deletado com sucesso', client: cliente})
        } catch(err) {
            console.log(err)
            res.status(500).json({message: 'Erro ao deletar cliente'})
        }
    }

    async listarClientePorUsuario(req = Request, res = Response) {
        const { id } = req.params
        try {
            const cliente = await prisma.cliente.findMany({
                where: {
                    vendedorId: Number(id)
                }
            })
            res.status(200).json(cliente)
        } catch(err) {
            console.log(err)
            res.status(404).json({message: 'Nenhum cliente encontrado'})
        }
    }
}

module.exports = ClienteService