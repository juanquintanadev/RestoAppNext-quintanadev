import { useEffect, useState } from "react"

import Image from "next/image"

import { formatearDinero } from "../helpers"

import useQuiosco from "../hooks/useQuiosco"

function ModalProducto() {

    const [cantidad, setCantidad] = useState(1)
    const [edicion, setEdicion] = useState(false)
    const {producto, handleChangeModal, handleAgregarPedidoClick, pedido} = useQuiosco()

    useEffect(() => {
        if(pedido.some(articulo => articulo.id === producto.id)) {

            // .find devuelve el objeto que estamos buscando 
            const productoEdicion = pedido.find(articulo => articulo.id === producto.id)

            // esta edicion es para cambiar el nomnbre al boton de agregar pedido
            setEdicion(true)
            setCantidad(productoEdicion.cantidad)
        }
    }, [producto, pedido])

    return (
        <div className="md:flex gap-10">
            <div className="md:w-1/3">
                <Image
                    src={`/assets/img/${producto.imagen}.jpg`}
                    alt={`imagen ${producto.nombre}`}
                    width={600}
                    height={700}
                />
            </div>
            <div className="md:w-2/3">

                <div className="flex justify-end">
                    <button
                        className="font-balck uppercase text-4xl"
                        type="button"
                        onClick={handleChangeModal}
                    >X</button>
                </div>
                
                <h1 className="text-3xl font-bold">{producto.nombre}</h1>
                <p className="mt-5 font-black text-4xl text-amber-500">{formatearDinero(producto.precio)}</p>
                <p className="mt-2">Mínimo 1 y Máximo 5</p>
                <div className="flex justify-around mt-5">
                    <button
                        type="button"
                        onClick={() => {
                            if(cantidad <= 1) return
                            setCantidad(cantidad - 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15"/>
                        </svg>
                    </button>
                    <p className="w-20 my-auto p-5 text-center text-white font-black border shadow-md bg-gray-400" >{cantidad}</p>
                    <button
                    type="button"
                        onClick={() => {
                            if(cantidad >= 5) return
                            setCantidad(cantidad + 1)
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </button>
                </div>
                <button
                    type="button"
                    className="block w-full font-bold bg-indigo-600 hover:bg-indigo-800 px-2 py-5 mt-2 uppercase rounded-md"
                    onClick={() => {
                        // le pasamos a la funcion un objeto con la copia del producto y le agregamos la cantidad como campo
                        handleAgregarPedidoClick({...producto, cantidad})
                        handleChangeModal()
                    }}
                >
                    {edicion ? 'Guardar Cambios' : 'Agregar al pedido'}
                </button>
            </div>
        </div>
    )
}

export default ModalProducto