import Image from "next/image"
import useQuiosco from "../hooks/useQuiosco"
import Categoria from "./Categoria"

function Sidebar() {

  const {categorias} = useQuiosco()

  return (
    <>
        <Image alt="imagen sidebar" width={300} height={100} src="/assets/img/logo.svg"/>

        <nav className="mt-10">
          {categorias?.map(categoria => (
            <Categoria key={categoria.id} categoria={categoria}/>
          ))}
        </nav>
        
    </>
  )
}

export default Sidebar