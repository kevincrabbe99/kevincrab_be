import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Window from '../../components/window/Window';
import DocumentWindow from '../../components/windowPages/document/DocumentWindow'
import { WindowConfig, WindowState, WindowTypesEnum } from '../../reducers/windowReducer';
import "./windowCordinator.scss"

export default function WindowCordinator() {

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

    useEffect(() => {
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }
            if (exitedWindowIds.includes(currentWindowRef!.id)) {
                currentWindowRef!.style.zIndex = (parseInt(currentWindowRef!.style.zIndex) - 1).toString()
                currentWindowRef!.style.display = "none"
            }
        }
    }, [exitedWindowIds])

    useEffect(() => {
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }
            if (minimizedWindowIds.includes(currentWindowRef!.id)) {
                currentWindowRef!.style.display = "none"
            } else {
                currentWindowRef!.style.display = "block"
            }
        }
    }, [minimizedWindowIds])
    

    return (
        <div className="windowCordinator-wrapper">
            {
                windowState.windows.map((windowConfig: WindowConfig, index: number) => {
                    // if (windowConfig.type === WindowTypesEnum.DOCUMENT) {
                        return (
                            <div className="windowZPlacement" id={windowConfig.id!} style={{zIndex: (100 - index).toString() }} ref={windowRefs[index]}>
                                <Window windowConfig={windowConfig} 
                                        exitWindowHandler={exitWindowHadler} 
                                        minimizeWindowHandler={minimizeWindowHandler}
                                        id={`window-id-${windowConfig.id!}`} /> 
                            </div>
                        )
                    // }
                })
            }
            
        </div>
    )
}
