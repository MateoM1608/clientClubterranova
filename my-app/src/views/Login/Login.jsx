import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import { authenticate } from '../../Redux/actions/index'
import { useNavigate } from "react-router-dom";



const Login = () => {

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;

  const history = useNavigate()


    const dispatch = useDispatch()
    const [ login , setLogin ] = useState({
        username: "",
        password: ""
      })
        
      const handleChange =(e) =>{
        setLogin({
          ...login,
          [e.target.name]: e.target.value
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        if(login.password && login.username){
          dispatch(authenticate(login))
          setLogin({
            username: "",
            password: ""
          })
        }else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Usuario y/o contraseña esta vacío',
            showConfirmButton: false,
            timer: 1500
          })
        }
    
      }

      useEffect(() => {
        if(userInfo){ 
          history("/")
        }
      },[])
    
      return (
        <div className="login_container">
          <div className="div_img">
            <img src="https://i.postimg.cc/y6hNJNpc/Whats-App-Image-2022-09-24-at-12-34-59-PM.jpg" alt="img" />
          </div>
          <div className="triangulo"></div>
              <h2>BIENVENIDO A CLUB TERRANOVA</h2>
              <form onSubmit={(e) => handleSubmit(e)}> 
                  <div className="login_form-element">
                    <label>Usuario:</label>
                      <input 
                        type="text" 
                        name="username" 
                        value={login.username}
                        onChange={ (e) => handleChange(e)}
                        placeholder="Ingrese usuario" 
                      />
                  </div>
                  <div className="login_form-element">
                      <label>Contraseña:</label>
                      <input 
                        type="password" 
                        name="password"
                        value={login.password}
                        onChange={ (e) => handleChange(e)}
                        placeholder="Ingrese Contraseña" 
                      />
                  </div>
                  <button className="btn_form" type="submmit">Iniciar sesión</button>
              </form>
        </div>
      )
};

export default Login;