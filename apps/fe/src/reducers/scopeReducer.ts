import produce from "immer";
import { cookieManager } from "../util/cookieManager";


const getScopesFromCookie = (): ScopesEnum[] => {
    const cookie = document.cookie;
    const cookieParts = cookie.split(";");
    for (let i = 0; i < cookieParts.length; i++) {
        const cookiePart = cookieParts[i];
        const cookiePartParts = cookiePart.split("=");
        if (cookiePartParts[0].trim() === "SCOPES") {
            return JSON.parse(cookiePartParts[1].trim());
        }
    }
    return [];
}

const setScopesCookie = (scopes: ScopesEnum[]) => {

    // If the scope is set to resume, set scope lock cookie
    if (scopes.length === 1 && scopes[0] === ScopesEnum.RESUME) {
        setScopeLockTo(true);
    }

    cookieManager.setCookie("SCOPES", JSON.stringify(scopes));
}

export const getIsScopeLockedFromCookie = (): boolean => {
    const cookie = document.cookie;
    const cookieParts = cookie.split(";");
    for (let i = 0; i < cookieParts.length; i++) {
        const cookiePart = cookieParts[i];
        const cookiePartParts = cookiePart.split("=");
        if (cookiePartParts[0].trim() === "SCOPE_LOCK") {
            return cookiePartParts[1].trim() === "true";
        }
    }
    return false;
}

const setScopeLockTo = (setTo: boolean) => {
    if (setTo === false) {
        // delete the cookie SCOPE_LOCK
        cookieManager.deleteCookie("SCOPE_LOCK");
    }
    cookieManager.setCookie("SCOPE_LOCK", setTo);
}

export enum ScopesEnum {
    NONE = 'NONE',
    PERSONAL_WEBSITE = 'PERSONAL_WEBSITE',
    PERSONAL_WEBSITE_ADMIN = 'PERSONAL_WEBSITE_ADMIN',
    EMULATOR = 'EMULATOR',
    PORTFOLIO = 'PORTFOLIO',
    RESUME = 'RESUME',
}

export interface ScopeState {
    scopes: ScopesEnum[];
    lastUpdated?: string;
    locked? : boolean;
}

export interface ScopeAction {
    type: string;
    payload?: ScopesEnum | string;
} 

const initialState: ScopeState = {
    scopes: getScopesFromCookie(),
    locked: getIsScopeLockedFromCookie()
}

export const scopeReducer = produce((state: ScopeState = initialState, action: ScopeAction) => {

    switch(action.type) {
        case 'SET_SCOPES':
            console.log("setting scopes", action.payload);
            const newScopes = action.payload  as unknown as ScopesEnum[];

            if (state.locked) {
                console.log("scope locked, not setting scopes");
                return state;
            }

            setScopesCookie(newScopes);
            return {
                ...state,
                scopes: newScopes,
                lastUpdated: new Date().toISOString()
            }
        case 'SET_SCOPE_LOCK':
            setScopeLockTo(action.payload as unknown as boolean);
            return {
                ...state,
                locked: action.payload ? true : undefined,
                lastUpdated: new Date().toISOString()
            }
        default:
            return state;
    }

});