import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {getAllProductoSelect, 
        modifyProduct, 
        getAllCategorySelect, 
        postProduct,
        deleteProduct,
        deleteCategory,
        postCategory
    } from "../../Redux/actions";
import Select from 'react-select'
import UpdateProduct from "../../Middlewares/UpdateProduct";
import Swal from "sweetalert2";
import reload from "../../Middlewares/Reload";

import { IconContext } from "react-icons";
import { IoIosArrowBack, IoIosArrowDown } from 'react-icons/io'


const Productos = () => {

    const dispatch = useDispatch()
    
    const [ isOpenCrearProd, setIsOpenCrearPord ] = useState(false)
    const [ isOpenCrearCat, setIsOpenCrearCat ] = useState(false)
    const [ isOpenModProd, setIsOpenModProd ] = useState(false)
    const [ isOpenElimProd, setIsOpenElimProd ] = useState(false)
    const [ isOpenElimCat, setIsOpenElimCat ] = useState(false)

    const [ idCategoriaDelete, setIdCategoriaDelete ] = useState("")
    const [ idProdDelete, setIdProdDelete ] = useState("")
    const [ newCategory, setNewCategory ] = useState("")
    const [ idCategoria, setIdCategoria ] = useState("")
    const [ idProducto, setIdProducto ] = useState("")
    const [ Modificar, setModificar] = useState({
        nombre: "",
        precio: "",
        cantidad:"",
        sumarCantidad: ""
    })
    const [ Crear, setCrear] = useState({
        nombre: "",
        precio: "",
        cantidad:""
    })
    const allProductsSelect = useSelector(state => state.productosSelect)
    const allCategorySelect = useSelector(state => state.categoriaSelect)
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const toggleCrearProd = () => {
        setIsOpenCrearPord(!isOpenCrearProd)
    }
    const toggleCrearCat = () => {
        setIsOpenCrearCat(!isOpenCrearCat)
    }
    const toggleModProd = () => {
        setIsOpenModProd(!isOpenModProd)
    }
    const toggleElimProd = () => {
        setIsOpenElimProd(!isOpenElimProd)
    }
    const toggleElimCat = () => {
        setIsOpenElimCat(!isOpenElimCat)
    }


    const handleSubmitModificar = (e) => {
        e.preventDefault()
        const bodyResponse = UpdateProduct(Modificar.nombre, Modificar.precio, Modificar.cantidad, Modificar.sumarCantidad, idProducto)
        if(bodyResponse){
            dispatch(modifyProduct(bodyResponse,idProducto ))
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
              }).then( res =>{
                reload()
              })
        }
    }

    const handleSubmitCrear = (e) => {
        e.preventDefault()
        if( Crear.nombre && Crear.precio && Crear.cantidad && idCategoria ){
            console.log(Crear)
            dispatch(postProduct({
                nombre: Crear.nombre,
                precio: Crear.precio,
                cantidad:Crear.cantidad,
                idCategoria: idCategoria
            }))
            setCrear({
                nombre: "",
                precio: "",
                cantidad:""
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Producto creado correctamente',
                showConfirmButton: false,
                timer: 1500
              }).then( res =>{
                reload()
              })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'No pueden haber campos vacios',
                footer: ''
              })
        }
    }

    const handleSubmitDelete = (e) => {
        e.preventDefault()
        if(idProdDelete){
            Swal.fire({
                title: 'Esta seguro de eliminar el produto?',
                text: "",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'Producto eliminado correctamente',
                    'success'
                  )
                  dispatch(deleteProduct(idProdDelete))
                }
            }).then(() =>{ getAllProductoSelect()})
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Ingrese el producto a eliminar',
                footer: ''
              }) 
        }
    }
    
    const handleSubmitCrearCategoria = (e) => {
        e.preventDefault()
        if(newCategory){
            dispatch(postCategory({
                nombre: newCategory
            }))
            setNewCategory("")
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Categoria creada correctamente',
                showConfirmButton: false,
                timer: 1500
              }).then(() =>{ reload()})
        }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error...',
                    text: 'Ingrese el nombre de la nueva categoria',
                    footer: ''
                }) 
            }
    }

    const handleSubmitDeleteCategoria = (e) => {
        e.preventDefault()
        if(idCategoriaDelete){
            Swal.fire({
                title: 'Esta seguro de eliminar la categoria?',
                text: "Se eliminarán los productos asociados a esta",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'Categoria eliminada correctamente',
                    'success'
                  )
                  dispatch(deleteCategory(idCategoriaDelete))
                }
            }).then(() => getAllCategorySelect())
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Ingrese la categoria a eliminar',
                footer: ''
            }) 
        }
    }

    const handlerchangeDeleteCategoria = ({value}) => {
        setIdCategoriaDelete(value)
    }
    
    const handleChangeCreacategoria = (e) => {
        setNewCategory(e.target.value)

    }

    const handlerchangeDelete = ({ value }) => {
        setIdProdDelete(value)
    }

    const handleChangeMod = (e) => {
        setModificar({
            ...Modificar,
            [e.target.name]: e.target.value
          })
    }

    const handleChangeCrea = (e) => {
        setCrear({
            ...Crear,
            [e.target.name]: e.target.value
          })
    }

    const handleChangeProduct = ({ value }) =>{
        setIdProducto(value)
    }

    const handleChangeCategory = ({ value }) => {
        setIdCategoria(value)
    }

    useEffect(() => {
        dispatch(getAllProductoSelect())
        dispatch(getAllCategorySelect())
    },[])

    if(userInfo){
        if(userInfo.user.id != 1){ 
            return(
                <div className="page404_container">
                    <h1>No tiene permitido ingresar a esta pagina</h1>
                </div>
            )
        }
    }

  

    return(
        <div>
            <div className="Title_global">
                <h1>Productos</h1>
            </div>
            <div className={isOpenCrearProd?"div_Global" : "div_Global_block"}>
                <div onClick={toggleCrearProd} className="Subtitle_product">
                    <h3>Crear producto</h3>
                    <div>
                        {
                            isOpenCrearProd ?
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowDown/>
                                </div>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowBack/>
                                </div>
                            </IconContext.Provider>
                        }
                    </div>
                </div>
                <div className={ isOpenCrearProd ? "":"div_block"}>
                    <form onSubmit={(e) => handleSubmitCrear(e)}>
                        <div className="div_input_form">
                            <label>Categoria:</label>
                            <div className="select-react">
                                <Select 
                                    defaultValue={ { label:'Seleccione una categoria'}}
                                    options={allCategorySelect} 
                                    onChange={handleChangeCategory}
                                />
                            </div>
                        </div>
                        <div className="div_input_form">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={Crear.nombre}
                                onChange={(e) => handleChangeCrea(e)}
                                placeholder= "Ingrese nombre"
                            />
                        </div>
                        <div className="div_input_form">
                            <label>Precio:</label>
                            <input
                                type="number"
                                name="precio"
                                value={Crear.precio}
                                onChange={(e) => handleChangeCrea(e)}
                                placeholder= "Ingrese precio"
                            />
                        </div>
                        <div className="div_input_form">
                            <label>Cantidad:</label>
                            <input
                                type="number"
                                name="cantidad"
                                value={Crear.cantidad}
                                onChange={(e) => handleChangeCrea(e)}
                                placeholder= "Ingrese cantidad"
                            />
                        </div>
                        <div>
                            <button className="btn_form" type="submit">Crear producto</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={isOpenCrearCat?"div_Global" : "div_Global_block"}>
                <div onClick={toggleCrearCat} className="Subtitle_product">
                    <h3>Crear categoria</h3>
                    <div>
                        {
                            isOpenCrearCat ?
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowDown/>
                                </div>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowBack/>
                                </div>
                            </IconContext.Provider>
                        }
                    </div>
                </div>
                <div className={ isOpenCrearCat ? "":"div_block"}>
                    <form onSubmit={(e) => handleSubmitCrearCategoria(e)}>
                        <div className="div_input_form">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={newCategory}
                                onChange={(e) => handleChangeCreacategoria(e)}
                                placeholder= "Ingrese nombre"
                            />
                        </div>
                        <div>
                            <button className="btn_form" type="submit">Crear categoria</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={isOpenModProd?"div_Global" : "div_Global_block"}>
                <div onClick={toggleModProd} className="Subtitle_product">
                    <h3>Modificar producto</h3>
                    <div>
                        {
                            isOpenModProd ?
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowDown/>
                                </div>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowBack/>
                                </div>
                            </IconContext.Provider>
                        }
                    </div>
                </div>
                <div className={ isOpenModProd ? "":"div_block"}>
                    <form onSubmit={(e) => handleSubmitModificar(e)}>
                        <div className="div_input_form">
                            <label>Producto:</label>
                            <div className="select-react">
                                <Select 
                                    defaultValue={ { label:'Seleccione un producto'}}
                                    options={allProductsSelect} 
                                    onChange={handleChangeProduct}
                                />
                            </div>
                        </div>
                        <div className="div_input_form">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                name="nombre"
                                value={Modificar.nombre}
                                onChange={(e) => handleChangeMod(e)}
                                placeholder= "Ingrese nombre"
                            />
                        </div>
                        <div className="div_input_form">
                            <label>Precio:</label>
                            <input
                                type="number"
                                name="precio"
                                value={Modificar.precio}
                                onChange={(e) => handleChangeMod(e)}
                                placeholder= "Ingrese precio"
                            />
                        </div>
                        <div className="div_input_form">
                            <label>Cantidad que ingresa:</label>
                            <input 
                                type="number"
                                name="sumarCantidad"
                                value={Modificar.sumarCantidad}
                                onChange={(e) => handleChangeMod(e)}
                                placeholder= "Ingrese cantidad"
                            />
                        </div>
                        <div className="div_input_form">
                            <label>Cantidad total:</label>
                            <input
                                type="number"
                                name="cantidad"
                                value={Modificar.cantidad}
                                onChange={(e) => handleChangeMod(e)}
                                placeholder= "Ingrese cantidad"
                            />
                        </div>
                        <div>
                            <button className="btn_form" type="submit">Modificar producto</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={isOpenElimProd?"div_Global" : "div_Global_block"}>
                <div onClick={toggleElimProd} className="Subtitle_product">
                    <h3>Eliminar producto</h3>
                    <div>
                        {
                            isOpenElimProd ?
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowDown/>
                                </div>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowBack/>
                                </div>
                            </IconContext.Provider>
                        }
                    </div>
                </div>
                <div className={ isOpenElimProd ? "":"div_block"}>
                    <form onSubmit={(e) => handleSubmitDelete(e)}>
                        <div className="div_input_form">
                            <label>Producto:</label>
                            <div className="select-react">
                                <Select 
                                    defaultValue={ { label:'Seleccione un producto'}}
                                    options={allProductsSelect} 
                                    onChange={handlerchangeDelete}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn_form" type="submit">Eliminar producto</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className={isOpenElimCat?"div_Global" : "div_Global_block"}>
                <div onClick={toggleElimCat} className="Subtitle_product">
                    <h3>Eliminar categoria</h3>
                    <div>
                        {
                            isOpenElimCat ?
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowDown/>
                                </div>
                            </IconContext.Provider>
                            :
                            <IconContext.Provider value={{size:"20px", color: "white"}}>
                                <div>
                                    <IoIosArrowBack/>
                                </div>
                            </IconContext.Provider>
                        }
                    </div>
                </div>
                <div className={ isOpenElimCat ? "":"div_block"}>
                    <form onSubmit={(e) => handleSubmitDeleteCategoria(e)}>
                        <div className="div_input_form">
                            <label>Producto:</label>
                            <div className="select-react">
                                <Select 
                                    defaultValue={ { label:'Seleccione una categoria'}}
                                    options={allCategorySelect} 
                                    onChange={handlerchangeDeleteCategoria}
                                />
                            </div>
                        </div>
                        <div>
                            <button className="btn_form" type="submit">Eliminar categoria</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Productos;