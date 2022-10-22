import React from 'react'
import "./iconGrid.scss"

// import iconJson from '../../assets/json/icons.json'
import { Alignment, Icon, IconActionType, IconGridPosition } from '../../types/Icon'
import { DestinationActionTriggers } from '../../types/DestinationActionTriggers';
import { useDispatch } from 'react-redux';

import { folderWindowConfig } from '../windowPages/folder/FolderPage';
import { browserWindowConfig } from '../windowPages/browser/BrowserPage';
import { documentWindowConfig } from '../windowPages/document/DocumentPage';
import { mapContentDataToFolderData } from '../windowPages/folder/util/mapContentDataToFolderData';
import { FileNode, FileNodeType } from '../../types/FileNode';


const MAX_ROWS = 5;
const MAX_COLS = 2;



export default function IconGrid() {

    const dispatch = useDispatch();

    const handleDestinationAction = (action: IconActionType) => {
        switch(action.destination) {
            case DestinationActionTriggers.OPEN_DOCUMENT:
                documentWindowConfig.contentData = action.param;
                dispatch({type: "ADD_WINDOW", payload: documentWindowConfig});
                break;
            case DestinationActionTriggers.OPEN_FOLDER:
                folderWindowConfig.contentData = action.param;
                dispatch({type: "ADD_WINDOW", payload: folderWindowConfig});
                break;
            case DestinationActionTriggers.OPEN_BROWSER:
                browserWindowConfig.contentData = action.param;
                dispatch({type: "ADD_WINDOW", payload: browserWindowConfig});
                break;
            default:
                 break;
        }
    }

  return (
    <div className="icon-grid-wrapper">
        
        <div className="icon-grid-left">
            <table>
            {
                [...Array(MAX_ROWS)].map((ely, y) => (
                    
                    <IconGridRow y={y} alignment={0} handleDestinationAction={handleDestinationAction} />
                
                ))
            }
            </table> 
        </div>   

        <div className="icon-grid-right">
            <table>
            {
                [...Array(MAX_ROWS)].map((ely, y) => (
                    
                    <IconGridRow y={y} alignment={1}  handleDestinationAction={handleDestinationAction} />
                
                ))
            }
            </table>
        </div>




    </div>
  )
}


function IconGridRow(props: any) {
    let y: number = props.y
    let alignment: Alignment = props.alignment;
    return  <tr> {
        [...Array(MAX_COLS)].map((elx, x) => (
            <RenderIconAtPosition_Proxy x={x} y={y} alignment={alignment} handleDestinationAction={props.handleDestinationAction} />
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
        return <td> </td>
    }
}   

function RenderIconWithExternalAction(props: any) { 
    const icon: Icon = props.icon;
    return (
        <td>
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