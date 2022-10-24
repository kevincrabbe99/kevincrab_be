import { appConfig } from "../configs/configurator";


export const cookieManager = {
    getCookieFromKey: (key: string): string | null => {
        // get json cookie from key as string
        const cookie = document.cookie;
        const cookieParts = cookie.split(";");
        for (let i = 0; i < cookieParts.length; i++) {
            const cookiePart = cookieParts[i];
            const cookiePartParts = cookiePart.split("=");
            if (cookiePartParts[0].trim() === key) {
                return cookiePartParts[1].trim();
            }
        }
        return null;
    },
    setCookie: (key: string, value: any) => {
        document.cookie = `${key}=${value};path=/;`;
    },

    // delete a single cookie by key
    deleteCookie: (key: string) => {
        document.cookie = `SCOPE_LOCK=;domain=${appConfig.baseURL};path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;`;    

    },
    // delete all cookies
    deleteAllCookies: () => {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

}