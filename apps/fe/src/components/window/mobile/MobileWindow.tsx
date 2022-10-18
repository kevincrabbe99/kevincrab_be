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

    const [x, setX] = useState(windowConfig.position.x)
    const [y, setY] = useState(windowConfig.position.y)
  
    const dispatch = useDispatch()

    const exitWindow = (e: any) => {
        exitWindowHandler(windowConfig.id!)
    }

    const minimizeWindowEvent = (e: any) => {
        minimizeWindowHandler(windowConfig.id!)
    }

    const getNewWindowPosition = () => {
        let idealPosition = windowStackerStartYPos;
        // let pos = 0;
        // for (let i = 0; i < windowState.windows.length; i++) {
        //     if (windowState.windows[i].id === windowConfig.id) {
        //         pos = i;
        //         break;
        //     }
        // }
        // idealPosition -= (pos * windowStackerBufferSpace)
        return idealPosition
    }

    useEffect(() => {
        // // Subscribe to the mousemove event
        // const subMove = fromEvent(document, 'mousemove')
        //     .pipe(map(event => [(event as any).clientX, (event as any).clientY]))
        //     .subscribe(([newX, newY]) => {
        //             setX(newX)
        //             setY(newY)
        //     })
        
        // Subscribe to the mouseup event
        // const subUp = fromEvent(document, 'mouseup')
        //     .pipe(map(event => [(event as any).clientX, (event as any).clientY]))
        //     .subscribe(() => {
        //             setIsMouseMovingWindow(false)
        //     })
  
      return () => {
        // subMove.unsubscribe()
        // subUp.unsubscribe()
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

    const getTaskbarWindowConfigs = () : WindowConfig[] => {
        let windowConfigs: WindowConfig[] = []
        for (let i = 0; i < windowState.windows.length; i++) {
            if (!windowState.windows[i].exited) {
                windowConfigs.push(windowState.windows[i])
            }
        }
        return windowConfigs
    }

    const [windowCount, setWindowCount] = useState<number>(0)
    const [oldTopWindowId, setOldTopWindowId] = useState<string | undefined>()
    useEffect(() => {

        let windowConfigs = getTaskbarWindowConfigs()

        const didAddWindow = windowConfigs.length > windowCount
        const didRemoveWindow = windowConfigs.length < windowCount
        const didChangeFocus = !didAddWindow && !didRemoveWindow
// debugger
        // set top window position

        if (didChangeFocus) {
            if (windowConfig.id === windowState.top) {
                setY(windowStackerStartYPos);
                // return;
            }
        }
        

        // set position of windows from last to first
        // for (let i = 0; i < windowConfigs.length; i++) {
        //     const currentWindowConfig = windowConfigs[i];

        //     if (currentWindowConfig.id === windowConfig.id) {
        //         setY(windowStackerStartYPos - (i * windowStackerBufferSpace))
        //     }
        // }

        if (didAddWindow) {
            if (
                windowConfig.id !== windowState.top) {
                setY((old) => old - windowStackerBufferSpace)
            }
        }
        setOldTopWindowId(windowState.top)
        setWindowCount(windowConfigs.length)



        // var windowCountChanged = true;
        // var didAddWindow = false;
        // var thisIterationWindowCount = 0;
        // // count windowState.windows where exited = false
        // for (let i = 0; i < windowState.windows.length; i++) {
        //     if (!windowState.windows[i].exited) {
        //         thisIterationWindowCount++;
        //     }
        // }
        // if (thisIterationWindowCount > windowCount) {
        //     didAddWindow = true;
        // } else if (thisIterationWindowCount === windowCount) {
        //     windowCountChanged = false;
        // }

        // if (windowState.top === windowConfig.id) {
        //     setY(windowStackerStartYPos)
        // } else {
        //     for (let i = 0; i < windowState.windows.length; i++) {
        //         if (windowState.windows[i].id === windowConfig.id) {
        //             if (didAddWindow) {
        //                 setY((old) => old - windowStackerBufferSpace)
        //                 // break;
        //             } else if (didAddWindow) {
        //                 if (windowState.windows[i].id != windowState.top) {
        //                 setY((old) => old - windowStackerBufferSpace)
        //                 }
        //                 // break;
        //             }
        //         }
        //     }
        // }
    
        // setWindowCount(thisIterationWindowCount)
    }, [windowState.top])

    // runs when setX or setY is called after initial position is set
    useEffect(() => {
        setWindowStyle({
            height: size.height,
            width: document.documentElement.clientWidth - 10,
            top: y,
            left: x
        })
    }, [x, y])
    
    // use effect that only runs onces on component mount
    useEffect(() => {
        // override window config positioning
        setX(document.documentElement.clientWidth / 2 - (size.width / 2))
        setY(getNewWindowPosition())
    }, [])


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