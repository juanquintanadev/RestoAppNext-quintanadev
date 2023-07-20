import Head from "next/head"
import ReactModal from "react-modal";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Sidebar from "../components/Sidebar"
import ModalProducto from "../components/ModalProducto";
import Pasos from "../components/Pasos";

import useQuiosco from "../hooks/useQuiosco";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

ReactModal.setAppElement('#__next')

export default function Layout({children, pagina}) {

    const {modal} = useQuiosco()

    return (
        <>
            <Head>
                <title>Café - {pagina}</title>
                <meta name="description" content="Quiosco Cafeterá" />
            </Head>
            {modal && <ReactModal
                        isOpen={modal}
                        style={customStyles}
                    >
                        <ModalProducto/>
                    </ReactModal>
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            
            
            <div className="md:flex">

                <aside className="md:w-4/12 xl:w-1/4 2xl:w-1/5">
                    <Sidebar/>
                </aside>
                
                <main 
                    className="md:w-8/12 xl:w-3/4 2xl:w-4/5 h-screen overflow-y-scroll"
                >
                    <Pasos/>
                    <div className="p-5">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}
  