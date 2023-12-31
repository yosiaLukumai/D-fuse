import { NavLink, Outlet } from "react-router-dom"
import "./../App.scss"
import settingIcon from "../assets/set1.png"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { retriveData } from "../utils/localStorage"
export const DashBoard = () => {
    let screenSize = useMediaQuery()
    return (
        <>
            {screenSize.width > 630 ? <div className="bgDash"><h1>Ops...</h1><h1>App is designed for Mobile phone</h1></div> : <div className="dashStyles"><div className="header "><div className="AppName"><span style={{ fontSize: "2rem", fontWeight: "bold", fontStyle:"normal",}}>
                <NavLink  to={`/auth/${retriveData("userDr")._id}`} style={{textDecoration:"none", color: "rgb(43, 23, 54)"}}>Must-fuse</NavLink> </span></div><div><img className="responsiveIcon" src={settingIcon} alt="simpleicon"></img></div></div><Outlet /></div>}
        </>
    )
}
