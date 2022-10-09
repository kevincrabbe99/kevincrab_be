import React from 'react'
import "./iconGrid.scss"

import iconJson from '../../assets/json/icons.json'
import { Alignment, Icon, IconGridPosition } from '../../types/Icon'

const MAX_ROWS = 5;
const MAX_COLS = 3;

export default function IconGrid() {
  return (
    <div className="icon-grid-wrapper">
        
        <div className="icon-grid-left">
            <table>
            {
                [...Array(MAX_ROWS)].map((ely, y) => (
                    
                    <IconGridRow y={y} alignment={0} />
                
                ))
            }
            </table> 
        </div>   

        <div className="icon-grid-right">
            <table>
            {
                [...Array(MAX_COLS)].map((ely, y) => (
                    
                    <IconGridRow y={y} alignment={1} />
                
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
        [...Array(5)].map((elx, x) => (
            <RenderIconAtPosition_Proxy x={x} y={y} alignment={alignment} />
        )) }
    </tr>
}

function RenderIconAtPosition_Proxy(props: any) { 
    let x = props.x; let y = props.y;
    let alignment = props.alignment;     
    const icon: Icon | undefined = getIconAtPosition(x, y, alignment);
    if (icon && !icon.isHidden) {
        if (icon.action.isExternal) {
            return <RenderIconWithExternalAction x={x} y={y} alignment={alignment} icon={icon} />
        } else {
            return <RenderIconWithInternalAction x={x} y={y} alignment={alignment} icon={icon} />
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
    return (
        <td>
            <div className="icon-wrapper">
                <div className="icon-img-wrapper">
                    <img src={`./icons/${icon?.icon}`}></img>
                </div>
                <label>{icon?.name}</label>
            </div>
        </td>
        )
}

function getIconAtPosition(x: number, y: number, alignment: Alignment) : Icon | undefined {
    // align from right 
    if (alignment == Alignment.RIGHT) {
        x = (MAX_COLS+1) - x
    }

    for (var i = 0; i < iconJson.length; i++) {
        let curIconPos = iconJson[i].position;
        if (curIconPos.x == x && curIconPos.y == y && curIconPos.alignment == alignment) {
            return iconJson[i];
        }
    }
}