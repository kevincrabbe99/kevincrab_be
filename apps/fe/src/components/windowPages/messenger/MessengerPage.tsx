import React from 'react'
import { WindowConfig } from '../../../reducers/windowReducer'


const WINDOW_HEIGHT = 400
const WINDOW_WIDTH = WINDOW_HEIGHT
const WINDOW_X = (document.documentElement.clientWidth / 2) - (WINDOW_WIDTH / 2) - 100
const WINDOW_Y = (document.documentElement.clientHeight / 2) - (WINDOW_HEIGHT / 2) - 100

export const messengerWindowConfig = {
    "type": 8,
    "position": {
        "x": WINDOW_X,
        "y": WINDOW_Y,
    },
    "size": {
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT
    },
    "title": "Exploring",
    "showXButton": true,
    "icon": "Folder.ico"
}

export default function MessengerPage(props: any) {

    const windowConfig: WindowConfig = props.windowConfig;

    return (
        <div className="messenger-wrapper">
            <div className="messenger-top">
                <div className="messenger-top-left">
                    <div className="messenger-top-left-header">
                        <label>To:</label>
                    </div>
                    <div className="messenger-top-left-body">
                        <div className="messenger-top-left-recipients">
                            <input type="radio" name="recipients" value="all" />
                            <label>Kevin Crabbe</label>
                        </div>
                        <div className="messenger-subject">
                            <input type="text" placeholder="Subject" />
                        </div>
                    </div>
                </div>    
            </div>"
        </div>
  )
}
