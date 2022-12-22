import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import CardInforme from "../../components/CardInforme/Cardinforme";
import { getVentas } from "../../Redux/actions";
import Swal from "sweetalert2";
import * as XLSX  from 'xlsx'
import { saveAs } from "file-saver";
import numeral from 'numeral'


const InformeVentas = () => {

    const allVentas = useSelector(state => state.allVentas)
    const dispatch = useDispatch()
    const [ informeData, setInformeData ] = useState({
        fechaInicio: "",
        fechaFinal: ""
    })

    const handleChange = (e) =>{
        setInformeData({
          ...informeData,
          [e.target.name]: e.target.value
        })
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(informeData.fechaInicio && informeData.fechaFinal){
            const fechainicial = `${informeData.fechaInicio} 00:00:00`
            const fechainfinal = `${informeData.fechaFinal} 23:00:00`
            dispatch(getVentas({
                fechaInicio: fechainicial,
                fechaFinal: fechainfinal
            }))
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error...',
                text: 'Hay campos vacios',
                footer: ''
              })
        }
    }

    const exportarExcel = () => {
        if(allVentas[1] !== 0){
            try{
                const infoExportar = []
                allVentas[0].informe.map( i => {
                    infoExportar.push({
                        producto: i.producto,
                        precio_unitario: i.precio_unitario,
                        cantidad: i.cantidad,
                        precio_total: i.precio_total,
                        fecha: i.fecha.substring(0,10),
                        hora: i.fecha.substring(11,19),
                        usuario: i.usuario
                    })
                })
                infoExportar.push({
                    producto: 'TOTAL PRODUCTOS',
                    precio_unitario: allVentas[0].total.total_productos,
                    cantidad: 'VENTA VENDIDO',
                    precio_total: allVentas[0].total.total_venta
                })
                let data = XLSX.utils.json_to_sheet(infoExportar, {
                    header: [
                        "fecha",
                        "hora",
                        "producto",
                        "precio_unitario",
                        "cantidad",
                        "precio_total",
                        "usuario",
                    ]
                });
    
                data["A1"].v = "Fecha";
                data["B1"].v = "Hora";
                data["C1"].v = "Producto";
                data["D1"].v = "Precio Unitario";
                data["E1"].v = "Cantidad";
                data["F1"].v = "Precio Total";
                data["G1"].v = "Usuario que vendió";
    
                var workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(
                    workbook,
                    data,
                    "Informe de ventas"
                );
    
                var wopts = { bookType: "xlsx", bookSST: false, type: "array" };
                var wbout = XLSX.write(workbook, wopts);
                saveAs(
                  new Blob([wbout], { type: "application/octet-stream" }),
                  `Informe ventas ${informeData.fechaInicio} / ${informeData.fechaFinal}.xlsx`
                );
            }catch(err){
            }
        }
    }

    return(
        <div>
            <div className="Title_global">
                <h1>Informe ventas</h1>
            </div>
            <div className="div_Global">
                <div className="Subtitle_global">
                    <h3>Configuracion de busqueda</h3>
                </div>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="div_input_form">
                        <label>Fecha inicio:</label>
                        <input 
                            type="date"
                            name="fechaInicio"
                            value={informeData.fechaInicio}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa cantidad"
                        />
                    </div>
                    <div className="div_input_form">
                        <label>Fecha final:</label>
                        <input 
                            type="date"
                            name="fechaFinal"
                            value={informeData.fechaFinal}
                            onChange={(e) => handleChange(e)}
                            placeholder= "ingresa cantidad"
                        />
                    </div>
                    <div className="div_row">
                        <button type="submit" className="btn_form">Buscar</button>
                        <h4 
                            onClick={() => exportarExcel()}
                            className={ allVentas[1] !== 0 ? "btn_form": "btn_disabled"} 
                        >Exportar</h4>
                    </div>
                </form>
            </div>
            <div>
                <div className="div_TablaInv">
                    <div className="inventario_tabla">
                        <h3 className="invent_fecha">Fecha</h3>
                        <h3 className="invent_producto">Producto</h3>
                        <h3 className="invent_precioUn">Precio Unitario</h3>
                        <h3 className="invent_cantidad">Cantidad</h3>
                        <h3 className="invent_precioTot">Precio Total</h3>
                    </div>
                    <div>
                        {
                            allVentas[1] === 0  ? 
                            <div className="inv_sinReg">
                                <h3>No hay registros</h3>
                            </div>
                            :
                            allVentas[0].informe.map( (i,index) => (
                                <CardInforme
                                    id={i.id}
                                    producto={i.producto}
                                    precio_unitario={i.precio_unitario}
                                    cantidad={i.cantidad}
                                    precio_total={i.precio_total}
                                    fecha={i.fecha}
                                    usuario={i.usuario}
                                    key={i.id}
                                    index={index}
                                />
                            ))
                        }
                        <div className="informe_totales">
                            <h4 className="informe_pieText">Total productos:</h4>
                            <h4 className="informe_pieText">{allVentas[1] !== 0 ? allVentas[0].total.total_productos : "0"}</h4>
                            <h4 className="informe_pieText1">Total vendido:</h4>
                            <h4 className="informe_pieText">{allVentas[1] !== 0 ?  numeral(allVentas[0].total.total_venta).format('$0,0') : "0.00"}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InformeVentas;