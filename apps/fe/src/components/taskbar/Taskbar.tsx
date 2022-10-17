import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { WindowState } from '../../reducers/windowReducer';
import "./taskbar.scss"

var today = new Date(),
    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();



export default function Taskbar( props: any ) {

    var toggleStartMenu = props.toggleStartMenu

    const dispatch = useDispatch()
    
    const windowState: WindowState = useSelector((state: any) => state.windows);

    const selectTaskbarPillEvent = (id: string): void => {
        dispatch({type: "FOCUS_WINDOW", payload: id})
    }

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
                        windowState.windows.map((window: any) => {
                            return (
                                window.exited != true ?
                                <td>
                                    <div    className={`application_placeholder-wrapper ${windowState.top == window.id ? 'tb-selected' : ''}`}
                                            onClick={() => selectTaskbarPillEvent(window.id)}>
                                        <img src={`./icons/${window.icon}`}></img>
                                        <label>{window.title}</label>
                                    </div>
                                </td>
                                : null
                            )
                        })
                    }

                    {/* <td>
                        <div className="application_placeholder-wrapper">
                            <img src="./icons/internet.ico"></img>
                            <label>Internet</label>
                        </div>
                    </td> */}
                </tr>
            </table>
        </div>
        <div className="taskbar-right-box">
            <label>{ time }</label> 
        </div>
    </div>
    )
}
