import React from 'react'
import Window, { WindowConfig } from '../../components/window/Window'
import "./login.scss"

const loginWindow: WindowConfig = {
    "position": {
        "x": ((document.documentElement.clientWidth / 2)-200),
        "y": ((document.documentElement.clientHeight / 2)-75),
    },
    "size": {
        "width": 400,
        "height": 150
    },
    "title": "Welcome to my Website!",
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
