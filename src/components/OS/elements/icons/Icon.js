import React from 'react'
import './icon.css'

const Icon = props => {
    return (
        <div className = "icon_main">
            <img src = {props.img}></img>
            <p>{props.label}</p>
        </div>
    )
}

Icon.propTypes = {

}

export default Icon
