import React from 'react'
import './Clock.css'
import vol_ico from './../../../../img/Volume.ico'

const Clock = props => {
    return (
        <div  className = "clock_main">
            <div className = "clock_bg">
                <table>
                    <tr>
                        <td>
                            <img src = {vol_ico} ></img>
                        </td>
                        <td>
                            <p>4:20AM</p>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

Clock.propTypes = {

}

export default Clock
