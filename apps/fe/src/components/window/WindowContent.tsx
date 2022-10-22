import { WindowConfig } from "../../reducers/windowReducer"
import BrowserPage from "../windowPages/browser/BrowserPage"
import DocumentPage from "../windowPages/document/DocumentPage"
import FolderPage from "../windowPages/folder/FolderPage"
import LoginWindowPage from "../windowPages/login/LoginWindowPage"
import FallbackPage from "../windowPages/fallback/FallbackPage"
import Run from "../windowPages/run/Run"
import SettingsPage from "../windowPages/settings/SettingsPage"

export enum SettingsPageTypesEnum {
    DISPLAY = 0,
    PERSONALIZATION = 1,
}

export const renderWindowContent = (windowConfig: WindowConfig) => {
    switch(windowConfig.type) {
        case 0:
            return <LoginWindowPage />
        case 2:
            return <DocumentPage contentData={windowConfig.contentData}/>
        case 3:
            return <FolderPage contentData={windowConfig.contentData}/>
        case 4:
            return <BrowserPage contentData={windowConfig.contentData}/>
        case 5:
            return <SettingsPage contentData={windowConfig.contentData} windowConfig={windowConfig}/>
        case 6:
            return <Run windowConfig={windowConfig} />
        case 9:
            return <FallbackPage windowConfig={windowConfig} />
        default:
            return <FallbackPage windowConfig={windowConfig} />
    }
}