import React from "react";
import { IconContext } from "react-icons";
import { FaRegSadTear } from 'react-icons/fa'

const Page404 = () => {
    return(
        <div className="page404_container">
            <IconContext.Provider value={{size:"25px", color: "rgb(59, 59, 59)"}}>
                    <div>
                        <FaRegSadTear/>
                    </div>
            </IconContext.Provider>
            <h1>
                La ruta a la que desea ingresar NO EXISTE
            </h1>
        </div>
    )
};

export default Page404;