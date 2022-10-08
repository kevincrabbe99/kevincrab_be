export enum Alignment {
    LEFT = 0,
    RIGHT = 1
}

export enum IconActionIsExternal {
    INTERNAL = 0,
    EXTERNAL = 1
}


export type IconActionType = {
    isExternal: IconActionIsExternal
    destination: string    
}


export type IconGridPosition = {
    alignment: Alignment;
    x: number;
    y: number;
}


export type Icon = {
    name: string;
    icon: string;
    hoverText: string;
    action: IconActionType;
    position: IconGridPosition;
}