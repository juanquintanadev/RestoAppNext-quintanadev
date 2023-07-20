// vamos a importar useRouter
import { useRouter } from "next/router"

// creamos un arreglo de objetos con los pasos que vamos a tener y con sus url correspondientes
const pasos = [
    {paso: 1, nombre: 'Menú', url: '/'},
    {paso: 2, nombre: 'Resumen', url: '/resumen'},
    {paso: 3, nombre: 'Total', url: '/total'},
]

function Pasos() {

    const router = useRouter()

    const calcularProgreso = () => {
        switch (router.pathname){
            case '/':
                return 15;
                break;
            case '/resumen':
                return 50;
                break;
            case '/total':
                return 100;
                break;
            default:
                break;
        }
    }

    return (
        <>
            <div className="flex justify-around mt-5">
                {pasos.map(paso => (
                    <button
                        type="button"
                        key={paso.paso}
                        className="text-2x font-bold"
                        onClick={() => {
                            router.push(paso.url)
                        }}
                    >
                        {paso.nombre}
                    </button>
                ))}
            </div>
            <div className="bg-gray-100 mb-10">
                <div className="rounded-full bg-amber-500 text-xs leading-none h-2 text-center text-white w-10" style={{width: `${calcularProgreso()}%`}}>
                </div>
            </div>
        </>
    )
}

export default Pasos