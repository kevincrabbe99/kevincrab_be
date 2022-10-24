import React from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { appConfig } from '../../../../../configs/configurator'
import { frameDispatcher } from '../../../../../dispatchers/frameDispatcher'
import { scopeDispatcher } from '../../../../../dispatchers/scopeDispatcher'
import { windowDispatcher } from '../../../../../dispatchers/windowDispatcher'
import { ScopesEnum } from '../../../../../reducers/scopeReducer'
import { WindowSize } from '../../../../../reducers/windowReducer'
import { mapScopeToSubdomain } from '../../../../../util/mappers/mapSubdomainToScope'
import "./personalizationSettingsPage.scss"

export const OverrideSettingsPersonalizationSize: WindowSize = {
    width: 350,
    height: 130
}

const JumpToScopeOptions = [
    { name: "Emulator", value: ScopesEnum.EMULATOR },
    { name: "Resume", value: ScopesEnum.RESUME },
    { name: "Personal Website", value: ScopesEnum.PERSONAL_WEBSITE },
    { name: "Resume Website", value: ScopesEnum.RESUME },
    { name: "Resume Portfolio", value: ScopesEnum.PORTFOLIO },
]

export default function PersonalizationSettingsPage(props: any) {

    const windowConfig = props.windowConfig

    const dispatch = useDispatch()
    const scopesState = useSelector((state: any) => state.scopes)

    // selector ref
    const selectorRef = React.useRef<HTMLSelectElement>(null)
    
    const cancelEvent = () => {
        windowDispatcher.closeWindow(dispatch, windowConfig.id)
    }

    const submitEvent = () => {
        var selector: HTMLSelectElement = selectorRef.current as HTMLSelectElement

        // get the selected value
        var selectedValue: ScopesEnum = selector.options[selector.selectedIndex].value as unknown as ScopesEnum

        // console.log("value: ", selectedValue);
        
        // go to page depending on scope
        const newSubdomain = mapScopeToSubdomain(selectedValue)
        // console.log("newSubdomain: ", newSubdomain);
        
        // replace the domain with the new subdomain
        const newUrl = window.location.href.replace(window.location.hostname, newSubdomain + "." + window.location.hostname)
        window.location.href = newUrl
    }
    

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
                                <select ref={selectorRef}>
                                    {
                                        JumpToScopeOptions.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value} {...scopesState.scopes[0] === option.value ? {selected: true} : {}}>{option.name}</option>
                                              
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </td>
                    </tr>
                    <tr className="btn-row">
                        <td>
                            <button onClick={cancelEvent}>Cancel</button>
                            <button onClick={submitEvent}>Restart</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
