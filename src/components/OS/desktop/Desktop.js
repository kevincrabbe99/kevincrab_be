import React from 'react'
import './desktop.css'
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'

import Icon from './../elements/icons/Icon'
//https://artage.io/en/icon-packs/original-windows-95-icons
import ICN_desktop from '../../../img/my_computer.png'
import ICN_recycle from '../../../img/recycle_bin.png'

const Desktop = props => {
    return (
        <div className = "desktop_main" >
            <DragDropContext>
                <Droppable droppableId = "desktop_icons">
                    {(provided) => (
                        <ul className = "icons_list" {...provided.droppableProps} ref = {provided.innerRef}>

                            <Draggable key = "my_computer" draggableId = "my_computer" index = "0">
                                {(provided) => (
                                    <li className = "icon_item" {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef} >
                                        <Icon img = {ICN_desktop} label = "My Computer" />
                                    </li>
                                )}
                                
                            </Draggable>

                            <Draggable key = "recycling_bin" draggableId = "recycling_bin" index = "1">
                                {(provided) => (
                                    <li className = "icon_item" {...provided.draggableProps} {...provided.dragHandleProps} ref = {provided.innerRef} >
                                        <Icon img = {ICN_recycle} label = "Recycle Bin" />
                                    </li>
                                )}
                            </Draggable>
                            {provided.placeholder}
                        </ul>
                    )}
                    
                </Droppable>
            </DragDropContext>
        </div>
    )
}

Desktop.propTypes = {

}// rwar

export default Desktop
