import { documentWindowConfig } from "../components/windowPages/document/DocumentPage"
import { folderWindowConfig } from "../components/windowPages/folder/FolderPage";
import { browserWindowConfig } from "../components/windowPages/browser/BrowserPage";
import { WindowTypesEnum } from "../reducers/windowReducer";
import { fallbackWindowConfig } from "../components/windowPages/fallback/FallbackPage";
import { runWindowConfig } from "../components/windowPages/run/Run";
import { settingsWindowConfig } from "../components/windowPages/settings/SettingsPage";
import { IconActionType } from "../types/Icon";
import { Dispatch } from "redux";
import { DestinationActionTriggers } from "../types/DestinationActionTriggers";
import { windowDispatcher } from "../dispatchers/windowDispatcher";
import { frameDispatcher } from "../dispatchers/frameDispatcher";
import { FileNodeAction } from "../types/FileNode";

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
        case WindowTypesEnum.FALLBACK:
            return fallbackWindowConfig
        default:
            fallbackWindowConfig.title = "Unknown Window Type"
            return fallbackWindowConfig;
    }
}


// Handles FileNodeAction for icons, start menu & folderPage
export const handleIconAction = (action: FileNodeAction, dispatch: Dispatch) => {
    switch(action.destination) {
        case DestinationActionTriggers.SHUTDOWN:
            windowDispatcher.deleteAllWindows(dispatch)
            frameDispatcher.shutdown(dispatch)
            break;
        case DestinationActionTriggers.OPEN_BROWSER:
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.BROWSER ,action.param)
            break;
        case DestinationActionTriggers.OPEN_FOLDER:
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.FOLDER ,action.param)
            break;
        case DestinationActionTriggers.OPEN_DOCUMENT:
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.DOCUMENT ,action.param)
            break;
        case DestinationActionTriggers.OPEN_SETTINGS:
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.SETTINGS, action.param)
            break;
        case DestinationActionTriggers.OPEN_RUN:
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.RUN)
            break;
        default:
            console.log("Unrecognized action: ", action, " \n Using Fallback Window")
            windowDispatcher.openWindow(dispatch, WindowTypesEnum.FALLBACK)
            break;
    }
}