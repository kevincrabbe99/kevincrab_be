import { documentWindowConfig } from "../components/windowPages/document/DocumentPage"
import { folderWindowConfig } from "../components/windowPages/folder/FolderPage";
import { browserWindowConfig } from "../components/windowPages/browser/BrowserPage";
import { WindowTypesEnum } from "../reducers/windowReducer";
import { fallbackWindowConfig } from "../components/windowPages/fallback/FallbackPage";
import { runWindowConfig } from "../components/windowPages/run/Run";


export const getDefaultJsonFromWindowType = (type: WindowTypesEnum) => {
    switch (type) {
        case WindowTypesEnum.DOCUMENT:
            return documentWindowConfig;
        case WindowTypesEnum.FOLDER:
            return folderWindowConfig;
        case WindowTypesEnum.BROWSER:
            return browserWindowConfig
        case WindowTypesEnum.RUN:
            return runWindowConfig
        case WindowTypesEnum.FALLBACK:
            return fallbackWindowConfig
        default:
            fallbackWindowConfig.title = "Unknown Window Type"
            return fallbackWindowConfig;
    }
}