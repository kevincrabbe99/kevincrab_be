import React, { useState } from 'react'
import "./startMenu.scss"

// import startMenuJson from '../../assets/json/start_menu.json'
import { useDispatch, useSelector } from 'react-redux'
import { mapContentDataToFolderData } from '../../util/mappers/mapContentDataToFolderData'
import { FileNode, FileNodeType } from '../../types/FileNode'
import { handleIconAction } from '../../util/helpers'
import { ScopesEnum } from '../../reducers/scopeReducer'
import { getAnalytics } from 'firebase/analytics'
import { windowDispatcher } from '../../dispatchers/windowDispatcher'
import { WindowTypesEnum } from '../../reducers/windowReducer'



export default function StartMenu(props: any) {

  const setIsStartMenuOpen = props.setIsStartMenuOpen

  const dispatch = useDispatch();
  const scopesState = useSelector((state: any) => state.scopes)

  const analytics = getAnalytics()

  const [selectedSubmenu, setSelectedSubmenu] = useState<string | null>(null)

  const handleDestinationAction = (item: FileNode) => {
    
    if (item.type === FileNodeType.FOLDER) {
        windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.FOLDER, item.name)
    } else {
        const action = item.action!
        handleIconAction(action, dispatch, analytics)
    }

    setIsStartMenuOpen(false)
  }

  const getStartMenuLabel = (): string => {
    switch(scopesState.scopes[0]) {
        case ScopesEnum.EMULATOR:
            return "WinEmulator"
        case ScopesEnum.PERSONAL_WEBSITE:
            return "KevinCrabbe"
        case ScopesEnum.RESUME:
            return "Kevin Crabbe"
        case ScopesEnum.PORTFOLIO:
            return "kevincrab.be"
        default:
            return "kevincrab.be"
    }
  }

  const startMenuNodes: FileNode[] = mapContentDataToFolderData("Start Menu", scopesState.scopes)

  return (
    <div className="startMenu-wrapper">
        <div className="startMenu-left-box">
            <label className="rotetedWindowsText">
                <span className="rwt-windows">{getStartMenuLabel()}</span>
                <span className="rwt-95">95</span>
            </label>
        </div>
        <div className="startMenu-right-box">
            <div className="startMenu-list">
                <ul>
                    {
                        startMenuNodes.map((item: FileNode, index: number) => 
                            // if last item in list
                            index === startMenuNodes.length - 1 ?
                            <React.Fragment key={`frag-${index}`}>
                                <li className="last-item" key={`sm-li-${index}`}> 
                                </li>
                                <RenderStartMenuItemActionWrapper 
                                    key={`rsmica-${item.name.split(" ").join("")}`} 
                                    item={item} 
                                    setSelectedSubmenu={setSelectedSubmenu} 
                                    handleDestinationAction={handleDestinationAction} />
                            </React.Fragment>
                            : 
                            <RenderStartMenuItemActionWrapper 
                                key={`rsmica-${item.name.split(" ").join("")}`} 
                                item={item} 
                                setSelectedSubmenu={setSelectedSubmenu} 
                                handleDestinationAction={handleDestinationAction} 
                                selectedSubmenu={selectedSubmenu} />
                        )
                    }
                </ul>
            </div>
        </div>
    </div>
  )
}


const RenderStartMenuItemActionWrapper = (props:any) => {
   
    const item: FileNode = props.item
    const setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>> = props.setSelectedSubmenu
    const handleDestinationAction: any = props.handleDestinationAction
    const selectedSubmenu: string | null = props.selectedSubmenu

    if (!item) { return <></>; }

    if (item.type === FileNodeType.FOLDER) {
        return (
            <li id={`sm-tf-li-${item.name.split(" ").join("") }`} key={`sm-tf-li-${item.name.split(" ").join("") }`}>
                <div className="startMenu-list-item" onClick={() => setSelectedSubmenu((item.name === selectedSubmenu ? null : item.name ))}>
                    {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                </div>
                {
                    item.children &&
                    item.name === selectedSubmenu ? renderStartMenuSubmenu(item.children, setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    } else if (item.type === FileNodeType.INTERNAL) {
        return (
            <li id={`sm-tI-li-${item.name.split(" ").join("") }`} key={`sm-tI-li-${item.name.split(" ").join("") }`}>
                <div className="startMenu-list-item" onClick={() => handleDestinationAction(item)}>
                    {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                </div>
                {
                    item.children &&
                    item.name === selectedSubmenu ? renderStartMenuSubmenu(item.children, setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    } else if (item.type === FileNodeType.EXTERNAL) {
        return (
            <li id={`sm-tE-li-${item.name.split(" ").join("") }`} key={`sm-tE-li-${item.name.split(" ").join("") }`}>
                <a href = {item.action!.destination as string}>
                    <div className="startMenu-list-item">
                        {renderStartMenuItem(item, setSelectedSubmenu, selectedSubmenu)}
                    </div>
                </a>
                {
                    item.children &&
                    item.name === selectedSubmenu ? renderStartMenuSubmenu(item.children, setSelectedSubmenu, handleDestinationAction) : null
                }
            </li>
        )
    } else {
        return <></>
    }
    
}

const renderStartMenuItem = (item: FileNode, setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>, selectedSubmenu?: string | null) => {
    return (
        <>
            <div className="startMenu-list-item-icon">
                <img src={`./icons/${item.icon}`} alt={item.name || ''} />
            </div>
            <div className="startMenu-list-item-label">
                <label>{item.name}</label>
            </div>
            {
                item.children ? <>
                <div className="startMenu-list-item-arrow">
                    <label className="right-tick">&#9658;</label>
                </div>
                </> : null
            }
        </>
    )
}

const renderStartMenuSubmenu = (submenu: FileNode[], setSelectedSubmenu: React.Dispatch<React.SetStateAction<string | null>>, handleDestinationAction: any) => {
    return (
        <div className="startMenu-list-item-submenu">
            <ul>
                {
                    submenu.map((item: FileNode) => 
                        <RenderStartMenuItemActionWrapper key={`rsmica-${item.name.split(" ").join("")}`} item={item} setSelectedSubmenu={setSelectedSubmenu} handleDestinationAction={handleDestinationAction} />
                    //    RenderStartMenuItemActionWrapper(item, setSelectedSubmenu = setSelectedSubmenu, handleDestinationAction)
                    )
                }
            </ul>
        </div>
    )
}
