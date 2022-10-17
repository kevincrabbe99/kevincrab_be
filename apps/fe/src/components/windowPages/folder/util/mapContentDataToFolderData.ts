import { FileNode } from "../../../../types/FileNode";


import MyComputerJson from "../../../../assets/json/folderFillers/My_Computer.json"
import MyDocumentsJson from "../../../../assets/json/folderFillers/My_Documents.json"
import C_DRIVEJson from "../../../../assets/json/folderFillers/C_DRIVE.json"


export const mapContentDataToFolderData = (contentData: string): FileNode[] => {

    var folderData: FileNode[] = [];

    // map contentData to folder fillers 
    switch(contentData) {
        case "MY_COMPUTER" :
          folderData = MyComputerJson
          break;
        case "C://":
          folderData = C_DRIVEJson
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