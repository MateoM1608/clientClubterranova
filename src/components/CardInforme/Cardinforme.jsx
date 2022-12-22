import React from "react";
import numeral from 'numeral'

const CardInforme = ({ id, 
        producto, 
        precio_unitario, 
        cantidad, 
        precio_total, 
        fecha, 
        // usuario, 
        index
    }) => {
        
    return (
        <div className={ index%2 === 0 ?"cardInf_container": "cardInf_container2"}>
            <h3 className="cardInf_fecha">{fecha.replace('T', ' ').substring(0,19)}</h3>
            <h3 className="cardInf_producto">{producto}</h3>
            <h3 className="cardInf_precioUni">{numeral(precio_unitario).format('$0,0')}</h3>
            <h3 className="cardInf_cantidad">{cantidad}</h3>
            <h3 className="cardInf_precioTot">{numeral(precio_total).format('$0,0')}</h3>
        </div>
    )
};

export default CardInforme;