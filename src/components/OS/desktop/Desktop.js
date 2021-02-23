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


    desktopLeadingMargin = (window.innerWidth - 800)/2
    desktopTopMargin = (window.innerHeight - 800)/2

    constructor (props) {
        super(props)

        this.state = {
            icons: {
            //  [label, img, xPos, yPos]    
            //yPos + 70
                my_computer: {label: "My Computer", img: ICN_desktop , xPos: this.desktopLeadingMargin + 10, yPos: this.desktopTopMargin + 20},
                recycle_bin: {label: "Recycle Bin", img: ICN_recycle , xPos: this.desktopLeadingMargin + 10, yPos:  this.desktopTopMargin +90},
                my_documents: {label: "My Documents", img: ICN_myDocuments, xPos: this.desktopLeadingMargin + 10, yPos: this.desktopTopMargin + 150, type: 1},
                internet: {label: "The Internet", img: ICN_internet, xPos: this.desktopLeadingMargin + 10, yPos: this.desktopTopMargin + 225, type: 1},

                linkedIn_shortcut: {label: "Shortcut to LinkedIn", img: ICN_webShortcut, xPos: this.desktopLeadingMargin + 10, yPos: this.desktopTopMargin + 400, type: 1},
                github_shortcut: {label: "Shortcut to GitHub", img: ICN_webShortcut, xPos: this.desktopLeadingMargin + 10, yPos: this.desktopTopMargin + 470, type: 1},

                resume_preview: {label: "Kevin Crabbe Resume", img: ICN_document, xPos: this.desktopLeadingMargin + 220, yPos: this.desktopTopMargin + 250, type: 1},
                contact_email: {label: "Email Me", img: ICN_Mail, xPos: this.desktopLeadingMargin + 300, yPos: this.desktopTopMargin + 250, type: 1},
                


                statTimer_download: {label: "StatTimer IOS App Download", img: ICN_webDocument, xPos: this.desktopLeadingMargin + 450, yPos:  this.desktopTopMargin + 300, type: 1},
                statTimer_github: {label: "Shortcut to StatTimer Github", img: ICN_webShortcut, xPos: this.desktopLeadingMargin + 450, yPos:  this.desktopTopMargin + 380, type: 1},

                thisWebsite_github: {label: "Shortcut to this Github", img: ICN_webShortcut, xPos: this.desktopLeadingMargin + 540, yPos: this.desktopTopMargin +  380, type: 1}
            
            }

            
        }

/*
        this.icons = Object.entries( this.state.icons ).map(([key, icon]) => 
            <div
                key = {key}
                draggable = "true"   
                style = {{ 
                    position: 'absolute', 
                    top: icon.yPos + 'px',
                    left: icon.xPos + 'px'
                }} 
                onClick = {() => clickedIconHandler({key})}
                onDrag = {(event) => this.setIconPosition(event, {key})
            }
                >
                <Icon img = {icon.img} label = {icon.label} type = {icon.type}  />
            </div>
        
        );
*/



    }

    draggingIcon = null


    clickedIconHandler(key) {

        switch (key) {
            case "contact_email":
                window.open('mailto:kevincrabbe99@gmail.com?subject=Hey Kevin!&body=Hey Kevin, I found your email via kevincrab.be');
                break;

            default:
                break;
        }

    }

    setIconPosition(event, key) {


        if (key == null) { return }
        this.draggingIcon = key.key

        if (event.nativeEvent.isDo)

        console.log("setting position for ", key, "to ", event.nativeEvent.offsetX, ", ", event.nativeEvent.offsetY)

        if (event.pageX == 0) { return; } // this stops it from snapping back

        var newIconPosX = /*this.state.icons[this.draggingIcon].xPos + */ event.pageX - 20;
        var newIconPosY = /*this.state.icons[this.draggingIcon].yPos + */ event.pageY - 20;

        var newIconData = this.state.icons;
        newIconData[key.key].xPos = newIconPosX;
        newIconData[key.key].yPos = newIconPosY;


        this.setState({
            icons: newIconData
        })

//        console.log("XPOS: ", this.state.icons[this.draggingIcon].xPos);
        //console.log("set state X for: ", this.state.icons.key.offsetX)
        //console.log("set state Y for: ", this.state.icons.key.offsetY)
    }
    

    endIconDrag(key) {
        if (key == null) { return }

        console.log("ended drag", this.state);
            

        console.log("XPOS: ", this.state.icons[key.key].xPos);
    }

    

    render() {

        const iconData = this.state.icons;

        return (

            <div style = {{
                position: 'absolute',
                top: '0em',
                left: '0em',
                width: '100%',
                height: '100%'
            }} >
                {
                Object.entries( iconData ).map(([key, icon]) => 
                <div
                    key = {key}  
                    style = {{ 
                        position: 'absolute', 
                        top: icon.yPos + 'px',
                        left: icon.xPos + 'px',
                        cursor: 'default'
                    }} 
                    onClick = {() => this.clickedIconHandler({key})}
                    onDrag = {(event) => this.setIconPosition(event, {key})}
                    onDragEnd = {() => this.endIconDrag({key})}
                    >
                    <Icon img = {icon.img} label = {icon.label} type = {icon.type}  />
                </div>
            
                )}    
                
            </div>
       
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