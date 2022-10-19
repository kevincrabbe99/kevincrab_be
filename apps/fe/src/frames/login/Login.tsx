import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Window from '../../components/window/Window'
import { WindowConfig } from '../../reducers/windowReducer';
import "./login.scss"

import { isMobile } from 'react-device-detect';

const loginWindow: WindowConfig = {
    "type": 0,
    "position": {
        "x": ((document.documentElement.clientWidth / 2)-200),
        "y": ((document.documentElement.clientHeight / 2)-75),
    },
    "size": {
        "width": 400,
        "height": 160
    },
    "title": "Welcome to my Website!",
    "helpData": "This is the login window. You can login here.",
    "minimizable": false,
    "showXButton": false
};



export default function Login() {

    // listen for document.documentElement.clientWidth changes
    const [windowHeight, setWindowHeight] = useState(document.documentElement.clientHeight)
    const [nudgerStyle, setNudgerStyle] = useState<CSSProperties>({top: 0})
    const initialWindowHeight = useRef(document.documentElement.clientHeight)
    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(document.documentElement.clientHeight)
        }
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])


    // used to nudge window height when keyboard is open
    useEffect(() => {
        // calculate difference
        let difference = windowHeight - initialWindowHeight.current

        // select child class of nudgerStyle .window-wrapper
        let windowWrappers = document.querySelectorAll(".window-wrapper")
        // loop through windowWrappers
        for (let i = 0; i < windowWrappers.length; i++) {
            // set windowWrappers[i].style.top to difference on type element
            (windowWrappers[i] as HTMLElement).style.marginTop = (difference / 2) + "px"
        }


    }, [windowHeight])

    return (
        <div className="login-wrapper">
            <div className="login-background-wrapper">
                <img src="./images/clouds.jpeg"></img>
            </div>
            <div className="login-page-content">

                <Window windowConfig={loginWindow} />
            </div>
        </div>
    )
}
