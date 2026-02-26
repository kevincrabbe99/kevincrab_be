import React, { useEffect, useRef, useState } from 'react'
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
    // Guard against negative/zero capacity on very small viewports (e.g. 320px)
    const taskBarItemCapacity = Math.max(1, Math.floor(viewPortWindowWidth / taskBarItemWidth))

    // Track the previously focused window to detect real focus changes vs re-renders
    const prevTopId = useRef<string | null | undefined>(undefined)

    const selectTaskbarPillEvent = (id: string): void => {
        windowDispatcher.focusWindow(dispatch, id)
    }

    // Keep item count up-to-date and auto-scroll only when the focused window changes
    useEffect(() => {
        let count = 0
        let lastSelectedIndex = 0
        for (let i = 0; i < windowState.windows.length; i++) {
            const currentWindow = windowState.windows[i]
            if (!currentWindow.exited) { count++ }
            if (currentWindow.id === windowState.top) { lastSelectedIndex = i }
        }
        setTaskBarItemCount(count)

        // Only reposition the viewport when the focused window actually changes.
        // This prevents arrow-click navigation from being immediately overridden.
        if (windowState.top !== prevTopId.current) {
            prevTopId.current = windowState.top
            const jumpToIndex = lastSelectedIndex - taskBarItemCapacity + 1
            setTaskBarItemsStartIndex(jumpToIndex > 0 ? jumpToIndex : 0)
        }
    }, [windowState, taskBarItemCapacity])

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
                                return (
                                    window.exited !== true &&
                                    <td key={`tb-pill-${window.id}`}>
                                        <div className={`application_placeholder-wrapper ${window.id === windowState.top ? 'tb-selected' : ''}`}
                                                onClick={() => selectTaskbarPillEvent(window.id!)}>
                                            <img src={`./icons/${window.icon}`} alt={window.title || ''}></img>
                                            <label>{window.title}</label>
                                        </div>
                                    </td>
                                )
                            })
                        }
                    </tr>
                </tbody>
            </table>
        </div>

        <ClockBox toggleVolumeSlider={toggleVolumeSlider}/>

        {
            taskBarItemCount > taskBarItemsStartIndex + taskBarItemCapacity &&
            <div className="taskbar-moveRight tb-move-button" onClick={() => setTaskBarItemsStartIndex(taskBarItemsStartIndex + 1)}>
                <label>
                &#9654;
                </label>
            </div>
        }
    </div>
    )
}
