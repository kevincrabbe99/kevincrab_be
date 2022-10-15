import React, { useEffect, useState } from 'react'
import "./documentPage.scss"

import docToolbarJson from "../../../../assets/json/toolsbars/documentToolbarConfig.json"

interface DocumentToolbarConfig {
  label: string,
  submenu?: DocumentToolbarSubmenuConfig[]
}

interface DocumentToolbarSubmenuConfig {
  label: string,
  accelerator?: string,
  action?: DocumentToolbarAction
  isNotAvailable?: boolean
}

type DocumentToolbarAction  = {
  isExternal: boolean,
  destination: string
}

export default function DocumentPage() {

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
            docToolbarJson.map((item: DocumentToolbarConfig, index: number) => {
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
          <iframe src="./documents/Kevin_Crabbe_Resume.pdf#toolbar=0"></iframe>
        </div>
      </div>
    </div>
  )
}

const renderSubmenu = (item: DocumentToolbarConfig, index: number, selectedToolbarPosition: number | null) => {

  return (
    <>
    {
      selectedToolbarPosition == index ?
      <div className="docPage-submenu">
        <ul>
          {
            item.submenu!.map((item: DocumentToolbarSubmenuConfig, index: number) => {
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