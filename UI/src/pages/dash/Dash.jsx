import "./../../App.scss"
import dashIcon from "./../../assets/222.png"
import { Link, Navigate } from "react-router-dom"
import { io } from "socket.io-client"
// import {} from "s"
import { useRef, useState } from "react"
import { retriveData, save } from "../../utils/localStorage"
import { useEffect } from "react"
import { MainUrl } from "../../../variables"
export default function Dash() {
    const [logouts, setLogout] = useState(false)
    const [user, setUser] = useState(retriveData("userDr"))
    const [cmd, changeCmd] = useState(false)
    const [fetData, changeFetData] = useState(false)
    const isMountedRef = useRef(false);

    const logoutFun = () => {
        save("userDr", null)
        setLogout(true)
    }
    // console.log(user)
    const one = (user) => {
        save("userDr", user)
        setUser(user)
    }

    const actionCalled = (cmd) => {
        if (cmd == 1) {
            console.log("closing");
            changeCmd(true) // closing
            changeFetData(!fetData)
        }
        if (cmd == 0) {
            console.log("openign");
            changeCmd(false) // closing
            changeFetData(!fetData)
        }

    }

    const changeCmdFunc = async () => {
        try {
            // console.log("server hitting...");
            const response = await (await fetch(`${MainUrl}/user/change/${cmd}`)).json()
            // console.log(response);
            if (response) {
                console.log(response?.body);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (isMountedRef.current) {
            changeCmdFunc()
        } else {
            isMountedRef.current = true;
        }
    }, [fetData])
    // console.log(user);
    useEffect(() => {
        const socket = io(MainUrl)
        socket.on("connect", () => console.log(socket.id))
        socket.on("dataSet", (user) => one(user))
    }, [])
    return (<>
        {logouts && (
            <Navigate to="/" replace={true} />
        )}
        <div style={{ marginTop: "1rem" }}></div>
        <div className="dashIcon">
            <img src={dashIcon} alt="dashboardIcon" />
        </div>
        <div className="currentUnit">
            {user?.close ? "Closed" : "Opened"}
            {/* {parseFloat(user?.amount).toFixed(2)- parseFloat(user?.debt).toFixed(2)} <span style={{ color: "hsla(279, 40%, 15%, 1)" }}>Kwh</span> */}
        </div>
        <div className="padTop"></div>
        <div className="container  row">
            {/* <Link to="buy"> */}
            <div className="padAll  col s5" onClick={() => actionCalled(0)}>
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">Open</div>
                    </div>
                </div>
            </div>
            {/* </Link> */}
            {/* <Link to="debt"> */}
            <div className="padAll offset-s2 col s5" onClick={() => actionCalled(1)}>
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">Close</div>
                    </div>
                </div>
            </div>
            {/* </Link> */}
        </div>
        <div className="padTop"></div>
        <div className="container  row">
            <Link to="info">
                <div className="padAll  col s5" >
                    <div className="flexrow">
                        <div className="capT">
                            <div className="centerT">Info</div>
                        </div>
                    </div>
                </div>
            </Link>
            <div className="padAll offset-s2 col s5" onClick={() => logoutFun()}>
                <div className="flexrow">
                    <div className="capT">
                        <div className="centerT">Logout</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="padTop"></div>
    </>)
}