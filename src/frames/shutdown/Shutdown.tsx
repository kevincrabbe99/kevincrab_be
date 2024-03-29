import React, { useEffect, useState } from 'react'
import "./shutdown.scss"

import logJson from "../../assets/json/shutdown_cli_items.json"
import { useDispatch } from 'react-redux';
import { FrameStatesEnum } from '../../reducers/frameReducer';
import { frameDispatcher } from '../../dispatchers/frameDispatcher';
import { useSelector } from 'react-redux';
import { ScopesEnum } from '../../reducers/scopeReducer';
import { getAnalytics } from 'firebase/analytics';

interface LogItem {
    text: string,
    paddingTop?: number,
    time: number
}

const exitAfterLogTimeSec = 11;

export default function Shutdown() {

    const analytics = getAnalytics()

    const dispatch = useDispatch()
    const scopeState = useSelector((state: any) => state.scopes)


    const [logPosition, setLogPosition] = useState<number>(0)
    
    // run once
    // jump to page depending on scope
    useEffect(() => {
        if (!scopeState) { return;}
        switch(scopeState.scopes[0]) {
            case ScopesEnum.RESUME:
                frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.DESKTOP)
                break;
        }
    }, [])

    // listen for any key press
    useEffect(() => {
        const handleKeyPress = (e: any) => {
            frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.LOGIN)
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
        }, 250);

        if (logPosition > exitAfterLogTimeSec * 4) {
            frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.LOGIN)
        }

        return () => clearInterval(interval);
    }, [logPosition]);

    return (
        <div className="shutdown-wrapper" onClick={() => frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.LOGIN)}>
            <div className="shutdown-wrapper-vertical"> 
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
        </div>
    )
}

const renderCliItem = (item: LogItem, index: number, logPosition: number) => {
    return <>
        {
            //  multiply time by 4 because log position updates every 250ms
          (item.time * 4) < logPosition ?
            <li key={`cli-o-${index}}`} style={{
                paddingTop: (item.paddingTop ? item.paddingTop : 0) + "em"
            }} >{item.text}</li> : null
        }
    </>
}
