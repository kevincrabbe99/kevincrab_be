import React, { useEffect, useState } from 'react'
import "./documentPage.scss"

import docToolbarJson from "../../../assets/json/toolsbars/documentToolbarConfig.json"
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import { WindowConfig } from '../../../reducers/windowReducer';



export const documentWindowConfig: WindowConfig = {
  "type": 2,
  "position": {
      "x": 200,
      "y": 100,
  },
  "size": {
      "width": 450,
      "height": 600
  },
  "title": "Resume - Kevin Crabbe.pdf",
  "showXButton": true,
  "icon": "WordPad_document.ico"
};

export default function DocumentPage(props: any) {

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
    <div className="docPage-wrapper">
      <div className="docPage-top">
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
      <div className="docPage-content"> 
        <div className="docPage-doc-wrapper">
          {
            contentData ? 
              <iframe src={contentData}></iframe>
            : <div className="docPage-def-textarea">
                <textarea></textarea>
              </div>
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
      <div className="docPage-submenu">
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