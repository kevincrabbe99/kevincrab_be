import React from 'react'
import PropTypes from 'prop-types'
import StartButton from '../elements/buttons/start_button/Start_button'
import Clock from '../elements/clock/Clock'

import './Taskbar.css'



function Taskbar({startMenuHandler}) {


    return (
        <div className = "taskBar_main">

                <StartButton startMenuHandler = {startMenuHandler.bind(this)} />

            <div  className = "Clock">
                <Clock />
            </div>



        </div>
    )
}

Taskbar.propTypes = {

}

export default Taskbar
