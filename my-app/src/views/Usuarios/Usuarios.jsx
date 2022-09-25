import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../Redux/actions";
import CardUsuarios from "../../components/CardUsuarios/CardUsuarios";
import ModalSignUp from "../../components/ModalSignUp/ModalSignUp";
import { IconContext } from "react-icons";
import { AiFillThunderbolt } from 'react-icons/ai'

const Usuarios = () => {

    const dispatch = useDispatch()

    const [ isOpenModal, setIsOpenModal ] = useState(false)
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const allUsers = useSelector(state => state.usuarios)

    const toggleModal = () =>{
        setIsOpenModal(!isOpenModal)
    }

    useEffect(() =>{
        dispatch(getUsers())
    },[])

    if(userInfo.user.id != 1){ 
        return(
            <div className="page404_container">
                <h1>No tiene permitido ingresar a esta pagina</h1>
            </div>
        )
    }


    return(
        <div>
            <div className="Title_global">
                <h1>Usuarios</h1>
            </div>
            <div className="div_Global">
                <div className="Subtitle_global">
                    <h3>Usuarios registrados</h3>
                </div>
                <div className="tabla_users">
                    <div className="row_user">
                        <h2>Nombre usuario</h2>
                        <IconContext.Provider value={{size:"20px", color: "rgb(59, 59, 59)"}}>
                            <div>
                                <AiFillThunderbolt/>
                            </div>
                        </IconContext.Provider>
                    </div>
                    {
                        allUsers && allUsers.map( (u,index) => {
                            if(u.id !== 1){
                                return (
                                    <CardUsuarios
                                        id={u.id}
                                        username={u.username}
                                        key={u.id}
                                        index={index}
                                    />
                                )
                            }
                        }
                    )}
                </div>
                <button  className="btn_form" onClick={() => toggleModal()}>Crear  usuario</button>
            </div>
            <ModalSignUp
                toggleModal={toggleModal}
                isOpenModal={isOpenModal}
            />
        </div>
    )
}

export default Usuarios;