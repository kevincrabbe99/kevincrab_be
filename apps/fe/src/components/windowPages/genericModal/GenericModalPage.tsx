import React from 'react'
import { useDispatch } from 'react-redux'
import { windowDispatcher } from '../../../dispatchers/windowDispatcher'

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
    "minimizeable": false,
    // "icon": "Folder.ico"
}


export default function GenericModalPage(props: any) {

    const windowConfig = props.windowConfig
    const contentData = props.contentData

    const dispatch = useDispatch()

    const confirmEvent = () => {
        windowDispatcher.closeWindow(dispatch, windowConfig.id!)
    }


    return (
        <div className="genMessage-wrapper">
            <div className="message-wrapper">
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
