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



export default function Window(props: any) {

    const windowState: WindowState = useSelector((state: any) => state.windows);

    let windowConfig:WindowConfig = props.windowConfig;
    let windowPositions = props.windowPositions;
    let exitWindowHandler = props.exitWindowHandler;
    let minimizeWindowHandler = props.minimizeWindowHandler;

    const windowRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState(windowConfig.size)
    const [position, setPosition] = useState(windowConfig.position)

    const [windowStyle, setWindowStyle] = useState<any | null>()

    type MousePosition = {
        x: number;
        y: number;
    }
    var originalMousePosition: MousePosition | null = null; 
    const [isMouseMovingWindow, setIsMouseMovingWindow] = useState<boolean>(false)

    // window position vars
    var windowStackerStartYPos = (document.documentElement.clientHeight / 4) 
    var windowStackerBufferSpace = 20
    var windowStackerCapacity = windowStackerStartYPos / windowStackerBufferSpace


    const [windowStack, setWindowStack] = useState<WindowConfig[]>([])

    const [x, setX] = useState(windowConfig.position.x)
    const [y, setY] = useState(windowConfig.position.y)
  
    const dispatch = useDispatch()

    const exitWindow = (e: any) => {
        exitWindowHandler(windowConfig.id!)
    }

    const minimizeWindowEvent = (e: any) => {
        minimizeWindowHandler(windowConfig.id!)
    }
  

    const mouseDownEvent = (e: any) => {
        // 1. Get mouse position
        originalMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
        setIsMouseMovingWindow(true)
    }

    const mouseUpEvent = (e: any) => {
        setIsMouseMovingWindow(false)    
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
            width: document.documentElement.clientWidth - 10,
            top: y,
            left: document.documentElement.clientWidth / 2 - (size.width / 2)
        })
    }, [x, y])
    
    // use effect that only runs onces on component mount
    // useEffect(() => {
    //     // override window config positioning
    //     setX(document.documentElement.clientWidth / 2 - (size.width / 2))
    //     setY(windowStackerStartYPos)
    // }, [])


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
                <div className="window-header-listener" onMouseDown={mouseDownEvent} > 

                </div>
                {windowConfig.icon ? <img src={`./icons/${windowConfig.icon}`} /> : null }
                <label className="window-header-title">
                    {windowConfig.title}
                    {" " + windowConfig.id}
                </label>
                <div className="window-header-options">
                    <button>?</button>
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

const renderWindowContent = (windowConfig: WindowConfig) => {
    switch(windowConfig.type) {
        case 0:
            return <LoginWindowPage />
        case 2:
            return <DocumentPage />
        case 3:
            return <FolderPage contentData={windowConfig.contentData}/>
        default:
            return <div>Window Content</div>
    }
}