import React, { useEffect } from 'react'
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
