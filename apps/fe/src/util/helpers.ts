import { documentWindowConfig } from "../components/windowPages/document/DocumentPage"
import { folderWindowConfig } from "../components/windowPages/folder/FolderPage";
import { browserWindowConfig } from "../components/windowPages/browser/BrowserPage";
import { WindowTypesEnum } from "../reducers/windowReducer";

export const getDefaultJsonFromWindowType = (type: WindowTypesEnum) => {
    switch (type) {
        case WindowTypesEnum.DOCUMENT:
            return documentWindowConfig;
        case WindowTypesEnum.FOLDER:
            return folderWindowConfig;
        case WindowTypesEnum.BROWSER:
            return browserWindowConfig
        default:
            return documentWindowConfig;
    }
}