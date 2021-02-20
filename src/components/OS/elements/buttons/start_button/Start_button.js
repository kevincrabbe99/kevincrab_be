import React from 'react'
import './Start_Button.css'
import win_icon from './../../../../../img/windows.png'

const start_button = () => {
   
    return (
        <div  className = "taskBar_main">
            <div className = "taskBar_bg">
                <table>
                    <tr>
                        <td>
                            <img src = {win_icon} ></img>
                        </td>
                        <td>
                            <p>Start</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default start_button
