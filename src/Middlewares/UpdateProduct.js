import Swal from 'sweetalert2'
import { modifyProduct } from '../Redux/actions';

const UpdateProduct = ( nombre, precio, cantidad, sumarCantidad, idProducto ) =>{

    if(idProducto){
        if(cantidad && sumarCantidad){
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Digite uno de los dos campos de cantidad',
                footer: ''
              })
              return false
        }else if( nombre || precio || cantidad || sumarCantidad ){
            if(cantidad){
                if(!precio && !nombre){
                    const body = {
                        cantidad
                    }
                    return body
                }else if(precio && !nombre){
                    const body = {
                        cantidad,
                        precio
                    }
                    return body
                }else{
                    const body = {
                        cantidad,
                        precio,
                        nombre
                    }
                    return body
                }
            }else if(sumarCantidad){
                if(!precio && !nombre){
                    const body = {
                        sumarCantidad
                    }
                    return body
                }else if(precio && !nombre){
                    const body = {
                        sumarCantidad,
                        precio
                    }
                    return body
                }else{
                    const body = {
                        sumarCantidad,
                        precio,
                        nombre
                    }
                    return body
                }
            }else{
                if(precio && nombre){
                    const body = {
                        nombre,
                        precio
                    }
                    return body
                }else if(nombre){
                    const body = {
                        nombre
                    }
                    return body
                }else{
                    const body = {
                        precio
                    }
                    return body
                }
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Ingrese el campo que desea modificar',
                footer: ''
              })
              return false
        }
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'Ingrese el producto que desea modificar',
            footer: ''
          })
    }

}

export default UpdateProduct;