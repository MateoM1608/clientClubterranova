import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


//-------- Iconos --------- 
import { IconContext } from "react-icons";
import { MdProductionQuantityLimits, MdOutlineInventory } from 'react-icons/md'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { BsBoxSeam } from 'react-icons/bs'
import { HiOutlineUsers } from 'react-icons/hi'


const Menu = () => {

    const history = useNavigate()

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;
    const idUser = userInfo && userInfo.user.id

    const handleClikc = (url) => {
        history(`/${url}`)
    }


    return (
        <div className="menu_container">
            <div className="menu_lateral">
                <div onClick={() => handleClikc("")} className="menu_opciones">
                    <IconContext.Provider value={{size:"20px", color: "rgb(187, 187, 187)"}}>
                        <div>
                            <AiOutlineShoppingCart/>
                        </div>
                    </IconContext.Provider>
                    <h2>Ventas</h2>
                </div>
                <div onClick={() => handleClikc("inventario")} className="menu_opciones">
                    <IconContext.Provider value={{size:"20px", color: "rgb(187, 187, 187)"}}>
                        <div>
                            <MdOutlineInventory/>
                        </div>
                    </IconContext.Provider>
                    <h2>Inventario</h2>
                </div>
                <div onClick={() => handleClikc("informe-ventas")} className="menu_opciones">
                    <IconContext.Provider value={{size:"20px", color: "rgb(187, 187, 187)"}}>
                        <div>
                            <MdProductionQuantityLimits/>
                        </div>
                    </IconContext.Provider>
                    <h2>Informe Ventas</h2>
                </div>
                <div onClick={() => handleClikc("productos")} className={ idUser == 1?"menu_opciones": "none"}>
                    <IconContext.Provider value={{size:"20px", color: "rgb(187, 187, 187)"}}>
                        <div>
                            <BsBoxSeam/>
                        </div>
                    </IconContext.Provider>
                    <h2>Productos</h2>
                </div>
                <div onClick={() => handleClikc("usuarios")} className={ idUser == 1?"menu_opciones": "none"}>
                    <IconContext.Provider value={{size:"20px", color: "rgb(187, 187, 187)"}}>
                        <div>
                            <HiOutlineUsers/>
                        </div>
                    </IconContext.Provider>
                    <h2>Usuarios</h2>
                </div>
            </div> 
        </div>
    )
}

export default Menu;