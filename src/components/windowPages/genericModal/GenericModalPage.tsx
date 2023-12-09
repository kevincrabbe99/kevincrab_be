import { getAnalytics } from 'firebase/analytics'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { windowDispatcher } from '../../../dispatchers/windowDispatcher'
import { ga4 } from '../../../util/ga4'

import "./genericModalPage.scss"

const WINDOW_HEIGHT = 125
const WINDOW_WIDTH = 325
const WINDOW_X = (document.documentElement.clientWidth / 2) - (WINDOW_WIDTH / 2)
const WINDOW_Y = (document.documentElement.clientHeight / 2) - (WINDOW_HEIGHT / 2)

export const genericModalWindowConfig = {
    "type": 11,
    "position": {
        "x": WINDOW_X,
        "y": WINDOW_Y,
    },
    "size": {
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT
    },
    "title": "Alert",
    "showXButton": true,
    "minimizable": false,
    "maximizable": false,
    "icon": "Dialog.ico"
}


export default function GenericModalPage(props: any) {

    const analytics = getAnalytics()

    const windowConfig = props.windowConfig
    const contentData = props.contentData

    const dispatch = useDispatch()

    const confirmEvent = () => {
        windowDispatcher.closeWindow(dispatch, windowConfig.id!)
    }

    // run on mount to explicitly log the generic modal message
    useEffect(() => {
        ga4.logWarning(analytics, "GENERIC_MESSAGE_MODAL", contentData)
    }, [])

    return (
        <div className="genMessage-wrapper">
            <div className="message-wrapper">
                <div className="message-icon">
                    <img src={require(`../../../../public/icons/${windowConfig.icon}`)} alt="dialog icon" />
                </div>
                <p>
                    {
                        contentData
                    }
                </p>
            </div>
            <div className="button-wrapper">
                <button onClick={confirmEvent}>Okay</button>
            </div>
        </div>
    )
}
