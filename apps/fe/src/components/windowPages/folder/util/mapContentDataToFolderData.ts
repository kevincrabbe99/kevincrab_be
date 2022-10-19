import { FileNode } from "../../../../types/FileNode";


import MyComputerJson from "../../../../assets/json/folderFillers/My_Computer.json"
import MyDocumentsJson from "../../../../assets/json/folderFillers/My_Documents.json"
import C_DRIVEJson from "../../../../assets/json/folderFillers/C_DRIVE.json"
import DEF_USERJson from "../../../../assets/json/folderFillers/DEF_USER.json"

export const mapContentDataToFolderData = (contentData: string): FileNode[] => {

    var folderData: FileNode[] = [];

    // map contentData to folder fillers 
    switch(contentData) {
        case "My Computer" :
          folderData = MyComputerJson
          break;
        case "C://":
            folderData = C_DRIVEJson
            break;
        case "C://DEF_USER":
          folderData = DEF_USERJson
          break;
        case "C://My Documents":
          folderData = MyDocumentsJson
          break;
        case "C://My Documents":
          folderData = MyDocumentsJson
          break;
        default:
          folderData = []
      }

    // loop through all files in localhost:3000/
    
    

    return folderData;

}