import { getAnalytics } from 'firebase/analytics';
import React from 'react'
import { useDispatch } from 'react-redux';
import { frameDispatcher } from '../../../dispatchers/frameDispatcher';
import { FrameStatesEnum } from '../../../reducers/frameReducer';
import "./loginWindowPage.scss"

export default function LoginWindowPage() {

    const analytics = getAnalytics()

    const dispatch = useDispatch();

    const loginSubmit = (e: any) => {
        frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.DESKTOP)
    }

    const loginCancel = (e: any) => {
        frameDispatcher.setState(dispatch, analytics, FrameStatesEnum.SHUTDOWN)
    }

    return (
        <div className="login-wpage-wrapper">
            <div className="login-wpage-top">
                <div className="login-wpage-top-wrapper">
                    <div className="login-wpage-icon">
                        <img src="./icons/login_key.ico"></img>
                    </div>
                    <div className="login-wpage-prompts">
                        <p>Type a user name and password to log on to Windows.</p>
                    </div>
                    <div className="login-wpage-buttons">
                        <button onClick={loginSubmit} >OK</button>
                        <button onClick={loginCancel}>Cancel</button>
                    </div>
                </div>
            </div>
            <div className="login-wpage-bottom">
                <div className="login-wpage-bottom-wrapper">
                    <div className="login-wpage-form">
                        <div className="login-wpage-form-row">
                            <label>
                                User name: 
                            </label>
                            <input type="text"></input>
                        </div>
                        <div className="login-wpage-form-row">
                            <label>
                                Password:
                            </label>
                            <input type="password"></input>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
