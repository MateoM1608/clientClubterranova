import React from "react";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineLogout } from 'react-icons/ai'
import reload from "../../Middlewares/Reload";
import logo from '../../images/clubTerranovaFondo.png'

const Sidebar = ({ toggleModalLogOut }) => {
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo } = userSignIn;

    const Logout = () => {
        localStorage.removeItem("userInfo");
        reload()
    }

    return(
        <div className="sidebar_container">
            <div className="titleClub">
                <img src={logo} alt="logo" />
                <h1>
                    CLUB TERRANOVA
                </h1>
            </div>
            <div>
                <div className="sidebar_user">
                    <IconContext.Provider value={{size:"20px", color: "white"}}>
                        <div>
                            <FaUserCircle/>
                        </div>
                    </IconContext.Provider>
                    <h3>
                        {userInfo && userInfo.user.username}
                    </h3>
                </div>
                <div title="Cerrar sesión" onClick={() => Logout()} className="sidebar_logOut">
                    <IconContext.Provider value={{size:"20px", color: "white"}}>
                        <div>
                            <AiOutlineLogout/>
                        </div>
                    </IconContext.Provider>
                </div>
            </div>
        </div>
    )
};

export default Sidebar;