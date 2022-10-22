import { IconGridPosition } from "./Icon";

export enum FileNodeType {
    FOLDER = 0,
    INTERNAL = 1,
    EXTERNAL = 2,
}

export interface FileNodeAction {
    isExternal: boolean,
    destination: string,
    param?: string
}

export interface FileNode {
    id?: string;
    name: string;
    icon: string;
    hoverText: string | null;
    type: FileNodeType;
    action?: FileNodeAction;
    children?: FileNode[];
    position?: IconGridPosition;
    isHidden?: boolean | undefined;
    isShortcut?: boolean | undefined;
}