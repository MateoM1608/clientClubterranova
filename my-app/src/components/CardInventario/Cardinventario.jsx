import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import numeral from 'numeral'


import { IconContext } from "react-icons";
import { GiBoxUnpacking } from 'react-icons/gi'

const CardInventario = ({producto, precio, cantidad, id, toggleModalModificar, setIdProdCard, index}) => {

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const onClick = () => {
        if(userInfo.user.id == 1){
            toggleModalModificar()
            setIdProdCard(id)
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Función disponible para el Administrador',
                showConfirmButton: false,
                timer: 1100
              })
        }
    }

    return (
        <div className={ index%2 === 0 ?"cardInv_container": "cardInv_container2"}>
            <h3 className="cardInv_producto">{producto}</h3>
            <h3 className="cardInv_precio">{numeral(precio).format('$0,0')}</h3>
            <h3 className="cardInv_cantidad">{cantidad}</h3>
            <div className="cardInv_log">
                <IconContext.Provider value={{size:"13px", color: "white"}}>
                    <div onClick={() => onClick()}>
                        <GiBoxUnpacking/>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
};

export default CardInventario;