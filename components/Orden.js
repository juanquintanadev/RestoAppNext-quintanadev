import axios from "axios"
import Image from "next/image"
import { formatearDinero } from "../helpers"
import { toast } from "react-toastify"

function Orden({orden}) {

    const {id, nombre, total, pedido} = orden

    const completarOrden = async () => {
        try {
            await axios.post(`/api/ordenes/${id}`)
            toast.success('El pedido fue completado con exito')
        } catch (error) {
            toast.error('Hubo un error')
        }
    }

    return (
        <div className="border p-10 space-y-5">
            <h3 className="text-2xl">Orden Número: <span className="font-bold">{id}</span></h3>
            <p className="text-lg my-10">Cliente: <span className="font-bold">{nombre}</span></p>
            <div>
                {pedido?.map(articulo => (
                    <div 
                        className="py-3 flex border-b last-of-type:border-0 items-center gap-5"
                        key={articulo.id}
                    >
                        <div className="w-14">
                            <Image 
                                src={`/assets/img/${articulo.imagen}.jpg`} 
                                alt={`Imagen ${articulo.nombre}`} 
                                width={200}
                                height={400}
                            />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-amber-600">Plato: {articulo.nombre}</h3>
                            <p>Cantidad: {articulo.cantidad}</p>
                        </div>
                        
                    </div>
                ))}
            </div>
            <div className="md:flex md:items-center md:justify-between my-10">
                <p className="text-lg my-10">Total a pagar: <span className="font-bold">{formatearDinero(total)}</span></p>
                <button
                    type="button"
                    className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt0 py-3 px-10 uppercase rounded-md font-bold"
                    onClick={completarOrden}
                >
                    Completar Orden
                </button>
            </div>
        </div>
    )
}

export default Orden