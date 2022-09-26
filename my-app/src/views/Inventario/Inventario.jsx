import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardInventario from "../../components/CardInventario/Cardinventario";
import Select from 'react-select'
import { getAllProductoSelect, 
        getAllCategorySelect, 
        getProduct, 
        getProductoByCategory,
        getProduct,
        clearProduct
    } from "../../Redux/actions";
import ModalModificarProd from "../../components/ModalModificarProd/ModalModificarProd";
import * as XLSX  from 'xlsx'
import { saveAs } from "file-saver";
import Swal from "sweetalert2";

import { IconContext } from "react-icons";
import { BiSearchAlt } from 'react-icons/bi'
import { AiFillThunderbolt } from 'react-icons/ai'

const Inventario = () => {

    const allProductsSelect = useSelector(state => state.productosSelect)
    const allCategorySelect = useSelector(state => state.categoriaSelect)
    const Products = useSelector(state => state.products)

    const [ idProducto, setIdProducto ] = useState("")
    const [ categoriaNom, setCategoriaNom ] = useState("")
    const [ idProdCard, setIdProdCard ] = useState("")
    const [ isOpenModificar, setIsOpenModificar ] = useState(false)


    const dispatch = useDispatch()

    const handleChangeCategory = ({ value }) =>{
        setCategoriaNom(value)
    }

    const handleChangeProduct = ({ value }) =>{
        setIdProducto(value)
    }

    const searchProduct = (e) => {
        e.preventDefault()
        if(idProducto){
            dispatch(getProduct(idProducto))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'No pueden haber campos vacios',
                footer: ''
              })
        }
    }

    const searchByCategory = (e) => {
        e.preventDefault()
        if(categoriaNom){
            dispatch(getProductoByCategory(categoriaNom))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'No pueden haber campos vacios',
                footer: ''
              })
        }
    }

    const onSubmit = () => {
        dispatch(getProduct())
    }

    const toggleModalModificar = () => {
        setIsOpenModificar(!isOpenModificar)
    }

    const exportarExcel = () => {

        if(Products.length !== 0){
            try{
                const infoExportar = []
                Products.map(p => {
                    infoExportar.push({
                        nombre: p.nombre,
                        precio: p.precio,
                        cantidad: p.cantidad,
                        categoria: p.Categorias[0].nombre
                    })
                })
                let data = XLSX.utils.json_to_sheet(infoExportar, {
                    header: [
                        "categoria",
                        "nombre",
                        "precio",
                        "cantidad",
                    ]
                });
    
                data["A1"].v = "Categoria";
                data["B1"].v = "Producto";
                data["C1"].v = "Precio Unitario";
                data["D1"].v = "Cantidad";
    
                var workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(
                    workbook,
                    data,
                    "Inventario"
                );
    
                var wopts = { bookType: "xlsx", bookSST: false, type: "array" };
                var wbout = XLSX.write(workbook, wopts);
                saveAs(
                  new Blob([wbout], { type: "application/octet-stream" }),
                  "Inventario.xlsx"
                );
    
    
            }catch(err){
            }
        }

    }

    useEffect(() => {
        dispatch(getAllProductoSelect())
        dispatch(getAllCategorySelect())
        dispatch(clearProduct())
    },[])

    return(
        <div>
            <div className="Title_global">
                <h1>Inventario</h1>
            </div>
            <div className="div_Global">
                <div className="Subtitle_global">
                    <h3>Configuracion de busqueda</h3>
                </div>
                <form onSubmit={(e) => searchByCategory(e)}>
                    <div className="div_input_form">
                        <label>Categoria:</label>
                        <div className="select-react">
                            <Select 
                                defaultValue={ { label:'Seleccione una categoria'}}
                                options={allCategorySelect} 
                                onChange={handleChangeCategory}
                            />
                        </div>
                        <button
                            className="mini_btn"
                            type="submit"
                        >
                        <IconContext.Provider value={{size:"15px", color: "white"}}>
                                <div>
                                    <BiSearchAlt/>
                                </div>
                        </IconContext.Provider>
                        </button>
                    </div>
                </form>
                <form onSubmit={(e) => searchProduct(e)}>
                    <div className="div_input_form">
                        <label>Producto:</label>
                        <div className="select-react">
                            <Select 
                                defaultValue={ { label:'Seleccione un producto'}}
                                options={allProductsSelect}
                                onChange={handleChangeProduct}
                                />
                        </div>
                        <button
                            className="mini_btn"
                            type="submit"
                        >
                            <IconContext.Provider value={{size:"15px", color: "white"}}>
                                    <div>
                                        <BiSearchAlt/>
                                    </div>
                            </IconContext.Provider>
                        </button>
                    </div>
                </form>
                <button onClick={onSubmit} className="btn_form">
                    Buscar todos los productos
                </button>
                <button onClick={exportarExcel} className={ Products.length !== 0 ?"btn_form" :"btn_disabled"}>
                    Exportar
                </button>
            </div>
            <div className="div_TablaInv">
                <div className="inventario_tabla">
                    <h3 className="inv_producto">Producto</h3>
                    <h3 className="inv_precio">Precio</h3>
                    <h3 className="inv_cantidad">Cantidad</h3>
                    <IconContext.Provider value={{size:"15px", color: "rgb(59, 59, 59)"}}>
                            <div>
                                <AiFillThunderbolt/>
                            </div>
                    </IconContext.Provider>
                </div>
                <div>
                    {
                        Products.length == 0 ? 
                        <div className="inv_sinReg">
                            <h3>No hay registros</h3>
                        </div>
                        :Products.map((p,index) => (
                            <CardInventario
                                producto={p.nombre}
                                precio={p.precio}
                                cantidad={p.cantidad}
                                id={p.id}
                                toggleModalModificar={toggleModalModificar}
                                setIdProdCard={setIdProdCard}
                                key={p.id}
                                index={index}
                                
                            />
                        ))
                    }
                </div>
            </div>
            <ModalModificarProd
                idProdCard={idProdCard}
                toggleModalModificar={toggleModalModificar}
                isOpenModificar={isOpenModificar}
            />
        </div>
    );
};

export default Inventario;