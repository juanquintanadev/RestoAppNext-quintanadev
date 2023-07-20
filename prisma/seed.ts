// importamos los archivos que tienen los objetos para importarlos a la bd
import {categorias} from './data/categorias'
import {productos} from './data/productos'

// importmaos el prismaClient, es para trabajar con la bd desde prisma
import {PrismaClient} from '@prisma/client'

// instanciamos prisma
const prisma = new PrismaClient()

// tipado de ts esto devuelve un Promise pero no retorna nada void
// tipo promise y no retorna nada
const main = async () : Promise<void> => {
    try {

        // a la tabla de categoria, con createMany es para agregar muchos, le agregamos el arreglo de objetos importados arriba
        await prisma.categoria.createMany({
            data: categorias // este data lo requiere prisma
        })
        await prisma.producto.createMany({
            data: productos
        })
    } catch (error) {
        console.log(error)
    }
}

main()
