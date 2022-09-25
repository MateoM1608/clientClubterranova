import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../Redux/actions";
import Swal from "sweetalert2";
import reload from "../../Middlewares/Reload";


const ModalSignUp = ({ toggleModal, isOpenModal }) =>{

    const dispatch = useDispatch()

    const [ usuario, setUsuario ] = useState({
        username: "",
        password: ""
    })

    const [ error, setError ] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(usuario.username && usuario.password){
            if(error){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'La contraseña no coincide',
                    footer: ''
                }) 
            }else{
                dispatch(signUp(usuario))
                setUsuario({
                  username: "",
                  password: ""
                })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Usuario creado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    reload()
                })
            }
              
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Hay campos vacios',
                footer: ''
            }) 
        }
    }

    const handleChangeConfirm = (e) =>{
        if(usuario.password === e.target.value){
            setError(false)
        }else{
            setError(true)
        }
    }

    const handleChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
          })
    }

    return(
        <div className={ isOpenModal ? "modalSignUp_container" : "none"}>
            <div className="modalSignUp_divGlob">
                <h3 className="modalProd_title">Crear usuario</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="div_input_modalMod">
                        <label>Usuario:</label>
                        <input 
                            type="text"
                            name="username"
                            value={usuario.username}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa el usuario"
                        />
                    </div>
                    <div className="div_input_modalMod">
                        <label>Contraseña:</label>
                        <input 
                            type="password"
                            name="password"
                            value={usuario.password}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa la contraseña"
                        />
                    </div>
                    <div className="div_input_modalMod">
                        <label>Confirma contraseña:</label>
                        <input 
                            type="password"
                            name="password"
                            // value={usuario.password}
                            onChange={(e) => handleChangeConfirm(e)}
                            placeholder= "ingresa la contraseña"
                        />
                    </div>
                    <div className="error">
                        {
                            error ? 
                            <span>Las contraseña no coinciden</span> :
                            null
                        }
                    </div>
                    <div className="button_modalMod">
                        <button className="btn_form" type="submit">
                            Crear usuario   
                        </button>
                        <h3 className="btn_form"  onClick={() => toggleModal()}>Cerrar</h3>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default ModalSignUp;