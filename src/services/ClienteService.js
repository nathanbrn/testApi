const { PrismaClient } = require('@prisma/client')

class ClienteService {
    prisma = new PrismaClient()

    constructor() {}

    async buscarTodosOsClientes(req = Request, res = Response) {
        const cliente = await this.prisma.cliente.findMany()
        if(cliente.length > 0)
            res.status(200).json(cliente)
        else
            res.status(404).json({message: 'Nenhum cliente encontrado'})
    }

    async criarCliente(req = Request, res = Response) {
        const { id, email, name, password } = req.body
        try {
            const cliente = await this.prisma.cliente.create({
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
        } finally {
            async () => {
                await prisma.$disconnect()
            }
        }
    }

    async buscarClientePorId(req = Request, res = Response) {
        const { id } = req.params
        try {
            const cliente = await this.prisma.cliente.findUnique({
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
}

module.exports = ClienteService