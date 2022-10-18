import React, { useEffect, useState } from 'react'
import "./browserPage.scss"

import docToolbarJson from "../../../assets/json/toolsbars/documentToolbarConfig.json"
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import { WindowConfig } from '../../../reducers/windowReducer';


export const browserWindowConfig: WindowConfig = {
  "type": 4,
  "position": {
      "x": 200,
      "y": 150,
  },
  "size": {
      "width": 475,
      "height": 500
  },
  "title": "World Wide Web",
  "showXButton": true,
  "icon": "internet.ico"
};


export default function BrowserPage(props: any) {

  const contentData: string = props.contentData

  const [selectedToolbarSubmenu, setSelectedToolbarSubmenu] = useState<number | null>(null);
  const [toolbarSubmenuHardSelected, setToolbarSubmenuHardSelected] = useState<boolean>(false);

  const hoverToolbarEvent = (event: any, index: number) => {
    if (!toolbarSubmenuHardSelected) {
      setSelectedToolbarSubmenu(index)
    }
  }

  const hideAllToolbarSubmenus = () => {
      setSelectedToolbarSubmenu(null)
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
    <div className="browserPage-wrapper">
      <div className="browserPage-top">
        <ul>
          {
            docToolbarJson.map((item: ToolbarConfig, index: number) => {
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
      <div className="browserpage-infobars">
          <div className="browserPage-infobar-title">
            <label>Document Title:</label><input type="text"></input>
          </div>
          <div className="browserPage-infobar-url">
            <label>Document URL:</label><input type="text"></input>
          </div>
      </div>
      <div className="browserPage-content">
        <div className="browserPage-doc-wrapper">
          <iframe src={contentData}></iframe>
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
      <div className="browserPage-submenu">
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