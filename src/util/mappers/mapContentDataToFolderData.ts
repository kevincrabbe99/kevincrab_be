import { FileNode } from "../../types/FileNode";
import { fileManager } from "../fileManager";
import { ScopesEnum } from "../../reducers/scopeReducer";


export const mapContentDataToFolderData = (contentData: string, scopes: ScopesEnum[]): FileNode[] => {
    
    const folderData: FileNode | null  = fileManager.getFileNodeFromName(contentData, scopes)
    if (!folderData) { return [] }
    const folderDataChildren = folderData!.children || []

    // remove nodes that are not in the scope
    const filteredFolderDataChildren = folderDataChildren.filter((child) => {
        return fileManager.isNodeScoped(scopes, child)
    })

    return filteredFolderDataChildren;

}

