import useSWR from 'swr'
import axios from 'axios'
import AdminLayout from '../layout/adminLayout'
import Orden from '../components/Orden'

function Admin() {

  // esta es la funcion que utilizaremos con swr
  const fetcher = () => axios('/api/ordenes').then(datos => datos.data)
  
  // data serian los datos de la consulta, la informacion json
  // el error es para debuggear e identificar donde esta el error
  // isLoading esta como true y una vez hecha la consulta se pasa a false y se puede mostrar un spinner mientras hacemos la consulta
  const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, {refreshInterval: 100})
  // el fetcher va a ser una funcio arrow o una funcion a parte
  // luego las opciones que hay muchas entre ellas para que se actualize la pagina con refreshInterval y le ponemos 100 mls y eso hace que se actualize y retire la orden realizada

  return (
    <AdminLayout
        pagina='ADMIN'
    >
        <h1 className="text-4xl font-black">Panel de administracion de pedidos</h1>
        <p className="text-2xl my-10">Revisa el pedido para sacar</p>

        {data?.length ? data.map(orden => (
          <Orden key={orden.id} orden={orden}/>
        )) : <p>No hay ordenes cargadas aún</p>}
    </AdminLayout>
    
  )
}

export default Admin