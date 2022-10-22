import { FileNode } from "../types/FileNode";


import MyComputerJson from "../assets/json/folderFillers/My_Computer.json"
import MyDocumentsJson from "../assets/json/folderFillers/My_Documents.json"
import C_DRIVEJson from "../assets/json/folderFillers/C_DRIVE.json"
import DEF_USERJson from "../assets/json/folderFillers/DEF_USER.json"

import filesJson from "../assets/json/files.json" 


export const mapContentDataToFolderData = (contentData: string): FileNode[] => {
    
    const folderData: FileNode | null  = getFileNodeFromName(contentData)
    if (!folderData) { return [] }
    const folderDataChildren = folderData!.children || []
    return folderDataChildren;

}


export const getFileNodeFromName = (name: string): FileNode | null => {
  var file = null;
  var files: FileNode[] = filesJson;

  for (var i = 0; i < files.length; i++) {
    if (files[i].name === name &&
        !files[i].isShortcut) {
      return files[i];
    } else {
      file = getFileNodeFromNameInner(name, files[i]);
      if (file) {
        return file;
      }
    }
  }

  return file;
} 

const getFileNodeFromNameInner = (name: string, file: FileNode): FileNode | null => {
      
    if (file.name === name &&
        !file.isShortcut) {
      return file;
    }
  
    if (file.children) {
      for (var i = 0; i < file.children.length; i++) {
        var child = getFileNodeFromNameInner(name, file.children[i]);
        if (child) {
          return child;
        }
      }
    }
  
    return null;
}