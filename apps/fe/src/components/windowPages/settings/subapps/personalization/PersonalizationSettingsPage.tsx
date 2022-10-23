import React from 'react'
import { WindowSize } from '../../../../../reducers/windowReducer'
import "./personalizationSettingsPage.scss"

export const OverrideSettingsPersonalizationSize: WindowSize = {
    width: 350,
    height: 130
}

export default function PersonalizationSettingsPage(props: any) {
  return (
    <div className="defaultSettingsTable-wrapper psnSettings-wrapper">
        <table>
            <tbody>
                <tr>
                    <td>
                        <label>Current Profile</label>
                    </td>
                    <td>
                        <div className="selector">
                          <select>
                                <option>Win95 Emulator</option>
                                <option>Kevin's Portfolio</option>
                            </select>
                        </div>
                    </td>
                </tr>
                <tr className="btn-row">
                    <td>
                        <button>Cancel</button>
                        <button>Restart</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}
