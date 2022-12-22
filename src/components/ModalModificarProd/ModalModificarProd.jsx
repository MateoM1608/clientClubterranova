import React , { useState } from "react";
import { useDispatch } from "react-redux";
import { modifyProduct } from "../../Redux/actions";
import Swal from 'sweetalert2'
import UpdateProduct from "../../Middlewares/UpdateProduct";
import reload from '../../Middlewares/Reload'



const ModalModificarProd = ({isOpenModificar, toggleModalModificar,idProdCard}) => {

    const dispatch = useDispatch()
    const [ Modificar, setModificar ] = useState({
        nombre: "",
        precio:"",
        cantidad: "",
        sumarCantidad:""
    })

    const handleChange = (e) => {
        setModificar({
            ...Modificar,
            [e.target.name]: e.target.value
          })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const bodyResponse = UpdateProduct(Modificar.nombre, Modificar.precio, Modificar.cantidad, Modificar.sumarCantidad, idProdCard)
        if(bodyResponse){
            dispatch(modifyProduct(bodyResponse,idProdCard ))
            setModificar({
                nombre: "",
                precio: "",
                cantidad:"",
                sumarCantidad:""
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto modificado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            .then(res => {
                reload()
            })
            toggleModalModificar()
        }
    }

    const onClick = () => {
        toggleModalModificar()
        setModificar({
            nombre: "",
            precio:"",
            cantidad: "",
            sumarCantidad:""
        })
    }

    return (
        <div className={isOpenModificar? "modalProd_container": "none"}>
            <div className="modal_divGlob">
                <h3 className="modalProd_title">Modificar producto</h3>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="div_input_modalMod">
                        <label>Nombre:</label>
                        <input 
                            type="text"
                            name="nombre"
                            value={Modificar.nombre}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa nombre"
                        />
                    </div>
                    <div className="div_input_modalMod">
                        <label>Precio:</label>
                        <input 
                            type="number"
                            name="precio"
                            value={Modificar.precio}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa precio"
                        />
                    </div>
                    <div className="div_input_modalMod">
                        <label>Cantidad que ingresa:</label>
                        <input 
                            type="number"
                            name="sumarCantidad"
                            value={Modificar.sumarCantidad}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa cantidad"
                        />
                    </div>
                    <div className="div_input_modalMod">
                        <label>Cantidad total:</label>
                        <input 
                            type="number"
                            name="cantidad"
                            value={Modificar.cantidad}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa cantidad"
                        />
                    </div>
                    <div className="button_modalMod">
                        <button type="submit" className="btn_form">Modificar producto</button>
                        <h3 onClick={() => onClick()} className="btn_form">Cancelar</h3>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalModificarProd;