import { PrismaClient } from "@prisma/client"

// lo que hagamos aca va a estar en el lado del servidor
export default async function handler(req, res) {

    const prisma = new PrismaClient()

    // obtener ordenes

    if(req.method === 'GET') {
        try {
            const ordenes = await prisma.orden.findMany({
                where: {
                    estado: false
                }
            })
            res.status(200).json(ordenes)
        } catch (error) {
            console.log(error)
        }
    }


    // crear ordenes nuevas

    if(req.method === 'POST') {
        try {
            const orden = await prisma.orden.create({
                data: {
                    nombre: req.body.nombre,
                    total: req.body.total,
                    pedido: req.body.pedido,
                    fecha: req.body.fecha,
                }
            })
            res.status(200).json(orden)
        } catch (error) {
            console.log(error)
        }
    }
}
