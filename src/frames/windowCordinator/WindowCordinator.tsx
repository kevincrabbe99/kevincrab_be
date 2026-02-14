import React, { createRef, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Window from '../../components/window/Window';
import { WindowConfig, WindowState } from '../../reducers/windowReducer';
import "./windowCordinator.scss"
import { windowDispatcher } from '../../dispatchers/windowDispatcher';

export default function WindowCordinator() {

    const dispatch = useDispatch()

    const windowState: WindowState = useSelector((state: any) => state.windows);

    // create 100 empty refs of typ HTMLDivElement
    const windowRefs = useMemo(() => Array(100).fill(0).map(i => createRef<HTMLDivElement>()), [])

    const [exitedWindowIds, setExitedWindowIds] = useState<string[]>([])
    const [minimizedWindowIds, setMinimizedWindowIds] = useState<string[]>([])
    const [maximizedWindowIds, setMaximizedWindowIds] = useState<string[]>([])
    
    const exitWindowHadler = (id: string) => {
        setExitedWindowIds([...exitedWindowIds, id])
        windowDispatcher.closeWindow(dispatch, id)
    }

    const minimizeWindowHandler = (id: string) => {
        setMinimizedWindowIds([...minimizedWindowIds, id])
        windowDispatcher.minimizeWindow(dispatch, id)
    }   

    const maximizeWindowHandler = (id: string) => {
        setMaximizedWindowIds([...maximizedWindowIds, id])
        windowDispatcher.maximizeWindow(dispatch, id)
    }

    const unmaximizeWindowHandler = (id: string) => {
        setMaximizedWindowIds(maximizedWindowIds.filter((windowId) => windowId !== id))
        windowDispatcher.unmaximizeWindow(dispatch, id)
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
            if (currentWindow.minimized !== true) {
                if (minimizedWindowIds.includes(currentWindow.id!)) {
                    setMinimizedWindowIds(minimizedWindowIds.filter(id => id !== currentWindow.id))
                }
            } else {
                if (!minimizedWindowIds.includes(currentWindow.id!)) {
                    setMinimizedWindowIds([...minimizedWindowIds, currentWindow.id!])
                }
            }
        }
    }, [windowState, minimizedWindowIds])


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
    }, [minimizedWindowIds, exitedWindowIds, windowRefs])
    

    return (
        <div className="windowCordinator-wrapper">
            {
                windowState.showingWindows &&
                windowState.showingWindows.map((windowConfig: WindowConfig, index: number) => {
                    // if (windowConfig.type === WindowTypesEnum.DOCUMENT) {
                        return (
                            <div className="windowZPlacement" id={windowConfig.id!} key={`winZpl-${windowConfig.id}`} style={{zIndex: (100 - (100 - index)).toString() }} ref={windowRefs[index]}>
                            
                                    <Window windowConfig={windowConfig} 
                                        exitWindowHandler={exitWindowHadler} 
                                        minimizeWindowHandler={minimizeWindowHandler}
                                        maximizeWindowHandler={maximizeWindowHandler}
                                        unmaximizeWindowHandler={unmaximizeWindowHandler}
                                        id={`window-id-${windowConfig.id!}`} /> 
                                
                            </div>
                        )
                    // }
                })
            }
            
        </div>
    )
}
