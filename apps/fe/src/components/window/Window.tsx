import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { fromEvent, map } from 'rxjs';
import { WindowConfig } from '../../reducers/windowReducer';
import DocumentPage from '../windowPages/document/documentPage/DocumentPage';
import DocumentWindow from '../windowPages/document/DocumentWindow';
import LoginWindowPage from '../windowPages/login/LoginWindowPage';
import "./window.scss"



export default function Window(props: any) {

    let windowConfig:WindowConfig = props.windowConfig;

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
      const sub = fromEvent(document, 'mousemove')
        .pipe(map(event => [(event as any).clientX, (event as any).clientY]))
        .subscribe(([newX, newY]) => {
                setX(newX)
                setY(newY)
        })
  
      return () => {
        sub.unsubscribe()
      }
    }, [])
  

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

    
    return (
        <div className="window-wrapper" style={windowStyle} >
            <div className="window-header" >
                <div className="window-header-listener" onMouseDown={mouseDownEvent} onMouseUp={mouseUpEvent}>

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