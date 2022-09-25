import Swal from "sweetalert2";


const initialState = {
    allProducts: [],
    products:[],
    productosSelect: [],
    categoriaSelect: [],
    allVentas: [],
    usuarios: [],
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case "AUTHENTICATE":
            if(action.payload === 'Error en usuario y/o contraseña'){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Usuario y/o contraseña incorrecta',
                    footer: ''
                  })
            }else{
                localStorage.setItem('userInfo', JSON.stringify(action.payload))
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Inicio de sesión correcto',
                    showConfirmButton: false,
                    timer: 1500
                }).then(res => {
                    window.location.replace(window.location.origin);
                })
            }
            break;
        case "LOG_OUT":
            localStorage.removeItem("userInfo");
            break;
        case "GET_ALL_PRODUCT_SELECT":
            const productos = [];
            action.payload.map(p => {
                productos.push({ value: p.id, label: p.nombre })
            })
            return{
                ...state,
                productosSelect: productos
            }
        case "GET_PRODUCT":
            if(action.payload.length === 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No se encontraron datos',
                    footer: ''
                })
            }
            return{
                ...state,
                products: action.payload
            }
        case "GET_ALL_CATEGORY_SELECT":
            const categorias = []
            action.payload.map(c => {
                categorias.push({ value: c.id, label: c.nombre })
            })
            return{
                ...state,
                categoriaSelect: categorias
            }
        case "GET_ALL_PRODUCT":
            if(action.payload.length === 0){
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'No se encontraron datos',
                    footer: ''
                })
            }
            return{
                ...state,
                allProducts: action.payload,
                products: action.payload
                
            }
            case "GET_PRODUCT_BY_CATEGORY":
                const productByCategory = []
                if(action.payload.length === 0){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'No se encontraron datos',
                        footer: ''
                    })
                }
                action.payload.map( p => {
                    if(p.Categorias[0].id === action.category){
                        productByCategory.push(p)
                    }
                })
                return{
                    ...state,
                    products: productByCategory
                }
        case "CLEAR_PRODUCT":
            return{
                ...state,
                products: []
            }
        case "GET_VENTAS":
            if(action.payload[1] === 0){
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'No se enconraron datos',
                    showConfirmButton: false,
                    timer: 1000
                  })
            }
            return{
                ...state,
                allVentas: action.payload
            }
        case "GET_USERS":
            return{
                ...state,
                usuarios: action.payload
            }
        default:
            return{...state}
    }
}

export default rootReducer;