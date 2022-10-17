
export interface FileNodeAction {
    isExternal: boolean,
    destination: string,
    param: string
}

export interface FileNode {
    id?: string;
    name: string;
    icon: string;
    hoverText: string | null;
    action: FileNodeAction;
}