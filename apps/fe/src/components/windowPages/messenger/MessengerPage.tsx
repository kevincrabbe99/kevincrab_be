import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { windowDispatcher } from '../../../dispatchers/windowDispatcher'
import { WindowConfig, WindowTypesEnum } from '../../../reducers/windowReducer'

import axios from 'axios'

import "./messengerPage.scss"

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
    "title": "Messenger",
    "showXButton": true,
    "icon": "Mail.ico"
}

export default function MessengerPage(props: any) {

    const windowConfig: WindowConfig = props.windowConfig;

    // create ref for all inputs
    const subjectRef = useRef<HTMLInputElement>(null)
    const responseEmailRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLTextAreaElement>(null)

    const dispatch = useDispatch()

    const cancelEvent = () => {
        windowDispatcher.closeWindow(dispatch, windowConfig.id!)
    }

    const sendEvent = () => {



        // return;
        
        const curURL = window.location.href

        const data = {
            "subject": subjectRef.current!.value,
            "responseEmail": responseEmailRef.current!.value,
            "message": messageRef.current!.value,
            "origin": curURL
        }

        // verify data.responseEmail is an email
        if (data.responseEmail.indexOf("@") === -1 &&
            data.responseEmail.indexOf(".") === -1) {
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.GENERIC_MODAL, "Please enter a valid email address.")
            return;
        }

        // verify that data.message is not empty
        if (data.message.length === 0) {
            alert("Please enter a message.")
            return;   
        }        


        // make axios POST request to https://formspree.io/f/mnqrgjjz
        // with data
        axios.post("https://formspree.io/f/mnqrgjjz", data)
            .then((response) => {
                console.log("Formspree response: ", response)            
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.GENERIC_MODAL, "Message sent! \nThanks for reaching out :)")


                // close window
                windowDispatcher.closeWindow(dispatch, windowConfig.id!)

            }).catch((error) => {
                console.log("Formspree error: ", error)
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.GENERIC_MODAL, "Error sending message. \nPlease try again later.")
            })
    }

    return (
        <div className="messenger-wrapper">
            <div className="messenger-top">
                <div className="messenger-top-left">
                    <div className="messenger-top-left-header">
                        <label>To:</label>
                    </div>
                    <div className="messenger-top-left-body">
                        <div className="messenger-top-left-recipients">
                            <input type="radio" checked name="recipients" value="all" />
                            <label>Kevin Crabbe</label>
                        </div>
                        <div className="messenger-top-inputs">
                            <input tabIndex={1} type="text" ref={subjectRef} placeholder="Subject" />
                            <input tabIndex={2} type="text" ref={responseEmailRef} placeholder="Your Email" />
                        </div>
                    </div>
                </div>    
                <div className="messenger-top-right">
                    <button onClick={sendEvent} tabIndex={4} >Send!</button>
                    <button onClick={cancelEvent} tabIndex={5}>Cancel</button>
                </div>
            </div>
            <div className="messenger-bottom">
                <div className="messenger-message">
                    <label>Message:</label>
                    <textarea ref={messageRef} tabIndex={3} placeholder="Type your message here..."></textarea>
                </div>
            </div>
        </div>
  )
}
