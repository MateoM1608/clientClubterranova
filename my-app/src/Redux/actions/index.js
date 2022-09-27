import axios from 'axios';
import  env  from 'react-dotenv';


// --------- Auth -------------

export const authenticate = (body) => dispatch => {
    axios.post(`${env.API_URL}/usuario/autenticar`, body)
    .then(res => dispatch({type: "AUTHENTICATE", payload: res.data}))
}

// export const logOut = ()  => dispatch =>  {
//     dispatch({type: "LOG_OUT"})
// }

export const signUp = (body) => dispatch => {
    axios.post(`${env.API_URL}/usuario/registrar`, body)
    .then( res => {
        return res
    })
}


// --------- Usuario -------------


export const getUsers = () => dispatch => {
    axios.get(`${env.API_URL}/usuario`)
    .then(res => dispatch({type:"GET_USERS", payload: res.data}))
}

export const deleteUser = (id) => dispatch => {
    axios.delete(`${env.API_URL}/usuario/eliminar/${id}`)
}



// --------- Producto -------------

export const getAllProducto = () => dispatch => {
    axios.get(`${env.API_URL}/productos`)
    .then(res => dispatch({type:"GET_ALL_PRODUCT", payload: res.data}))
}

export const getAllProductoSelect = () => dispatch => {
    axios.get(`${env.API_URL}/productos`)
    .then(res => dispatch({type:"GET_ALL_PRODUCT_SELECT", payload: res.data}))
}

export const getProduct = (id) => dispatch => {
    axios.get(`${env.API_URL}/productos/${id}`)
    .then(res => dispatch({type:"GET_PRODUCT", payload: res.data}))
}

export const getProductos = () => dispatch => {
    axios.get(`${env.API_URL}/productos`)
    .then(res => dispatch({type:"GET_PRODUCT", payload: res.data}))
}

export const getProductoByCategory = (id) => dispatch => {
    axios.get(`${env.API_URL}/productos`)
    .then(res => dispatch({type:"GET_PRODUCT_BY_CATEGORY", payload: res.data, category: id}))
}

export const modifyProduct = (body, id) => dispatch => {
    axios.put(`${env.API_URL}/productos/${id}`, body)
    .then(res => {
        return res
    })
}

export const postProduct = (body) => dispatch => {
    axios.post(`${env.API_URL}/productos`, body)
}

export const deleteProduct = (id) => {
    axios.delete(`${env.API_URL}/productos/${id}`)
}

export const clearProduct = () => dispatch => {
    dispatch({type: "CLEAR_PRODUCT"})
}


// --------- Categorias -------------


export const getAllCategorySelect = () => dispatch => {
    axios.get(`${env.API_URL}/categorias`)
    .then(res => dispatch({type:"GET_ALL_CATEGORY_SELECT", payload: res.data}))
}

export const deleteCategory = (id) => dispatch => {
    axios.delete(`${env.API_URL}/categorias/${id}`,)
}

export const postCategory = (body) => dispatch => {
    axios.post(`${env.API_URL}/categorias`, body)
}


// --------- ventas -------------

export const postVentas = (body, id) => dispatch => {
    axios.post(`${env.API_URL}/ventas/crear/${id}`, body)
}

export const getVentas = (body) => dispatch => {
    axios.post(`${env.API_URL}/ventas/informes`, body)
    .then(res => dispatch({type:"GET_VENTAS", payload: res.data}))
}