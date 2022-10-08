export enum Alignment {
    LEFT = 0,
    RIGHT = 1
}

export type Icon = {
    name: String;
    icon: String;
    hoverText: String;
    position: IconGridPosition;
}

export type IconGridPosition = {
    alignment: Alignment;
    x: number;
    y: number;
}