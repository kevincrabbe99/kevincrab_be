import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fromEvent, map } from 'rxjs';
import { WindowConfig, WindowState } from '../../../reducers/windowReducer';
import DocumentPage from '../../windowPages/document/documentPage/DocumentPage';
import DocumentWindow from '../../windowPages/document/DocumentWindow';
import FolderPage from '../../windowPages/folder/FolderPage';
import LoginWindowPage from '../../windowPages/login/LoginWindowPage';
import "./mobileWindow.scss"

import {isMobile} from 'react-device-detect';
import { renderWindowContent } from '../WindowContent';



export default function Window(props: any) {

    const windowState: WindowState = useSelector((state: any) => state.windows);

    let windowConfig:WindowConfig = props.windowConfig;
    let windowPositions = props.windowPositions;
    let exitWindowHandler = props.exitWindowHandler;
    let minimizeWindowHandler = props.minimizeWindowHandler;

    const windowRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState(windowConfig.size)

    const [windowStyle, setWindowStyle] = useState<any | null>()

    type MousePosition = {
        x: number;
        y: number;
    }

    // window position vars
    var windowStackerStartYPos = (document.documentElement.clientHeight / 8) 
    var windowStackerBufferSpace = 20
    var windowStackerCapacity = windowStackerStartYPos / windowStackerBufferSpace

    const [x, setX] = useState(windowConfig.position.x)
    const [y, setY] = useState(windowConfig.position.y)
  
    const dispatch = useDispatch()

    const exitWindow = (e: any) => {
        exitWindowHandler(windowConfig.id!)
    }

    const minimizeWindowEvent = (e: any) => {
        minimizeWindowHandler(windowConfig.id!)
    }

    const getTaskbarWindowConfigs = () : WindowConfig[] => {
        let windowConfigs: WindowConfig[] = []
        for (let i = 0; i < windowState.windows.length; i++) {
            if (!windowState.windows[i].exited) {
                windowConfigs.push(windowState.windows[i])
            }
        }
        return windowConfigs
    }

    // runs when reorder changes
    useEffect(() => {
        
        // position of windowConfig.id in windowState.windows
        let windowConfigIndex = windowState.windows.filter(window => !window.exited).findIndex((windowConfig: WindowConfig) => windowConfig.id === props.windowConfig.id)

        // get index of windowPositions with value = windowConfigIndex
        let windowPositionIndex = windowPositions.findIndex((windowPosition: number) => windowPosition === windowConfigIndex)

        setY(windowStackerStartYPos - (windowPositionIndex * windowStackerBufferSpace))

    }, [windowPositions])

    // runs when setX or setY is called after initial position is set
    useEffect(() => {
        setWindowStyle({
            height: size.height,
            width: document.documentElement.clientWidth - 20,
            top: y,
            left: 10
        })
    }, [x, y])

    // add click event listener to windowRef
    useEffect(() => {
        const windowSelectEvent = (e: any) => {
             dispatch({type: "FOCUS_WINDOW", payload: windowConfig.id})
        }

        if (windowRef.current) {
            windowRef.current.addEventListener("mousedown", windowSelectEvent)
        }
    }, [windowRef])

    
    return (
        <div className="window-wrapper" style={windowStyle} ref={windowRef}>
            <div className="window-header" >
                <div className="window-header-listener"  > 

                </div>
                {windowConfig.icon ? <img src={`./icons/${windowConfig.icon}`} /> : null }
                <label className="window-header-title">
                    {windowConfig.title}
                </label>
                <div className="window-header-options">
                    {
                        windowConfig.helpData ?
                        <button>?</button> : null
                    }
                    {
                        windowConfig.minimizable != false ? <button onClick={minimizeWindowEvent}>
                            <span className="minimize_button">
                                _
                            </span>
                        </button> : null
                    }
                    {
                        windowConfig.showXButton == false ? null : <button onClick={exitWindow}>X</button> 
                    }
                </div>
            </div>
            <div className="window-content">
                {renderWindowContent(windowConfig)}
            </div>
        </div>
    )
}
