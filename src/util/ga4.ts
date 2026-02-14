
import { Analytics, logEvent, setUserProperties } from "firebase/analytics"
import { FrameStatesEnum } from "../reducers/frameReducer"


type ScreenDataType = {
    firebase_screen: string,
    firebase_screen_class: string
}

export type EventActionTypes = 
    "ADD_WINDOW" | "SET_STATE" | "SET_SCOPE" |
    "click" | "view" | "submit" | "land" |  "SENT_MESSAGE" | "RAN_REDUX_RUN"

export type ScreenNameTypes =
    "SHUTDOWN" | "LOGIN" | "DESKTOP" | "UNKNOWN"

export const ga4 = {

    log: (analytics: Analytics, action: EventActionTypes, params: any) => {
        logEventWithMetadata(analytics, action, params)
    },

    logWarning: (analytics: Analytics, name: string, data: any) => {
        logEventWithMetadata(analytics, "warning", {
            name: name,
            data: data
        })
    },

    logError: (analytics: Analytics, name: string, data: any) => {
        logEventWithMetadata(analytics, "error", {
            name: name,
            data: data
        })
    },

    logScreenView: (analytics: Analytics, screenName: FrameStatesEnum) => {
        const frameName = FrameStatesEnum[screenName] as string
        logScreenViewWithMetadata(analytics, {
            firebase_screen: frameName,
            firebase_screen_class: screenName.toString()
        });
    },

    setUserProperty: (analytics: Analytics, name: string, value: any) => {
        setUserPropertiesWithMetadata(analytics, {
            [name]: value
        })
    }

}

const logEventWithMetadata = (analytics: Analytics, action: EventActionTypes | "error" | "warning", params: any) => {
    const paramsWithMetadata = {
        ...params,
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        platform: window.navigator.platform,
        screen: window.screen.width + "x" + window.screen.height,
        timestamp: new Date().toISOString()
    }
    if (shouldExportAnalytics()) {
        logEvent(analytics, action, paramsWithMetadata)
    }

    console.log("LOGGING EVENT ("+action+")", paramsWithMetadata)
}

const logScreenViewWithMetadata = (analytics: Analytics, screenData: ScreenDataType) => {
    const screenDataWithMetadata = {
        ...screenData,
       url: window.location.href,
       userAgent: window.navigator.userAgent,
       language: window.navigator.language,
       platform: window.navigator.platform,
       screen: window.screen.width + "x" + window.screen.height,
       timestamp: new Date().toISOString()
    }
    
    if (shouldExportAnalytics()) {
        logEvent(analytics, "screen_view", screenDataWithMetadata)
    }

    console.log("LOGGING SCREEN VIEW", screenDataWithMetadata)
}

const setUserPropertiesWithMetadata = (analytics: Analytics, properties: any) => {
    const userPropertiesWithMetadata = {
        ...properties,
        url: window.location.href,
        userAgent: window.navigator.userAgent,
        language: window.navigator.language,
        platform: window.navigator.platform,
        screen: window.screen.width + "x" + window.screen.height,
        timestamp: new Date().toISOString()
    }

    if (shouldExportAnalytics()) {
    setUserProperties(analytics, userPropertiesWithMetadata)
    }

    console.log("SETTING USER PROPERTY", userPropertiesWithMetadata)
}

const shouldExportAnalytics = () => {
    return process.env.NODE_ENV === "production"
}