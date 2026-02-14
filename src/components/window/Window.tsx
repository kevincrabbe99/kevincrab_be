import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fromEvent, map } from 'rxjs';
import { WindowConfig } from '../../reducers/windowReducer';
import "./window.scss"

import { renderWindowContent } from './WindowContent';
import { windowDispatcher } from '../../dispatchers/windowDispatcher';
import { useSelector } from 'react-redux';



export default function Window(props: any) {

    let windowConfig:WindowConfig = props.windowConfig;
    let exitWindowHandler = props.exitWindowHandler;
    let minimizeWindowHandler = props.minimizeWindowHandler;
    let maximizeWindowHandler = props.maximizeWindowHandler;
    let unmaximizeWindowHandler = props.unmaximizeWindowHandler;

    const windowRef = useRef<HTMLDivElement>(null);

    const [size] = useState(windowConfig.size)

    const [windowStyle, setWindowStyle] = useState<any | null>()
    
    const [isMouseMovingWindow, setIsMouseMovingWindow] = useState<boolean>(false)

    const [x, setX] = useState(windowConfig.position.x)
    const [y, setY] = useState(windowConfig.position.y)
    const [isMaximized, setIsMaximized] = useState<boolean>(false)
  
    const windowState = useSelector((state: any) => state.windows);
    const dispatch = useDispatch()

    const exitWindow = (e: any) => {
        exitWindowHandler(windowConfig.id!)
    }

    const minimizeWindowEvent = (e: any) => {
        minimizeWindowHandler(windowConfig.id!)
    }

    const maximizeWindowEvent = (e: any) => {
        maximizeWindowHandler(windowConfig.id!)
    }

    const unmaximizeWindowEvent = (e: any) => {
        unmaximizeWindowHandler(windowConfig.id!)
    }   

    useEffect(() => {
        // Subscribe to the mousemove event
        const subMove = fromEvent(document, 'mousemove')
            .pipe(map(event => [(event as any).clientX, (event as any).clientY]))
            .subscribe(([newX, newY]) => {
                    setX(newX)
                    setY(newY)
            })
        
        // Subscribe to the mouseup event
        const subUp = fromEvent(document, 'mouseup')
            .pipe(map(event => [(event as any).clientX, (event as any).clientY]))
            .subscribe(() => {
                    setIsMouseMovingWindow(false)
            })
  
      return () => {
        subMove.unsubscribe()
        subUp.unsubscribe()
      }
    }, [])
  

    // start mo
    const mouseDownEvent = (e: any) => {
        setIsMouseMovingWindow(true)
    }

    useEffect(() => {
        const newStyle = {
            height:size.height,
            width:size.width,
            left:x - (size.width / 2),
            top:y - 10
        }
        if (isMouseMovingWindow) {
            setWindowStyle(newStyle)
        }
    }, [size, x, y, isMouseMovingWindow])
    
    // use effect that only runs onces on component mount
    useEffect(() => {
        setWindowStyle({
            height:size.height,
            width:size.width,
            left:x,
            top:y 
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // listen for window position to be declared maximized
    useEffect(() => {
        // if maximizedWindows includes this windowConfig.id
        if (windowState.maximizedWindows.map((windowConfig: WindowConfig) => windowConfig.id).includes(windowConfig.id)) {
            // set window position to be maximized
            setWindowStyle({
                top: "1.5em",
                left: "1.5em",
                width: "calc(100% - 3em)",
                height: "calc(100% - 3em)",
            })
            setIsMaximized(true)
        } else {
            setWindowStyle({
                top: windowConfig.position.y - 35,
                left: windowConfig.position.x + 45,
                width: size.width,
                height: size.height,
            })
            setIsMaximized(false)
        }
    }, [windowState.maximizedWindows, size, windowConfig.id, windowConfig.position])

    // add click event listener to windowRef
    useEffect(() => {
        const windowSelectEvent = (e: any) => {
            windowDispatcher.focusWindow(dispatch, windowConfig.id!)
        }

        if (windowRef.current) {
            windowRef.current.addEventListener("mousedown", windowSelectEvent)
        }
    }, [windowRef, dispatch, windowConfig.id])

    // console.log("ALERT WINDOW CONFIG: ", windowConfig)
    
    return (
        <div className="window-wrapper" key={`window-wrapper-${windowConfig.id}`} style={windowStyle} ref={windowRef}>
            <div className="window-header" >
                <div className="window-header-listener" onMouseDown={mouseDownEvent} > 

                </div>
                {windowConfig.icon ? <img src={`./icons/${windowConfig.icon}`} alt={windowConfig.title || ''} /> : null }
                <label className="window-header-title">
                    {windowConfig.title}
                </label>
                <div className="window-header-options">
                    {
                        windowConfig.helpData ?
                        <button>?</button> : null
                    }
                    {
                        windowConfig.minimizable !== false &&
                        <button onClick={minimizeWindowEvent}>
                            <span className="minimize_button">
                                _
                            </span>
                        </button> //: <></>
                    }
                    {
                        windowConfig.maximizable ?
                            !isMaximized ?
                                <button onClick={maximizeWindowEvent}>
                                    <span className="maximize_button">
                                        <label>+</label>    
                                    </span>
                                </button> : 
                                <button onClick={unmaximizeWindowEvent}>
                                    <span className="unmaximize_button_wrapper">
                                        <span className="unmaximize_button_1">
                                            <label>+</label>    
                                        </span>
                                        <span className="unmaximize_button_2">
                                            <label>+</label>    
                                        </span>
                                    </span>
                                </button>
                        : null
                    }
                    {
                        windowConfig.showXButton === false ? null : 
                        <button onClick={exitWindow}>X</button> 
                    }
                </div>
            </div>
            <div className="window-content">
                {renderWindowContent(windowConfig)}
            </div>
        </div>
    )
}
