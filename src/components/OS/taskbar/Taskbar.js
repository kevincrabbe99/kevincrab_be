import React from 'react'
import PropTypes from 'prop-types'
import StartButton from '../elements/buttons/start_button/Start_button'
import Clock from '../elements/clock/Clock'

import './Taskbar.css'



const Taskbar = props => {


    return (
        <div className = "taskBar_main">

                <StartButton/>

            <div  className = "Clock">
                <Clock />
            </div>



        </div>
    )
}

Taskbar.propTypes = {

}

export default Taskbar
