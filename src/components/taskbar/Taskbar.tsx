import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { windowDispatcher } from '../../dispatchers/windowDispatcher';
import { WindowConfig, WindowState } from '../../reducers/windowReducer';
import ClockBox from './components/clockBox/ClockBox';
import "./taskbar.scss"





export default function Taskbar( props: any ) {

    var toggleStartMenu = props.toggleStartMenu
    var toggleVolumeSlider = props.toggleVolumeSlider

    const dispatch = useDispatch()
    
    const windowState: WindowState = useSelector((state: any) => state.windows);

    const [taskBarItemsStartIndex, setTaskBarItemsStartIndex] = useState<number>(0)
    const [taskBarItemCount, setTaskBarItemCount] = useState<number>(0)
    const taskBarItemWidth = 150
    const viewPortWindowWidth = (window.innerWidth * 0.8) - 80 - 70
    const taskBarItemCapacity = viewPortWindowWidth / taskBarItemWidth

    const selectTaskbarPillEvent = (id: string): void => {
        windowDispatcher.focusWindow(dispatch, id)
        //  windowDispatcher.minimizeWindow(dispatch, id)
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
        
        var jumpToindex = lastSelectedIndex - taskBarItemCapacity + 1
        setTaskBarItemsStartIndex(jumpToindex > 0 ? jumpToindex : 0)
        
        // Used to calculate where the taskbar next page should show
        // console.log("viewport width: " + viewPortWindowWidth)
        // console.log("taskbar item count: " + taskBarItemCount)
        // console.log("taskbar start index: ", taskBarItemsStartIndex)
        // console.log("taskbar item capacity: " + taskBarItemCapacity)
    }, [windowState, taskBarItemCapacity, taskBarItemCount, taskBarItemsStartIndex, viewPortWindowWidth])

    return (
    <div className="wrapper-taskbar">
        <div className="taskbar-applications-wrapper">
            <table>
                <tbody>
                    <tr>
                        <td id="td-pill-start">
                            <div className="startButton" onClick={() => toggleStartMenu()}>
                                <img src="./icons/windows.png" alt="Start"></img>
                                <label>Start</label>
                            </div>
                        </td>
                        
                        {
                            taskBarItemsStartIndex > 0 &&
                            <td key="tb-pill-left-move">
                                <div className="taskbar-moveLeft tb-move-button" onClick={() => setTaskBarItemsStartIndex(taskBarItemsStartIndex - 1)}>
                                <label>
                                &#9664;
                                </label>
                                </div>
                            </td>
                        }
                        
                        
                        {
                            taskBarItemsStartIndex >= 0 &&
                            windowState.runningWindows &&
                            windowState.runningWindows.filter((window: WindowConfig) => !window.exited).slice(taskBarItemsStartIndex, taskBarItemsStartIndex + taskBarItemCapacity).map((window: WindowConfig) => {
                            //  .map((window: WindowConfig, index: number) => {
                                return (
                                    window.exited !== true &&
                                    // index >= taskBarItemsStartIndex && 
                                    // index < taskBarItemsStartIndex + taskBarItemCapacity ?
                                    <td key={`tb-pill-${window.id}`}>
                                        <div className={`application_placeholder-wrapper ${window.id === windowState.top ? 'tb-selected' : ''}`}
                                                onClick={() => selectTaskbarPillEvent(window.id!)}>
                                            <img src={`./icons/${window.icon}`} alt={window.title || ''}></img>
                                            <label>{window.title}</label>
                                        </div>
                                    </td>
                                    // : null
                                )
                            })                        
                        }
                    </tr>
                </tbody>
            </table>
        </div>

        <ClockBox toggleVolumeSlider={toggleVolumeSlider}/>

        {
            (taskBarItemCount - taskBarItemsStartIndex) + 1 > taskBarItemCapacity &&
            <div className="taskbar-moveRight tb-move-button" onClick={() => setTaskBarItemsStartIndex(taskBarItemsStartIndex + 1)}>
                <label>
                &#9654;
                </label>
            </div>
        }
    </div>
    )
}
