import React, { Component, useState } from 'react'
import './desktop.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import Icon from './../elements/icons/Icon'
//https://artage.io/en/icon-packs/original-windows-95-icons
import ICN_desktop from '../../../img/my_computer.png'
import ICN_recycle from '../../../img/recycle_bin.png'
import ICN_internet from '../../../img/internet.ico'
import ICN_webDocument from '../../../img/Web-document.ico'
import ICN_webShortcut from '../../../img/web_shortcut.ico'
import ICN_myDocuments from '../../../img/my_documents.ico'
import ICN_folder from '../../../img/Folder.ico'
import ICN_document from '../../../img/WordPad_document.ico'
import ICN_Mail from '../../../img/Mail.ico'

import { render } from 'react-dom'



 class Desktop extends Component {

    constructor (props) {
        super(props)

        this.state = {
            icons: [
            //  [label, img, xPos, yPos]    
            //yPos + 70
                {label: "My Computer", img: ICN_desktop , xPos: 10, yPos: 20},
                {label: "Recycle Bin", img: ICN_recycle , xPos: 10, yPos: 90},
                {label: "My Documents", img: ICN_myDocuments, xPos: 10, yPos: 150, type: 1},
                {label: "The Internet", img: ICN_internet, xPos: 10, yPos: 225, type: 1},

                {label: "Shortcut to LinkedIn", img: ICN_webShortcut, xPos: 10, yPos: 400, type: 1},
                {label: "Shortcut to GitHub", img: ICN_webShortcut, xPos: 10, yPos: 470, type: 1},

                {label: "Kevin Crabbe Resume", img: ICN_document, xPos: 220, yPos: 250, type: 1},
                {label: "Email Me", img: ICN_Mail, xPos: 300, yPos: 250, type: 1},
                


                {label: "StatTimer IOS App Download", img: ICN_webDocument, xPos: 450, yPos: 300, type: 1},
                {label: "Shortcut to StatTimer Github", img: ICN_webShortcut, xPos: 450, yPos: 380, type: 1},

                {label: "Shortcut to this Github", img: ICN_webShortcut, xPos: 540, yPos: 380, type: 1}
            
            ]
        }

        this.icons = this.state.icons.map((icon) => 
            <div style = {{
                    position: 'absolute', 
                    top: icon.yPos + 'px',
                    left: icon.xPos + 'px'
                }}>
                <Icon img = {icon.img} label = {icon.label} type = {icon.type} />
            </div>
        
        );
    }

     
    


    render() {
        return (
    <div>
            {this.icons}
    </div>
            /*
            <div className = "desktop_main" >

                {this.state.icons.map((label, img, xPos, yPos) => {
                
                    
                })}

                <div style = {{
                        position: 'absolute', 
                        top: this.state.icons[0][2] + 'em',
                        left: this.state.icons[0][3] + 'em'
                    }}> 
                    <Icon img = {this.state.icons[0][1]} label = {this.state.icons[0][0]}  />
                </div>
                <Icon img = {ICN_recycle} label = "Recycle Bin" />
            </div>
            */
        )
    }
}

export default Desktop

/*
var iconPositions = [
    [10,500],
    [0,100]
]


const icon_style = {
    position: 'absolute', 
    top: iconPositions[0][0] + 'em'
};


function Desktop() {


    return (
        <div className = "desktop_main" >
            <div style = {icon_style} >
                <Icon img = {ICN_desktop} label = "My Computer"  />
            </div>
            <Icon img = {ICN_recycle} label = "Recycle Bin" />
        </div>
    )

}

Desktop.propTypes = {

}// rwar

export default Desktop
*/