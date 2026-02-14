import React, { useEffect } from 'react'
import "./clockBox.scss"
import {appConfig} from "../../../../configs/configurator"

export default function ClockBox(props:any) {

    const toggleVolumeSlider = props.toggleVolumeSlider

    const [time, setTime] = React.useState<string>("")

    const getTime = () => {
        let time = new Date().toLocaleTimeString("en-US", {timeZone: appConfig.timezone , hour12: true, hour: "2-digit", minute: "2-digit"})
        // remove the AM/PM
        time = time.substring(0, time.length - 3)
        return time
    }

    useEffect(() => {
            var time = getTime()
            setTime(time)
    }, [])

    // update time every minute
    useEffect(() => {
        const interval = setInterval(() => {
            var time = getTime()
            setTime(time)
        }, 30000);
        return () => clearInterval(interval);
    }, []);


    return (
        <div className="taskbar-right-box" onClick={toggleVolumeSlider}>
            <div className="taskbar-volume">
                <img src="./icons/Volume.ico" alt="Volume"></img>
            </div>
            <div className="taskbar-clock">
                <label>{ time }</label> 
            </div>
        </div>
    )
}
