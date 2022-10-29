import React, { useEffect, useState } from 'react'
import "./documentPage.scss"

import docToolbarJson from "../../../assets/json/toolsbars/documentToolbarConfig.json"
import { ToolbarConfig, ToolbarSubmenuConfig } from '../../../types/ToolbarConfig';
import { WindowConfig } from '../../../reducers/windowReducer';


const DOCUMENT_HEIGHT = ((document.documentElement.clientHeight) * 0.9) - 80
const DOCUMENT_WIDTH = (DOCUMENT_HEIGHT / 11) * 8.5
const DOCUMENT_X = (document.documentElement.clientWidth / 2) - (DOCUMENT_WIDTH / 2) - 40
const DOCUMENT_Y = 40

export const documentWindowConfig: WindowConfig = {
  "type": 2,
  "position": {
      "x": DOCUMENT_X,
      "y": DOCUMENT_Y,
  },
  "size": {
      "width": DOCUMENT_WIDTH,
      "height": DOCUMENT_HEIGHT
  },
  "title": "Resume - Kevin Crabbe.pdf",
  "showXButton": true,
  "icon": "WordPad_document.ico",
  "maximizable": true
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
      // console.log("click anywhere")
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