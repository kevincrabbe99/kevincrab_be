export interface StartMenuItem {
    name: string;
    icon: string;
    submenu?: StartMenuItem[];
    action: StartMenuActionType;
}

export enum StartMenuActionIsExternal {
    INTERNAL = 0,
    EXTERNAL = 1
}

export type StartMenuActionType = {
    isExternal: StartMenuActionIsExternal
    destination: string | null
    param?: string | null
}