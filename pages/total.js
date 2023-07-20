import { useEffect, useCallback } from "react";
import { formatearDinero } from "../helpers";
import Layout from "../layout/layout";
import useQuiosco from "../hooks/useQuiosco";


export default function Total() {

    // requerimos el pedido para comprobar que exista un pedido y habilitemos el boton de enviar orden
    const {pedido, nombre, setNombre, colocandoOrden, total} = useQuiosco()

    // esta funcion comprueba si hay algun pedido o esta vacio el arreglo
    // y se ejecuta unicamnte cuando el pedido cambie
    // la necesitamos declara por fuera del effect para llamarla con el disabled del button enviar pedido
    const comprobarPedido = useCallback(() => pedido.length === 0 || nombre === '', [pedido, nombre])

    // con el useEffect comprobamos por los cambios de pedido 
    // tambien como dependencia nos pide que insertemos la funcion
    useEffect(() => {
        comprobarPedido()
        
        // son requeridos las dos dependencias por react para comprobar la fn
    }, [pedido, comprobarPedido])



    return ( 
        <Layout pagina='Total del pedido'>
            <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
            <p className="text-2xl my-10">Confirmar tu pedido</p>
            <form 
                action=""
                onSubmit={colocandoOrden}    
            >
                <div>
                    <label className="block uppercase text-slate-800 font-bold text-xl" htmlFor="nombre">Nombre: </label>
                    <input 
                        type="text" 
                        className="bg-gray-200 w-full lg:w-2/3 p-2 rounded-md" 
                        placeholder="Escribe tu nombre para ser llamado" 
                        id="nombre"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                    />
                        
                </div>
                <div className="mt-10">
                    <p className="text-2xl">Total a pagar: <span className="font-bold">{formatearDinero(total)}</span></p>
                </div>
                <div className="mt-5">
                    <input
                        // si pedido esta como vacio entonces dejamos el bg como disabled y si hay contenido en pedido entonces dejamos el boton habilitado con clases lo hacemos
                        className={`${comprobarPedido() ? 'bg-indigo-200' : 'bg-indigo-600  cursor-pointer hover:bg-indigo-800' } w-full lg:w-auto px-5 py-2 rounded-md uppercase font-bold text-white`}
                        type="submit" 
                        value='Confirmar Pedido'
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}