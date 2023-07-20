import useQuiosco from "../hooks/useQuiosco"
import Image from "next/image"

function Categoria({categoria}) {

    const {handleClickCategoria, categoriaActual} = useQuiosco()
 
    const {nombre, icono, id} = categoria

    return (
        // si la categoria que nosotros hacemos click y almacenamos en categoriaActual es igual al id que extraemos de una de las categorias que les pasamos entonces agregamos un bg
        <div className={`${categoriaActual?.id === id ? 'bg-amber-400' : ''} flex items-center gap-4 w-full border px-5 hover:bg-amber-400`}>
            <Image 
                src={`/assets/img/icono_${icono}.svg`}
                alt={`Imagen ${nombre}`}
                width={100}
                height={100}
                className="mt-3 ml-5"
            />

            <button
                onClick={() => {
                    handleClickCategoria(id)
                }}
                type="button"
                className="text-xl font-bold uppercase hover:cursor-pointer w-full overflow-hidden"
            >
                {nombre}
            </button>
        </div>
    )
}

export default Categoria