import React from 'react'
import "./iconGrid.scss"

// import iconJson from '../../assets/json/icons.json'
import { Alignment, Icon } from '../../types/Icon';
import { useDispatch } from 'react-redux';

import { mapContentDataToFolderData } from '../../util/mappers/mapContentDataToFolderData';
import { FileNode, FileNodeAction, FileNodeType } from '../../types/FileNode';
import { useSelector } from 'react-redux';
import { ScopesEnum } from '../../reducers/scopeReducer';
import { fileManager } from '../../util/fileManager';
import { getAnalytics } from 'firebase/analytics';
import { handleIconAction } from '../../util/helpers';


const MAX_ROWS = 8;
const MAX_COLS = 2;



export default function IconGrid() {

    const analytics = getAnalytics()

    const dispatch = useDispatch();
    const scopesState = useSelector((state: any) => state.scopes);

    const handleDestinationAction = (action: FileNodeAction) => {
        handleIconAction(action, dispatch, analytics)
    }

  return (
    <div className="icon-grid-wrapper">
        
        <div className="icon-grid-left">
            <table>
                <tbody>
                    {
                        [...Array(MAX_ROWS)].map((ely, y) => (
                            
                            <IconGridRow 
                                key={`icgr-a1-${y}`} 
                                y={y} alignment={0} 
                                handleDestinationAction={handleDestinationAction} 
                                scopes={scopesState.scopes}
                                />
                        
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
                            
                            <IconGridRow 
                                key={`icgr-a0-${y}`} 
                                y={y} alignment={1}  
                                handleDestinationAction={handleDestinationAction} 
                                scopes={scopesState.scopes}/>
                        
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
            <RenderIconAtPositionProxy 
                key={`ic-proxy-a${props.alignment}-y${y}-x${x}`} 
                x={x} y={y} alignment={alignment} 
                handleDestinationAction={props.handleDestinationAction} 
                scopes={props.scopes}/>
        )) }
    </tr>
}

function RenderIconAtPositionProxy(props: any) { 
    let x = props.x; let y = props.y;
    let scopes = props.scopes;
    let alignment = props.alignment;     
    const icon: FileNode | undefined = GetIconAtPosition(x, y, alignment, scopes);
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
            <a href={icon.action.destination} target="_blank" rel="noreferrer">
                <div className="icon-wrapper">
                    <div className="icon-img-wrapper">
                        <img src={`./icons/${icon?.icon}`} alt={icon?.name || ''}></img>
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
                    <img src={`./icons/${icon?.icon}`} alt={icon?.name || ''}></img>
                </div>
                <label>{icon?.name}</label>
            </div>
        </td>
        )
}

function GetIconAtPosition(x: number, y: number, alignment: Alignment, scopes: ScopesEnum[]) : FileNode | undefined {
    // align from right 
    if (alignment === Alignment.RIGHT) {
        x = (MAX_COLS - 1) - x
    }
    
    let iconJson = mapContentDataToFolderData("Desktop", scopes);

    // search for icon
    for (var i = 0; i < iconJson.length; i++) {
        let curIconPos = iconJson[i].position!;
        if (curIconPos.x === x && curIconPos.y === y && curIconPos.alignment === alignment) {
            if (fileManager.isScoped(scopes, iconJson[i].name)) {
                return iconJson[i];
            }
        }
    }
}
