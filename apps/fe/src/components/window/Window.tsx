import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fromEvent, map } from 'rxjs';
import { WindowConfig } from '../../reducers/windowReducer';
import DocumentPage from '../windowPages/document/documentPage/DocumentPage';
import DocumentWindow from '../windowPages/document/DocumentWindow';
import LoginWindowPage from '../windowPages/login/LoginWindowPage';
import "./window.scss"



export default function Window(props: any) {

    let windowConfig:WindowConfig = props.windowConfig;

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
        console.log("Exising Window")
        dispatch({type: "REMOVE_WINDOW", payload: windowConfig.id})
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
                console.log("ended moving window")
                    setIsMouseMovingWindow(false)
            })
  
      return () => {
        subMove.unsubscribe()
        subUp.unsubscribe()
      }
    }, [])
  

    const mouseDownEvent = (e: any) => {
        console.log("start moving window")
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
    }, [])


    // add click event listener to windowRef
    useEffect(() => {
        const windowSelectEvent = (e: any) => {
            console.log("Window Selected")
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
                </label>
                <div className="window-header-options">
                    <button>?</button>
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
        default:
            return <div>Window Content</div>
    }
}