import React from 'react'
import "./iconGrid.scss"

// import iconJson from '../../assets/json/icons.json'
import { Alignment, Icon, IconActionType, IconGridPosition } from '../../types/Icon'
import { DestinationActionTriggers } from '../../types/DestinationActionTriggers';
import { useDispatch } from 'react-redux';

import { folderWindowConfig } from '../windowPages/folder/FolderPage';
import { browserWindowConfig } from '../windowPages/browser/BrowserPage';
import { documentWindowConfig } from '../windowPages/document/DocumentPage';
import { mapContentDataToFolderData } from '../../util/mapContentDataToFolderData';
import { FileNode, FileNodeType } from '../../types/FileNode';
import { windowDispatcher } from '../../dispatchers/windowDispatcher';
import { WindowTypesEnum } from '../../reducers/windowReducer';


const MAX_ROWS = 5;
const MAX_COLS = 2;



export default function IconGrid() {

    const dispatch = useDispatch();

    const handleDestinationAction = (action: IconActionType) => {
        switch(action.destination) {
            case DestinationActionTriggers.OPEN_DOCUMENT:
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.DOCUMENT ,action.param)
                break;
            case DestinationActionTriggers.OPEN_FOLDER:
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.FOLDER ,action.param)
                break;
            case DestinationActionTriggers.OPEN_BROWSER:
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.BROWSER ,action.param)
                break;
            default:
                console.log("Unrecognized action: ", action, " \n Using Fallback Window")
                windowDispatcher.openWindow(dispatch, WindowTypesEnum.FALLBACK)
                break;
        }
    }

  return (
    <div className="icon-grid-wrapper">
        
        <div className="icon-grid-left">
            <table>
                <tbody>
                    {
                        [...Array(MAX_ROWS)].map((ely, y) => (
                            
                            <IconGridRow key={`icgr-a1-${y}`} y={y} alignment={0} handleDestinationAction={handleDestinationAction} />
                        
                        ))
                    }  
                </tbody>
            </table> 
        </div>   

        <div className="icon-grid-right">
            <table>
                <tbody>
                    {
                        [...Array(MAX_ROWS)].map((ely, y) => (
                            
                            <IconGridRow key={`icgr-a0-${y}`} y={y} alignment={1}  handleDestinationAction={handleDestinationAction} />
                        
                        ))
                    }
                </tbody>
            </table>
        </div>




    </div>
  )
}


function IconGridRow(props: any) {
    let y: number = props.y
    let alignment: Alignment = props.alignment;
    return  <tr key={`dk-ic-y${y}-a${alignment}`} >
        { [...Array(MAX_COLS)].map((elx, x) => (
            <RenderIconAtPosition_Proxy key={`ic-proxy-a${props.alignment}-y${y}-x${x}`} x={x} y={y} alignment={alignment} handleDestinationAction={props.handleDestinationAction} />
        )) }
    </tr>
}

function RenderIconAtPosition_Proxy(props: any) { 
    let x = props.x; let y = props.y;
    let alignment = props.alignment;     
    const icon: FileNode | undefined = getIconAtPosition(x, y, alignment);
    if (icon && !icon.isHidden) {
        if (icon.type === FileNodeType.EXTERNAL) {
            return <RenderIconWithExternalAction x={x} y={y} alignment={alignment} icon={icon} />
        } else {
            return <RenderIconWithInternalAction x={x} y={y} alignment={alignment} icon={icon} handleDestinationAction={props.handleDestinationAction} />
        }
    } else {
        return <td></td>
    }
}   

function RenderIconWithExternalAction(props: any) { 
    const icon: Icon = props.icon;
    return (
        <td key={`ic-tr-${props.id}`}>
            <a href={icon.action.destination} target="_blank">
                <div className="icon-wrapper">
                    <div className="icon-img-wrapper">
                        <img src={`./icons/${icon?.icon}`}></img>
                    </div>
                    <label>{icon?.name}</label>
                </div>
            </a>
        </td>
        )
}

function RenderIconWithInternalAction(props: any) {     
    const icon: Icon = props.icon;
    const handleDestinationAction = props.handleDestinationAction;
    return (
        <td>
            <div className="icon-wrapper" onClick={()=>handleDestinationAction(icon.action)}>
                <div className="icon-img-wrapper">
                    <img src={`./icons/${icon?.icon}`}></img>
                </div>
                <label>{icon?.name}</label>
            </div>
        </td>
        )
}

function getIconAtPosition(x: number, y: number, alignment: Alignment) : FileNode | undefined {
    // align from right 
    if (alignment == Alignment.RIGHT) {
        x = (MAX_COLS - 1) - x
    }

    let iconJson = mapContentDataToFolderData("Desktop");

    // search for icon
    for (var i = 0; i < iconJson.length; i++) {
        let curIconPos = iconJson[i].position!;
        if (curIconPos.x == x && curIconPos.y == y && curIconPos.alignment == alignment) {
            return iconJson[i];
        }
    }
}