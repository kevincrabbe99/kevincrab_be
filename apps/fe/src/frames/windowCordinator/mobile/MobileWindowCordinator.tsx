import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Window from '../../../components/window/Window';
import DocumentWindow from '../../../components/windowPages/document/DocumentWindow'
import { WindowConfig, WindowState, WindowTypesEnum } from '../../../reducers/windowReducer';
import "./mobileWindowCordinator.scss"

import {isMobile} from 'react-device-detect';
import MobileWindow from '../../../components/window/mobile/MobileWindow';

export default function MobileWindowCordinator() {

    const dispatch = useDispatch()

    const windowState: WindowState = useSelector((state: any) => state.windows);

    // create 100 empty refs of typ HTMLDivElement
    const windowRefs = useMemo(() => Array(100).fill(0).map(i => createRef<HTMLDivElement>()), [])

    const [exitedWindowIds, setExitedWindowIds] = useState<string[]>([])
    const [minimizedWindowIds, setMinimizedWindowIds] = useState<string[]>([])
    
    const exitWindowHadler = (id: string) => {
        setExitedWindowIds([...exitedWindowIds, id])
        dispatch({type: "REMOVE_WINDOW", payload: id})
    }

    const minimizeWindowHandler = (id: string) => {
        setMinimizedWindowIds([...minimizedWindowIds, id])
        dispatch({type: "MINIMIZE_WINDOW", payload: id})
    }   

    useEffect(() => {

        // used to focus on windows
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }

            // position focused window on top
            if (currentWindowRef!.id === windowState.top) {
                currentWindowRef!.style.zIndex = "100"
            } else {
                currentWindowRef!.style.zIndex = (parseInt(currentWindowRef!.style.zIndex) - 1).toString()
            }
        }

    }, [windowState, windowRefs])

    useEffect(() => {
        // unsed as listener from unminimize from taskbar.tsx
        for (let i = 0; i < windowState.windows.length; i++) {
            const currentWindow = windowState.windows[i]
            if (currentWindow.minimized != true) {
                if (minimizedWindowIds.includes(currentWindow.id!)) {
                    setMinimizedWindowIds(minimizedWindowIds.filter(id => id != currentWindow.id))
                }
            }
        }
    }, [windowState])


    // used to set window position for mobile
    const [windowPositions, setWindowPositions] = useState<number[]>([])
    useEffect(() => {
        // create empty array of window positions with size 100
        let windowPositionsTemp = Array(100).fill(0)

        // get index of windowState.top in windowState.windows
        let topWindowIndex = windowState.windows.filter(window => !window.exited).findIndex(window => window.id === windowState.top)
        
        // set windowPositionsTemp[0] to topWindowIndex
        windowPositionsTemp[0] = topWindowIndex


        // loop through windowState.windows with !window.exited
        windowState.windows.filter(window => !window.exited && !window.minimized).forEach((window, index) => {
            // if index is not topWindowIndex
            if (index != topWindowIndex) {
                // set windowPositionsTemp[index] to index
                windowPositionsTemp[index] = index
            }
        })


        setWindowPositions(windowPositionsTemp)

    }, [windowState])


    // hide minimized and exited windows
    useEffect(() => {
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }
            if (minimizedWindowIds.includes(currentWindowRef!.id) ||
                exitedWindowIds.includes(currentWindowRef!.id)) {
                currentWindowRef!.style.zIndex = (parseInt(currentWindowRef!.style.zIndex) - 1).toString()
                currentWindowRef!.style.display = "none"
            } else {
                currentWindowRef!.style.display = "block"
            }
        }
    }, [minimizedWindowIds, exitedWindowIds])
    

    return (
        <div className="windowCordinator-wrapper">
            {
                windowState.windows.map((windowConfig: WindowConfig, index: number) => {
                    // if (windowConfig.type === WindowTypesEnum.DOCUMENT) {
                        return (
                            <div className="windowZPlacement" id={windowConfig.id!} style={{zIndex: (100 - index).toString() }} ref={windowRefs[index]}>
                         
                                    <MobileWindow windowConfig={windowConfig} 
                                        exitWindowHandler={exitWindowHadler} 
                                        minimizeWindowHandler={minimizeWindowHandler}
                                        id={`window-id-${windowConfig.id!}`} 
                                        windowPositions={windowPositions}/> 
                                
                            </div>
                        )
                    // }
                })
            }
            
        </div>
    )
}