import React, { Component, useState } from 'react'
import './Start_Button.css'
import win_icon from './../../../../../img/windows.png'
import { render } from 'react-dom'

class Start_button extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            startBtnActive: false
        }
    }

    setStartBtnUnActive()  {
        console.log("un clicked")
        this.setState({startBtnActive: false})
        this.props.startMenuHandler();
    }
    
    setStartBtnActive() {
        console.log("clicked")
        this.setState({startBtnActive: true})
    }



    render() {
        let btn_class = this.state.startBtnActive ? "startButton_bg_activated" : "startButton_bg"
        return (


        <div className = "startButton_main"  
            onMouseDown = {() => this.setStartBtnActive()}
            onMouseUp = {() => this.setStartBtnUnActive()}
            >
            <div className = {btn_class} >
                <table className = 'startButton'>
                    <tbody>
                        <tr>
                            <td>
                                <img src = {win_icon}  ></img>
                            </td>
                            <td>
                                <p>Start</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}


export default Start_button
