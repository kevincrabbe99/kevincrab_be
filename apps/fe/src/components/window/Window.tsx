import React, { useEffect, useState } from 'react'
import LoginWindowPage from '../windowPages/login/LoginWindowPage';
import "./window.scss"

export type WindowPosition = {
    x: number;
    y: number;
}

export type WindowSize = {
    width: number;
    height: number;
}

export type WindowConfig = {
    position: WindowPosition;
    size: WindowSize;
    title: String;
    icon?: String;
}



export default function Window(props: any) {

    let windowConfig:WindowConfig = props.windowConfig;

    const [size, setSize] = useState(windowConfig.size)
    const [position, setPosition] = useState(windowConfig.position)

    const [windowStyle, setWindowStyle] = useState<any | null>()

    useEffect(() => {
        const newStyle = {
            height:size.height,
            width:size.width,
            left:position.x,
            top:position.y 
        }
        setWindowStyle(newStyle)
    }, [size, position])
    
    return (
        <div className="window-wrapper" style={windowStyle} >
            <div className="window-header">
                <label className="window-header-title">
                    {windowConfig.title}
                </label>
                <div className="window-header-options">
                    <button>?</button>
                    <button>X</button>
                </div>
            </div>
            <div className="window-content">
                <LoginWindowPage />
            </div>
        </div>
    )
}
