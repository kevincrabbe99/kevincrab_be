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
    cookieManager.setCookie("SCOPES", JSON.stringify(scopes));
}

// export const getIsScopeLockedFromCookie = (): boolean => {
//     const cookie = document.cookie;
//     const cookieParts = cookie.split(";");
//     for (let i = 0; i < cookieParts.length; i++) {
//         const cookiePart = cookieParts[i];
//         const cookiePartParts = cookiePart.split("=");
//         if (cookiePartParts[0].trim() === "SCOPE_LOCK") {
//             return cookiePartParts[1].trim() === "true";
//         }
//     }
//     return false;
// }

// const setScopeLockTo = (setTo: boolean) => {
//     if (setTo === false) {
//         // delete the cookie SCOPE_LOCK
//         cookieManager.deleteCookie("SCOPE_LOCK");
//     }
//     cookieManager.setCookie("SCOPE_LOCK", setTo);
// }

export enum ScopesEnum {
    NONE = 'NONE',
    PERSONAL_WEBSITE = 'PERSONAL_WEBSITE',
    PERSONAL_WEBSITE_ADMIN = 'PERSONAL_WEBSITE_ADMIN',
    EMULATOR = 'EMULATOR',
    PORTFOLIO = 'PORTFOLIO',
    RESUME = 'RESUME',
    LINKS = 'LINKS',
}

export interface ScopeState {
    scopes: ScopesEnum[];
    lastUpdated?: string;
}

export interface ScopeAction {
    type: string;
    payload?: ScopesEnum | string;
} 

const initialState: ScopeState = {
    scopes: getScopesFromCookie()
}

export const scopeReducer = produce((state: ScopeState = initialState, action: ScopeAction) => {

    switch(action.type) {
        case 'SET_SCOPES':
            console.log("setting scopes", action.payload);
            const newScopes = action.payload  as unknown as ScopesEnum[];

            setScopesCookie(newScopes);
            return {
                ...state,
                scopes: newScopes,
                lastUpdated: new Date().toISOString()
            }
        default:
            return state;
    }

});