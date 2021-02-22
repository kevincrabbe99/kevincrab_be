import React, { Component, useState } from 'react'
import './OS.css'

import Taskbar from './taskbar/Taskbar'
import Desktop from './desktop/Desktop'
import StartMenu from './start_menu/Start_menu'
import { render } from 'react-dom'



 class OS extends Component {

    
    constructor() { 
        super();

        this.state = {
            startMenuActive: false
        }
    }

    handle_StartMenu() {
        this.setState({ startMenuActive: !this.state.startMenuActive });
    }

    clicked_desktop_bg() {
        if (this.state.startMenuActive) {
            this.handle_StartMenu();
        }
    }

    render() {

        let startMenu_class = this.state.startMenuActive ? 'startMenu_container' : 'startMenu_container_HIDDEN';

        return (
            <div className = "OS_bg">
                
                                
                
                <div className = {startMenu_class}>
                    <StartMenu />
                </div>
                <Taskbar  startMenuHandler =  {this.handle_StartMenu.bind(this)} />

            </div>
        )
    }

}

export default OS
