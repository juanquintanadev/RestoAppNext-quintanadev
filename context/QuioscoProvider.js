import { useState, createContext, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import {toast} from 'react-toastify'

const QuioscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedido, setPedido] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    // vamos a iniciar el router para mandar al inicio cuando presionemos en cualquier categoria
    const router = useRouter()


    const obtenerCategorias = async () => {
        try {
            const {data} = await axios('/api/categorias')
            setCategorias(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickCategoria = id => {
        
        // vamos a obtener los datos de la categoria actual
        const categoria = categorias.filter(cat => cat.id === id)
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        setCategoriaActual(categorias[0])
    }, [categorias])

    // el total cada vez que cambie el pedido vamos a calcularlo
    useEffect(() => {
        if(typeof window !== 'undefined') {
            const nuevoTotal = pedido.reduce((total, prod) => total + (prod.cantidad * prod.precio), 0)
            setTotal(nuevoTotal)
        }
    }, [pedido])

    const handleSetProducto = producto => {
        setProducto(producto)
    }

    // funcion para mostrar u ocultar el modal con el producto seleccionado
    const handleChangeModal = () => {
        setModal(!modal)
    }

    const handleEditarCantiddades = id => {
        // como en el modal utilizamos el state de producto, tenemos que actualizarlo aca
        const productoActualizar = pedido.filter(articulo => articulo.id === id)

        // como filter nos trae un arreglo entonces utilizamos la posicion 0
        setProducto(productoActualizar[0])

        // mostramos el modal
        setModal(!modal)
    }

    const handleEliminarProducto = id => {
        // nos traemos todos los productos distintos al id que le pasamos
        const pedidoActualizado = pedido.filter(articulo => articulo.id !== id)
        setPedido(pedidoActualizado)
    }

    // aca vamos a mandar la orden a la bd
    const colocandoOrden = async e => {
        e.preventDefault();

        try {

            // enviamos los datos al servidor
            await axios.post('/api/ordenes',{
                pedido,
                nombre,
                total,
                fecha: Date.now().toString()
            })

            // luego vamos a reiniciar la app dejando los states en su estado original

            // iniciamos en la primer categoria
            setCategoriaActual(categorias[0])

            // reiniciamos pedido para que no tenga el pedido de la persona anterior
            setPedido([])

            // tambien para que no este el nombre de la persona anterior
            setNombre('')

            // tambien reiniciamos el total
            setTotal(0)

            toast.success('Pedido realizado correctamente')

            setTimeout(() => {
                router.push('/')
            }, 2000);

            
        } catch (error) {
            console.log(error)
        }

    }

    // podemos aplicar destructuring del producto que entra, y le decimos de donde tomamos la copia
    // lo que colocamos adelante es lo que no necesitamos por lo tanto lo quitamos de la siguiente manera
    // y tomamos una copia en un objeto nuevo sin las propiedades de adelante
    const handleAgregarPedidoClick = ({categoriaId, ...producto}) => {

        // si el producto existe
        if(pedido.some(articulo => articulo.id === producto.id)) {
            
            // si el producto existe actualizamos la cantidad
            // si el id es igual retornamos el producto con la nueva cantidad
            // si es id distinto retornamos el mismo articulo que estaba en pedido
            const pedidoActualizado = pedido.map(articulo => articulo.id === producto.id ? producto : articulo)
            setPedido(pedidoActualizado)
            toast.success('Editado correctamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        } else {
            setPedido([...pedido, producto])
            toast.success('Agregado correctamente', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
 
    return (
        <QuioscoContext.Provider
            value={{
                categorias,
                handleClickCategoria,
                categoriaActual,
                handleSetProducto,
                producto,
                handleChangeModal,
                modal,
                handleAgregarPedidoClick,
                pedido,
                handleEditarCantiddades,
                handleEliminarProducto,
                nombre,
                setNombre,
                colocandoOrden,
                total,
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext