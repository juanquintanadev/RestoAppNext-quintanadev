import { PrismaClient } from "@prisma/client"

export default async function handler(req, res) {

    const prisma = new PrismaClient()

    // vamos a filtrar por el metodo post
    if(req.method === 'POST') {
        // obtenemos el id como viene por el routing dinamico desde el req
        const {id} = req.query

        // retornariamos la orden actualizada para colocarla en el lugar de las hechas
        // convertimos el id en un entero porque en el query sale como str
        const ordenActualizada = await prisma.orden.update({
            where : {
                id: parseInt(id)
            },
            data : {
                estado: true
            }
        })

        res.status(200).json(ordenActualizada)

    }
}