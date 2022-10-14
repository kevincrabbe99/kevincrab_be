import React from 'react'
import "./taskbar.scss"

var today = new Date(),
    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();



export default function Taskbar( props: any ) {

  var toggleStartMenu = props.toggleStartMenu

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
                    <td>
                        <div className="application_placeholder-wrapper">
                            <img src="./icons/WordPad_Document.ico"></img>
                            <label>Resume.doc</label>
                        </div>
                    </td>
                    <td>
                        <div className="application_placeholder-wrapper">
                            <img src="./icons/Settings.ico"></img>
                            <label>Settings</label>
                        </div>
                    </td>
                    <td>
                        <div className="application_placeholder-wrapper">
                            <img src="./icons/internet.ico"></img>
                            <label>Internet</label>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div className="taskbar-right-box">
            <label>{ time }</label> 
        </div>
    </div>
  )
}
