import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { WindowConfig, WindowState } from '../../reducers/windowReducer';
import "./taskbar.scss"

var today = new Date(),
    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();



export default function Taskbar( props: any ) {

    var toggleStartMenu = props.toggleStartMenu

    const dispatch = useDispatch()
    
    const windowState: WindowState = useSelector((state: any) => state.windows);

    const [taskBarItemsStartIndex, setTaskBarItemsStartIndex] = useState<number>(0)
    const [taskBarItemCount, setTaskBarItemCount] = useState<number>(0)
    const taskBarItemWidth = 150
    const viewPortWindowWidth = (window.innerWidth * 0.8) - 80 - 70
    const taskBarItemCapacity = viewPortWindowWidth / taskBarItemWidth

    const selectTaskbarPillEvent = (id: string): void => {
        dispatch({type: "FOCUS_WINDOW", payload: id})
    }

    const isSelected = (window: WindowConfig) : boolean => {
        if (window.exited) { return false }
        if (window.minimized) { return false }
        return false
    }

    // used to keep track of the taskbar items count
    useEffect(() => {
        // count the number of taskbar items
        let count = 0
        let lastSelectedIndex = 0
        for (let i = 0; i < windowState.windows.length; i++) {
            const currentWindow = windowState.windows[i]
            if (!currentWindow.exited) { count++ }
            if (currentWindow.id === windowState.top) { lastSelectedIndex = i }
        }
        setTaskBarItemCount(count)
        setTaskBarItemsStartIndex(0)
        
        // Used to calculate where the taskbar next page should show
        console.log("viewport width: " + viewPortWindowWidth)
        console.log("taskbar item count: " + taskBarItemCount)
        console.log("taskbar start index: ", taskBarItemsStartIndex)
        console.log("taskbar item capacity: " + taskBarItemCapacity)
    }, [windowState])

    return (
    <div className="wrapper-taskbar">
        <div className="taskbar-applications-wrapper">
            <table>
                <tr>
                    <td>
                        <div className="startButton" onClick={() => toggleStartMenu()}>
                            <img src="./icons/windows.png"></img>
                            <label>Start</label>
                        </div>
                    </td>
                    
                    {
                        taskBarItemsStartIndex > 0 &&
                        <td>
                            <div className="taskbar-moveLeft tb-move-button" onClick={() => setTaskBarItemsStartIndex(taskBarItemsStartIndex - 1)}>
                             <label>
                              &#9664;
                             </label>
                            </div>
                        </td>
                    }
                    
                    
                    {
                        taskBarItemsStartIndex >= 0 &&
                        windowState.windows.filter((window: WindowConfig) => !window.exited).map((window: WindowConfig, index: number) => {
                            return (
                                window.exited != true &&
                                index >= taskBarItemsStartIndex && 
                                index < taskBarItemsStartIndex + taskBarItemCapacity ?
                                <td>
                                    <div    className={`application_placeholder-wrapper ${!window.exited && !window.minimized ? 'tb-selected' : ''}`}
                                            onClick={() => selectTaskbarPillEvent(window.id!)}>
                                        <img src={`./icons/${window.icon}`}></img>
                                        <label>{window.title}</label>
                                    </div>
                                </td>
                                : null
                            )
                        })                        
                    }
                </tr>
            </table>
        </div>
        <div className="taskbar-right-box">
            <label>{ time }</label> 
        </div>
        {
            (taskBarItemCount - taskBarItemsStartIndex) > taskBarItemCapacity &&
            <div className="taskbar-moveRight tb-move-button" onClick={() => setTaskBarItemsStartIndex(taskBarItemsStartIndex + 1)}>
                <label>
                &#9654;
                </label>
            </div>
        }
    </div>
    )
}
