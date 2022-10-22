import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { frameDispatcher } from '../../../dispatchers/frameDispatcher';
import { windowDispatcher } from '../../../dispatchers/windowDispatcher';
import { WindowConfig, WindowTypesEnum } from '../../../reducers/windowReducer';

import "./run.scss"

export const runWindowConfig: WindowConfig = {
    "type": 6,
    "position": {
        "x": (document.documentElement.clientWidth / 2 - 200) -
            (document.documentElement.clientWidth / 10) * 2,
        "y": document.documentElement.clientHeight / 2 - 100 +
            (document.documentElement.clientHeight / 10) * 3 - 25
    },
    "size": {
        "width": 400,
        "height": 175
    },
    "title": "Run",
    "showXButton": true,
    "icon": "Run.ico"
  };


export default function Run(props: any) {

    const windowConfig = props.windowConfig;

    const dispatch = useDispatch()

    var input_typeRef = useRef<HTMLInputElement>(null);
    var input_payloadRef = useRef<HTMLInputElement>(null);

    const runEvent = () => {
        const type = input_typeRef.current!.value;
        const payload = input_payloadRef.current!.value;
        console.log("DISPADLW")
        dispatch({type: type, payload: payload});
    }

    return (
        <div className="run-wrapper">
            <div className="run-top">
                <div className="run-top-left">
                    <img src="./icons/Run.ico" />
                </div>
                <div className="run-top-right">
                    <p>Enter the reducer type and payload, and Redux will run it for you.</p>
                </div>
            </div>
            <div className="run-middle">
                <div className="run-middle-left">
                    <p>Reducer Type:</p>
                    <input type="text" ref={input_typeRef} />
                </div>
                <div className="run-middle-right">
                    <p>Reducer Payload:</p>
                    <input type="text" ref={input_payloadRef} />
                </div>
            </div>
            <div className="run-bottom">
                <button onClick={runEvent}>OK</button>
                <button onClick={() => windowDispatcher.closeWindow(dispatch, windowConfig.id)}>Cancel</button>
                <button onClick={() => windowDispatcher.openWindow(dispatch, WindowTypesEnum.FOLDER, "Programs") }>Browse...</button>
            </div>
        </div>
    )
}
