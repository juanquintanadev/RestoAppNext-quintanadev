import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"

import { formatearDinero } from "../helpers"

function Producto({producto}) {

  // funcion que setea el producto seleccionado
  const {handleSetProducto, handleChangeModal} = useQuiosco()

  // producto individual que se va mostrando en los grids
  // tambien lo vamos a usar para seleccionar un producto
  const {nombre, imagen, precio} = producto

  return (
    <div className="border p-10 w-full h-full">
        <Image 
          className="m-auto"
          src={`/assets/img/${imagen}.jpg`} 
          alt={`Imagen ${nombre}`}
          width={200}
          height={200}
        />
        <div className="p-5 overflow-hidden w-full">
          <h3 className="font-bold text-2xl text-center">{nombre}</h3>
          <p className="mt-5 font-black text-2xl text-amber-500 text-center">{formatearDinero(precio)}</p>

          <button
            type="button"
            className="bg-indigo-400 uppercase font-bold block p-5 mt-10 rounded-md hover:bg-indigo-500 w-full text-white"
            onClick={() => {
              handleSetProducto(producto)
              handleChangeModal()
            }}
          >
            Seleccionar
          </button>
        </div>
    </div>
  )
}

export default Producto