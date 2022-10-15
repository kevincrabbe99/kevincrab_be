import React, { useEffect, useState } from 'react'
import "./shutdown.scss"

import logJson from "../../assets/json/shutdown_cli_items.json"
import { useDispatch } from 'react-redux';
import { FrameStatesEnum } from '../../reducers/frameReducer';

interface LogItem {
    text: string,
    paddingTop?: number,
    time: number
}

const exitAfterLogTimeSec = 15;

export default function Shutdown() {

    const [logPosition, setLogPosition] = useState<number>(0)
    const dispatch = useDispatch()
    
    // listen for any key press
    useEffect(() => {
        const handleKeyPress = (e: any) => {
            console.log("key pressed")
            dispatch({type: "SET_STATE", payload: FrameStatesEnum.LOGIN});
        }
        window.addEventListener("keydown", handleKeyPress)
        return () => {
            window.removeEventListener("keydown", handleKeyPress)
        }
    }, [])

    // increase log position every [log.time]
    useEffect(() => {
        const interval = setInterval(() => {
            setLogPosition(logPosition + 1)
        }, 900);

        if (logPosition > exitAfterLogTimeSec) {
            dispatch({type: "SET_STATE", payload: FrameStatesEnum.LOGIN})
        }

        return () => clearInterval(interval);
    }, [logPosition]);

    return (
        <div className="shutdown-wrapper" onClick={() => dispatch({type: "SET_STATE", payload: FrameStatesEnum.LOGIN})}>
            <div className="shutdown-cli-output">
                <ul>
                {
                        logJson.map((item: LogItem, index: number) => 
                            renderCliItem(item, index, logPosition)
                        )
                }
                </ul>
            </div>
            <div className="shutdown-exit-prompt">
                <ul>
                    <li key="sep1">Press ANY KEY to skip STARTUP...</li>
                    <li key="sep2">
                        {
                            // output date as MM/DD/YYYY
                            new Date().toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'})
                        }
                        -PEACHICETEA-PST
                    </li>
                </ul>
            </div>
        </div>
    )
}

const renderCliItem = (item: LogItem, index: number, logPosition: number) => {
    return <>
        {
          item.time < logPosition ?
            <li key={`cli-o-${index}}`} style={{
                paddingTop: (item.paddingTop ? item.paddingTop : 0) + "em"
            }} >{item.text}</li> : null
        }
    </>
}