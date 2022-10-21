import { FileNode } from "../../../../types/FileNode";


import MyComputerJson from "../../../../assets/json/folderFillers/My_Computer.json"
import MyDocumentsJson from "../../../../assets/json/folderFillers/My_Documents.json"
import C_DRIVEJson from "../../../../assets/json/folderFillers/C_DRIVE.json"
import DEF_USERJson from "../../../../assets/json/folderFillers/DEF_USER.json"

import files from "../../../../assets/json/files.json"


export const mapContentDataToFolderData = (contentData: string): FileNode[] => {

    var folderData: FileNode[] = [];

    
    // map contentData to folder fillers 
    // switch(contentData) {
    //     case "My Computer" :
    //       // folderData = MyComputerJson

    //       break;
    //     case "C://":
    //         // folderData = C_DRIVEJson
    //         break;
    //     case "C://kcrabbe":
    //       // folderData = DEF_USERJson
    //       break;
    //     case "C://My Documents":
    //       // folderData = MyDocumentsJson
    //       break;
    //     case "C://My Documents":
    //       // folderData = MyDocumentsJson
    //       break;
    //     default:
    //       folderData = []
    //   }

    // loop through all files in localhost:3000/
    
    folderData = getFileNodeFromName(contentData)!.children || [];
      
    return folderData;

}


export const getFileNodeFromName = (name: string): FileNode | null => {
  var file = null;

  for (var i = 0; i < files.length; i++) {
    if (files[i].name === name) {
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
      
    if (file.name === name) {
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