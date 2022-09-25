import React ,{ useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import  env  from 'react-dotenv';

// ------ Importar Componentes y vistas
import Menu from "../../components/Menu/Menu";
import Productos from "../Productos/Productos";
import Ventas from "../../views/Ventas/Ventas";
import Inventario from "../Inventario/Inventario";
import Sidebar from "../../components/Sidebar/Sidebar";
import InformeVentas from "../InformeVentas/InformeVentas";
import ModalLogOut from "../../components/ModalLogOut/ModalLogOut";
import Usuarios from "../Usuarios/Usuarios";
import Page404 from "../Page404/Page404";

const Inicio = () => {

    const [ isOpenLogOut, setIsOpenModal] = useState(false)

    const history = useNavigate()

    const toggleModalLogOut = () => {
        setIsOpenModal(!isOpenLogOut)

        const actualRut = window.location.pathname
        console.log(actualRut)
    }

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    useEffect(() => {
        if(!userInfo){ 
            console.log('entra')
            history("/login")
        }
    },[])


    return(
        <div >
            <div>
                <Menu/>
            </div>
                <Sidebar
                    toggleModalLogOut={toggleModalLogOut}
                />
            <div className="inicio_container">

                <Routes>

                    <Route path="/ventas"  element={<Ventas/>}/>
                    <Route path="/inventario"  element={<Inventario/>}/>
                    <Route path="/productos"  element={<Productos/>}/>
                    <Route path="/informe-ventas"  element={<InformeVentas/>}/>
                    <Route path="/usuarios" element={<Usuarios/>}/>
                    <Route path="/" element={<Navigate to="/ventas"/>}/>
                    <Route path="/404" element={<Page404/>} />
                    <Route path="*" element={<Navigate to="/404"/>}/>
                </Routes>

                <ModalLogOut
                    toggleModalLogOut={toggleModalLogOut}
                    isOpenLogOut={isOpenLogOut}
                />
            </div>
        </div>
    )
}

export default Inicio;