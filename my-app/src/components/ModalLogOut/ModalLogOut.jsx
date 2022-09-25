import React from "react";
// import { useDispatch } from 'react-redux'
// import { logOut } from "../../Redux/actions";
import Swal from "sweetalert2";
import reload from '../../Middlewares/Reload'

const ModalLogOut = ({ toggleModalLogOut, isOpenLogOut }) => {

    // const dispatch = useDispatch()

    const handleClick = () =>{
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Inicio de sesión correcto',
            showConfirmButton: false,
            timer: 1500
        }).then(res => {
            localStorage.removeItem("userInfo");
            reload()
        })
    }

    return(
        <div className={isOpenLogOut ? "logOut_container": "none"}>
            <div className="logOut_divGlob">
                <h3>¿Quiere cerrar sesión?</h3>
                <div>
                    <button onClick={() => handleClick()}className="logOut_btn1">Si</button>
                    <button onClick={() => toggleModalLogOut() }className="logOut_btn2">No</button>
                </div>
            </div>
        </div>
    )
}

export default ModalLogOut;