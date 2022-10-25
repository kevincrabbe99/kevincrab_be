import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fromEvent, map } from 'rxjs';
import { WindowConfig } from '../../reducers/windowReducer';
import "./window.scss"

import {isMobile} from 'react-device-detect';
import { renderWindowContent } from './WindowContent';
import { windowDispatcher } from '../../dispatchers/windowDispatcher';

export type WindowProps = {
    windowConfig: WindowConfig,
    exitWindowHandler?: any,
    minimizeWindowHandler?: any
}

export default function Window(props: WindowProps) {

    let windowConfig:WindowConfig = props.windowConfig;
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

    const [x, setX] = useState(windowConfig.position.x)
    const [y, setY] = useState(windowConfig.position.y)
  
    const dispatch = useDispatch()

    const exitWindow = (e: any) => {
        exitWindowHandler(windowConfig.id!)
    }

    const minimizeWindowEvent = (e: any) => {
        minimizeWindowHandler(windowConfig.id!)
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
        originalMousePosition = {
            x: e.clientX,
            y: e.clientY
        };
        setIsMouseMovingWindow(true)
    }

    const mouseUpEvent = (e: any) => {
        setIsMouseMovingWindow(false)    
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
            // update parent windowConfig object
            var newWindowConfig = {
                ...windowConfig,
                position: {
                    x: x - (size.width / 2),
                    y: y - 10
                }
            }
            windowConfig = newWindowConfig
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
    }, [])


    // add click event listener to windowRef
    useEffect(() => {
        const windowSelectEvent = (e: any) => {
            windowDispatcher.focusWindow(dispatch, windowConfig.id!)
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
