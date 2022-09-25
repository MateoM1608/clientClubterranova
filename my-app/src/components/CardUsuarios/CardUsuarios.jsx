import React from "react";
import { useDispatch } from 'react-redux'
import reload from "../../Middlewares/Reload";

import { IconContext } from "react-icons";
import { MdOutlineCancel } from 'react-icons/md'
import Swal from "sweetalert2";
import { deleteUser,  } from "../../Redux/actions";

const CardUsuarios = ({ username, id, index }) => {

    const dispatch = useDispatch()


    const  onClick = () =>{
        Swal.fire({
            title: 'Está seguro?',
            text: "El usuario sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(deleteUser(id))
              Swal.fire(
                'Eliminado!',
                'El usuario ha sido eliminado correctamente',
                'success'
              ).then(res => {
                reload()
              })
            }
          })
    }

    return(
        <div className={ index%2 === 0 ?"cardInv_container": "cardInv_container2"}>
            <h3 className="user_card">{username}</h3>
            <div className="deleteUser">
                <IconContext.Provider value={{size:"25px", color: "red"}}>
                    <div onClick={() => onClick()}>
                        <MdOutlineCancel/>
                    </div>
                </IconContext.Provider>
            </div>
        </div>
    )
}

export default CardUsuarios;