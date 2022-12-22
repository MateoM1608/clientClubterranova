import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllProductoSelect, getAllProducto, postVentas } from "../../Redux/actions";
import Swal from "sweetalert2";
import Select from 'react-select'
import reload from '../../Middlewares/Reload'

 
const Ventas = () => {

    const dispatch = useDispatch()
    const [ venta, setVenta ] = useState({
        cantidadAVender: "",
        idProducto: "",
    })
    const allProductsSelect = useSelector(state => state.productosSelect)
    const allProducts = useSelector(state => state.allProducts)
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;


    const handleSubmit = (e) => {
        e.preventDefault()
        if(venta.idProducto && venta.cantidadAVender){
            const findProducto = allProducts.find(e => e.id == venta.idProducto)
            if(findProducto.cantidad >= venta.cantidadAVender){
                dispatch(postVentas({
                    cantidadAVender: venta.cantidadAVender,
                    usuario: userInfo.user.username
                },venta.idProducto))
                setVenta({
                    ...venta,
                    idProducto: "",
                    cantidadAVender: ""
                  })
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Venta realizada correctamente',
                    showConfirmButton: false,
                    timer: 800
                  }).then(res => {
                    dispatch(getAllProductoSelect())
                    reload()
                    
                  })
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No tiene la cantidad que desea vender',
                    footer: ''
                })
            }
        }else{
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Faltan datos para realizar venta',
                showConfirmButton: false,
                timer: 1100
              })
        }
    }

    const handleChangeVenta = ({ value }) =>{
        setVenta({
            ...venta,
            idProducto: value
        })
    }

    const handleChange = (e) =>{
        setVenta({
          ...venta,
          [e.target.name]: e.target.value
        })
      }

    useEffect(() => {
        dispatch(getAllProductoSelect())
        dispatch(getAllProducto())
    },[])


    return(
        <div className="ventas_container">
            <div className="Title_global">
                <h1>Ventas</h1>
            </div>
            <div className="div_Global">
                <div className="Subtitle_global">
                    <h3>Realizar venta</h3>
                </div>
                <div className="venta_div">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="div_input_form">
                            <label>Producto:</label>
                            <div className="select-react">
                                <Select 
                                    defaultValue={ { label:'Seleccione un producto'}}
                                    options={allProductsSelect} 
                                    onChange={handleChangeVenta}
                                />
                            </div>
                        </div>
                        <div className="div_input_form">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                name="cantidadAVender"
                                value={venta.cantidadAVender}
                                onChange={(e) => handleChange(e)}
                                placeholder= "Ingresa una cantidad"
                            />
                        </div>
                        <button type="submit" className="btn_form">Realizar venta</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Ventas;