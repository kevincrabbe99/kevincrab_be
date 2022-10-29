import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { frameDispatcher } from '../../../../../dispatchers/frameDispatcher'
import { WindowSize } from '../../../../../reducers/windowReducer'
import "./displaySettingsPage.scss"
import "../defaultSettingsTable.scss"
import { getAnalytics } from 'firebase/analytics'

export const OverrideSettingsDisplaySize: WindowSize = {
    width: 275,
    height: 75
}

export default function DisplaySettingsPage(props: any) {

    const analytics = getAnalytics()

    const dispatch = useDispatch()
    
    const frameState = useSelector((state: any) => state.frame)

    const [crtToggle, setCrtToggle] = useState<boolean>(frameState.useCrt)

    const setCrtToggleEvent = (e:boolean) => {
        const newState = e
        setCrtToggle(newState)
        frameDispatcher.setUseCrt(dispatch, analytics, newState)
    }

    return (
        <div className="defaultSettingsTable-wrapper dsPage-wrapper">
            <table>
                <tbody>
                    <tr>
                        <td>
                            <label>Enable CRT Filter</label>
                        </td>
                        <td>
                            <input type="checkbox" checked={crtToggle} onChange={(e) => setCrtToggleEvent(e.target.checked)} />
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
