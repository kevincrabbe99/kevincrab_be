import React, { createRef, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Window from '../../components/window/Window';
import DocumentWindow from '../../components/windowPages/document/DocumentWindow'
import { WindowConfig, WindowState } from '../../reducers/windowReducer';
import "./windowCordinator.scss"

export default function WindowCordinator() {

    const dispatch = useDispatch()

    const windowState: WindowState = useSelector((state: any) => state.windows);

    // create 100 empty refs of typ HTMLDivElement
    const windowRefs = useMemo(() => Array(100).fill(0).map(i => createRef<HTMLDivElement>()), [])

    const [exitedWindowIds, setExitedWindowIds] = useState<string[]>([])
    
    const exitWindowHadler = (id: string) => {
        setExitedWindowIds([...exitedWindowIds, id])
        dispatch({type: "REMOVE_WINDOW", payload: id})
    }

    useEffect(() => {
        // debugger
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }
            if (currentWindowRef!.id === windowState.top) {
                console.log("SELECTED WINDOW: ", currentWindowRef?.id)
                console.log("FOUND: " + windowRefs[i].current?.id)
                console.log("FOUND: " + windowRefs[i].current?.id)
                currentWindowRef!.style.zIndex = "100"
            } else {
                currentWindowRef!.style.zIndex = (parseInt(currentWindowRef!.style.zIndex) - 1).toString()
            }
        }

    }, [windowState, windowRefs])

    useEffect(() => {
        console.log("exitedWindowIds: ", exitedWindowIds)
        for (let i = 0; i < windowRefs.length; i++) {
            const currentWindowRef = windowRefs[i].current
            if (!currentWindowRef) { return; }
            if (exitedWindowIds.includes(currentWindowRef!.id)) {
                console.log("FOUND: " + windowRefs[i].current?.id)
                currentWindowRef!.style.zIndex = (parseInt(currentWindowRef!.style.zIndex) - 1).toString()
                currentWindowRef!.style.display = "none"
            }
        }
    }, [exitedWindowIds])
    

    return (
        <div className="windowCordinator-wrapper">
            {
                windowState.windows.map((windowConfig: WindowConfig, index: number) => {
                    if (windowConfig.type === 2) {
                        return (
                            <div className="windowZPlacement" id={windowConfig.id!} style={{zIndex: (100 - index).toString() }} ref={windowRefs[index]}>
                                <Window windowConfig={windowConfig} exitWindowHandler={exitWindowHadler} id={`window-id-${windowConfig.id!}`} /> 
                            </div>
                        )
                    }
                })
            }
            
        </div>
    )
}
