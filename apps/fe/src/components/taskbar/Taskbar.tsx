import React from 'react'
import "./taskbar.scss"

export default function Taskbar() {
  return (
    <div className="wrapper-taskbar">
        
        <table>
            <tr>
                <td>
                    <div className="startButton">
                        <img src="./icons/windows.png"></img>
                        <label>Start</label>
                    </div>
                </td>
            </tr>
        </table>

    </div>
  )
}
