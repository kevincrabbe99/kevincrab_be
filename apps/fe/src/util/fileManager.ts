import { FileNode } from "../types/FileNode";
import filesJson from "../assets/json/files.json"
import { ScopesEnum } from "../reducers/scopeReducer";

export const fileManager = {

    // Returns the file node with the given name
    // Will return null if DNE or user does not have access to it
    getFileNodeFromName: (name: string, scopes: ScopesEnum[]): FileNode | null => {
        var file = null;
        var files: FileNode[] = filesJson;
      
        for (var i = 0; i < files.length; i++) {
          if (files[i].name === name &&
              !files[i].isShortcut) {
            
            // Check if user has access to this file
            fileManager.isNodeScoped(scopes, files[i]);

            return files[i];
          } else {
            file = getFileNodeFromNameInner(name, files[i]);
            if (file) {
              return file;
            }
          }
        }
      
        return file;
    },


    // accepts ScopesEnum[] and fileName then returns true if the file should be visible
    // can be used on its own but is used by fileManager.getFileNodeFromName
    isScoped(scopes: ScopesEnum[], fileName: string): boolean | null {
        const file: FileNode | null = fileManager.getFileNodeFromName(fileName, scopes);
        if (!file) { return null }
        return fileManager.isNodeScoped(scopes, file);
    },
    // Helper for function above
    // Can be used if file node is already known
    isNodeScoped(scopes: ScopesEnum[], file: FileNode): boolean | null {
        
        // console.log("check for scopes", scopes, file.name);
        if (!scopes) { return true }

        // return true if file has no scopes
        if (!file.scopes && !file.excludedScopes) { return true }   

        // check if any scopes are included in file.excludedScopes
        if (file.excludedScopes) {
            for (var i = 0; i < file.excludedScopes.length; i++) {
                if (scopes.includes(file.excludedScopes[i] as ScopesEnum)) {
                    return false;
                }
            }
        }

        // check if a scopes matches
        if (file.scopes) {
            for (var i = 0; i < file.scopes.length; i++) {
                if (scopes.includes(file.scopes[i] as ScopesEnum)) {
                    return true;
                }
            }
        } else {
            // if file has no scopes then it is visible
            return true;
        }

        // default to false
        return false

    }

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