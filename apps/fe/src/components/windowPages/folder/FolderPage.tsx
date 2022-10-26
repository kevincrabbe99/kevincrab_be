import React, { useEffect, useState } from 'react'
import { WindowConfig, WindowTypesEnum } from '../../../reducers/windowReducer';
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import folderToolbarJson from "../../../assets/json/toolsbars/folderToolbarConfig.json"

import "./folderPage.scss"
import FolderIconList from './components/folderIconList/FolderIconList';
import FolderIconGrid from './components/folderIconGrid/FolderIconGrid';

import MyComputerJson from "../../../assets/json/folderFillers/My_Computer.json"
import C_DRIVEJson from "../../../assets/json/folderFillers/C_DRIVE.json"
import { FileNode, FileNodeAction, FileNodeType } from '../../../types/FileNode';
import { useDispatch } from 'react-redux';
import { mapContentDataToFolderData } from '../../../util/mappers/mapContentDataToFolderData';
import { DestinationActionTriggers } from '../../../types/DestinationActionTriggers';
import { FrameStatesEnum } from '../../../reducers/frameReducer';
import { windowDispatcher } from '../../../dispatchers/windowDispatcher';
import { frameDispatcher } from '../../../dispatchers/frameDispatcher';
import { handleIconAction } from '../../../util/helpers';
import { useSelector } from 'react-redux';

const WINDOW_HEIGHT = 400
const WINDOW_WIDTH = WINDOW_HEIGHT
const WINDOW_X = (document.documentElement.clientWidth / 2) - (WINDOW_WIDTH / 2) - 100
const WINDOW_Y = (document.documentElement.clientHeight / 2) - (WINDOW_HEIGHT / 2) - 100


export const folderWindowConfig: WindowConfig = {
    "type": 3,
    "position": {
        "x": WINDOW_X,
        "y": WINDOW_Y,
    },
    "size": {
        "width": WINDOW_WIDTH,
        "height": WINDOW_HEIGHT
    },
    "title": "Exploring",
    "showXButton": true,
    "icon": "Folder.ico"
};

export default function FolderPage(props: any) {

  const dispatch = useDispatch();
  const scopesState = useSelector((state: any) => state.scopes)

  const contentData: string = props.contentData

  const [selectedToolbarSubmenu, setSelectedToolbarSubmenu] = useState<number | null>(null);
  const [toolbarSubmenuHardSelected, setToolbarSubmenuHardSelected] = useState<boolean>(false);

  // view modes
  const [viewMode, setViewMode] = useState<number>(1);
  enum ViewMode {
    LIST = 0,
    GRID = 1
  }

  const hoverToolbarEvent = (event: any, index: number) => {
    if (!toolbarSubmenuHardSelected) {
      setSelectedToolbarSubmenu(index)
    }
  }

  const hideAllToolbarSubmenus = () => {
      setSelectedToolbarSubmenu(null)
  }

  const handleFileNodeAction = (node: FileNode) => {

    let action = node.action!;
    if (node.type === FileNodeType.FOLDER) {
      windowDispatcher.openWindow(dispatch, WindowTypesEnum.FOLDER, node.name)
    } else if (node.type === FileNodeType.INTERNAL) {
      handleIconAction(action, dispatch)
    } else if (node.type === FileNodeType.EXTERNAL) {
      let url = action.destination;
      window.open(url, '_blank');
    }
  
  }

//  listen for any click event 
  useEffect(() => {
    const clickAnywhere = (event: any) => {
      // console.log("click anywhere")
      hideAllToolbarSubmenus()
    }

    document.addEventListener("click", clickAnywhere);
    return () => {
      document.removeEventListener("click", clickAnywhere);
    };
  })
  
  return (
    <div className="folderPage-wrapper">
      <div className="folderPage-top">
        <ul>
          {
            folderToolbarJson.map((item: ToolbarConfig, index: number) => {
              return (
                <li key={`${item.label}-root`} 
                onMouseOverCapture={(e) => hoverToolbarEvent(e, index)}
                >
                  {item.label}
                  {item.submenu ? renderSubmenu(item, index, selectedToolbarSubmenu) : null}
                </li>
              )
            })
          }
        </ul>
      </div>
      <div className="folderPage-content">
        <div className="folderPage-content-wrapper">
          {
            viewMode === ViewMode.LIST ?
            <FolderIconList content={mapContentDataToFolderData(contentData, scopesState.scopes)} 
                            handleFileNodeAction = {handleFileNodeAction}/> :
            <FolderIconGrid content={mapContentDataToFolderData(contentData, scopesState.scopes)}
                            handleFileNodeAction = {handleFileNodeAction} />
          }
        </div>
      </div>
    </div>
  )

}


const renderSubmenu = (item: ToolbarConfig, index: number, selectedToolbarPosition: number | null) => {

  return (
    <>
    {
      selectedToolbarPosition == index ?
      <div className="folderPage-submenu">
        <ul>
          {
            item.submenu!.map((item: ToolbarSubmenuConfig, index: number) => {
              return (
                <li key={`${item.label}-${index}`}>{item.label}</li>
              )
            })
          }
        </ul>
      </div>
      : null
    }
   </>
  )
}