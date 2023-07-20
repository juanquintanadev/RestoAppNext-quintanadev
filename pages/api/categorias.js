import { PrismaClient } from "@prisma/client"

// req es lo que enviamos como siempre
// el res es lo que nos devuelve el servidor
export default async function handler(req, res) {

  const prisma = new PrismaClient()
  try {
    const categorias = await prisma.categoria.findMany({
      include: {
        productos: true
      }
    })
    res.status(200).json(categorias)
  } catch (error) {
    console.log(error)
  }
}
