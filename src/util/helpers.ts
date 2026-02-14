import { documentWindowConfig } from "../components/windowPages/document/DocumentPage"
import { folderWindowConfig } from "../components/windowPages/folder/FolderPage";
import { browserWindowConfig } from "../components/windowPages/browser/BrowserPage";
import { WindowTypesEnum } from "../reducers/windowReducer";
import { fallbackWindowConfig } from "../components/windowPages/fallback/FallbackPage";
import { runWindowConfig } from "../components/windowPages/run/Run";
import { settingsWindowConfig } from "../components/windowPages/settings/SettingsPage";
import { Dispatch } from "redux";
import { DestinationActionTriggers } from "../types/DestinationActionTriggers";
import { windowDispatcher } from "../dispatchers/windowDispatcher";
import { frameDispatcher } from "../dispatchers/frameDispatcher";
import { FileNodeAction } from "../types/FileNode";
import { appConfig } from "../configs/configurator";
import { messengerWindowConfig } from "../components/windowPages/messenger/MessengerPage";
import { genericModalWindowConfig } from "../components/windowPages/genericModal/GenericModalPage";
import { Analytics } from "firebase/analytics";

// Maps WindowTypesEnum to a default window config
export const getDefaultJsonFromWindowType = (type: WindowTypesEnum) => {
    switch (type) {
        case WindowTypesEnum.DOCUMENT:
            return documentWindowConfig;
        case WindowTypesEnum.FOLDER:
            return folderWindowConfig;
        case WindowTypesEnum.BROWSER:
            return browserWindowConfig
        case WindowTypesEnum.SETTINGS:
            return settingsWindowConfig;
        case WindowTypesEnum.RUN:
            return runWindowConfig
        case WindowTypesEnum.MESSENGER:
            return messengerWindowConfig;
        case WindowTypesEnum.GENERIC_MODAL:
            return genericModalWindowConfig;
        case WindowTypesEnum.FALLBACK:
            return fallbackWindowConfig
        default:
            fallbackWindowConfig.title = "Unknown Window Type"
            return fallbackWindowConfig;
    }
}


// Handles FileNodeAction for icons, start menu & folderPage
export const handleIconAction = (action: FileNodeAction, dispatch: Dispatch, analytics: Analytics) => {
    switch(action.destination) {
        case DestinationActionTriggers.SHUTDOWN:
            windowDispatcher.deleteAllWindows(dispatch)
            frameDispatcher.shutdown(dispatch, analytics)
            break;
        case DestinationActionTriggers.OPEN_BROWSER:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.BROWSER ,action.param)
            break;
        case DestinationActionTriggers.OPEN_FOLDER:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.FOLDER ,action.param)
            break;
        case DestinationActionTriggers.OPEN_DOCUMENT:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.DOCUMENT ,action.param)
            break;
        case DestinationActionTriggers.OPEN_SETTINGS:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.SETTINGS, action.param)
            break;
        case DestinationActionTriggers.OPEN_MESSENGER:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.MESSENGER)
            break;
        case DestinationActionTriggers.OPEN_RUN:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.RUN)
            break;
        case DestinationActionTriggers.OPEN_GENERIC_MODAL:
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.GENERIC_MODAL, action.param)
            break
        default:
            console.log("Unrecognized action: ", action, " \n Using Fallback Window")
            windowDispatcher.openWindow(dispatch, analytics, WindowTypesEnum.FALLBACK)
            break;
    }
}

// Returns url with provided subdomain
// If subdomain is invalid, then the normal url is returned
export const getUrlWithSubdomain = (subdomain: string): string => {
    if (!subdomain || subdomain === "") { return getUrl() }
    const newUrl = (appConfig.isHttps ? "https://" : "http://") + subdomain + "." + appConfig.domain + (appConfig.topLevelDomain ? "." + appConfig.topLevelDomain : "")
    return newUrl
}

// Returns the current url
export const getUrl = (): string => {
    const newUrl = (appConfig.isHttps ? "https://" : "http://") + appConfig.domain + (appConfig.topLevelDomain ? "." + appConfig.topLevelDomain : "")
    return newUrl
}