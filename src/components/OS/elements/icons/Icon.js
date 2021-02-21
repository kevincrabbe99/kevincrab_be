import React from 'react'
import './icon.css'

const Icon = props => {

    if (props.type == 0 || props.type == null) {
        return (
            <div className = "icon_main">
                <img src = {props.img}></img>
                <p>{props.label}</p>
            </div>
        )
    } else {
        return (
            <div className = "icon_main" >
                <img src = {props.img} style = {{
                    width: '55%',
                    height: 'auto'
            }}></img>
                <p>{props.label}</p>
            </div>
        )
    }

}

Icon.propTypes = {

}

export default Icon
