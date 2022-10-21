import React, { useEffect, useState } from 'react'
import { WindowConfig } from '../../../reducers/windowReducer';
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import folderToolbarJson from "../../../assets/json/toolsbars/folderToolbarConfig.json"

import "./folderPage.scss"
import FolderIconList from './components/folderIconList/FolderIconList';
import FolderIconGrid from './components/folderIconGrid/FolderIconGrid';

import MyComputerJson from "../../../assets/json/folderFillers/My_Computer.json"
import C_DRIVEJson from "../../../assets/json/folderFillers/C_DRIVE.json"
import { FileNode, FileNodeAction, FileNodeType } from '../../../types/FileNode';
import { useDispatch } from 'react-redux';
import { mapContentDataToFolderData } from './util/mapContentDataToFolderData';
import { browserWindowConfig } from '../browser/BrowserPage';
import { documentWindowConfig } from '../document/DocumentPage';

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

// const mapContentDataToFolderData = (contentData: string) => {
//   switch(contentData) {
//     case "My Computer" :
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

  const handleFileNodeAction = (node: FileNode) => {
    let action = node.action!;
    if (node.type === FileNodeType.FOLDER) {

      console.log("opening windoow folder: ", node)
      folderWindowConfig.contentData = node.name;
      dispatch({
        type: "ADD_WINDOW",
        payload: folderWindowConfig
      })
    } else if (node.type === FileNodeType.INTERNAL) {
      if (action.destination === "OPEN_DOCUMENT") {
        documentWindowConfig.contentData = action.param;
        dispatch({
          type: "ADD_WINDOW",
          payload: documentWindowConfig
        })
      } else if (action.destination === "OPEN_BROWSER") {
        browserWindowConfig.contentData = action.param;
        dispatch({
          type: "ADD_WINDOW",
          payload: browserWindowConfig
        })
      }
    } else if (node.type === FileNodeType.EXTERNAL) {
      let url = action.param;
      window.open(url, '_blank');
    }

    // if (node.action) {
    //   if (!action.isExternal) {
    //     if (action.destination === "OPEN_FOLDER") {
    //       dispatch({
    //         type: "ADD_WINDOW",
    //         payload: {
    //           ...folderWindowConfig,
    //           contentData: action.param
    //         }
    //       })
    //     } else if (action.destination == "OPEN_BROWSER") {
    //       dispatch({
    //         type: "ADD_WINDOW",
    //         payload: {
    //           ...browserWindowConfig,
    //           contentData: action.param
    //         }
    //       })
    //     } else  {
    //       dispatch({
    //         type: "ADD_WINDOW",
    //         payload: {
    //           ...documentWindowConfig,
    //           contentData: action.param
    //         }
    //       })
    //     }
  
    //   }
    // }
  
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