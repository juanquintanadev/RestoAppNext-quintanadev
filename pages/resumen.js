import Layout from "../layout/layout";
import Articulo from "../components/Articulo";
import useQuiosco from "../hooks/useQuiosco";


export default function Resumen() {

    const {pedido} = useQuiosco()

    return (
        <Layout pagina='Resumen'>
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu pedido</p>
            {pedido?.length === 0 ? (
                <p className="text-2xl text-red-600">Todavia no tienes pedidos</p>
            ) 
            : 
            ( pedido?.map(articulo => (
                <Articulo key={articulo.id} articulo={articulo}/>
            )))
            }
        </Layout>
    )
}