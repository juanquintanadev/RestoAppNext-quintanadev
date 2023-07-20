import Layout from "../layout/layout"
import useQuiosco from "../hooks/useQuiosco"
import Producto from "../components/Producto"

export default function Home() {

  const {categoriaActual} = useQuiosco()

  return (

    // muy importante el optional chaining
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black mt-10 text-center">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10 font-bold">
        Elige y personaliza tu pedido a continuacion
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 content-center justify-items-center">
        {categoriaActual?.productos?.map(producto => (
          <Producto key={producto?.id} producto={producto}/>
        ))}
      </div>
      

    </Layout>
  )
}
