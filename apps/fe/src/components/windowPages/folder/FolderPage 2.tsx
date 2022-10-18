import React, { useEffect, useState } from 'react'
import { WindowConfig } from '../../../reducers/windowReducer';
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import folderToolbarJson from "../../../assets/json/toolsbars/folderToolbarConfig.json"

import "./folderPage.scss"
import FolderIconList from './components/folderIconList/FolderIconList';
import FolderIconGrid from './components/folderIconGrid/FolderIconGrid';

import MyComputerJson from "../../../assets/json/folderFillers/My_Computer.json"
import C_DRIVEJson from "../../../assets/json/folderFillers/C_DRIVE.json"
import { FileNodeAction } from '../../../types/FileNode';
import { useDispatch } from 'react-redux';
import { mapContentDataToFolderData } from './util/mapContentDataToFolderData';
import { documentWindowConfig } from '../document/DocumentWindow';

export const folderWindowConfig: WindowConfig = {
    "type": 3,
    "position": {
        "x": 200,
        "y": 150,
    },
    "size": {
        "width": 400,
        "height": 350
    },
    "title": "Exploring",
    "showXButton": true,
    "icon": "Folder.ico"
};

// const mapContentDataToFolderData = (contentData: string) => {
//   switch(contentData) {
//     case "MY_COMPUTER" :
//       return MyComputerJson;
//     case "C://":
//       return C_DRIVEJson;
//     default:
//       return null;
//   }
// }

export default function FolderPage(props: any) {

  const dispatch = useDispatch();

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

  const handleFileNodeAction = (action: FileNodeAction) => {
    if (!action.isExternal) {
      if (action.destination === "OPEN_FOLDER") {
        dispatch({
          type: "ADD_WINDOW",
          payload: {
            ...folderWindowConfig,
            contentData: action.param
          }
        })
      } else {
        dispatch({
          type: "ADD_WINDOW",
          payload: {
            ...documentWindowConfig,
            contentData: action.param
          }
        })
      }

    }
  }

//  listen for any click event 
  useEffect(() => {
    const clickAnywhere = (event: any) => {
      console.log("click anywhere")
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
            <FolderIconList content={mapContentDataToFolderData(contentData)} 
                            handleFileNodeAction = {handleFileNodeAction}/> :
            <FolderIconGrid content={mapContentDataToFolderData(contentData)}
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