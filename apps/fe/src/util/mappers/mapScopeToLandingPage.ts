import { FrameStatesEnum } from "../../reducers/frameReducer";
import { ScopesEnum } from "../../reducers/scopeReducer";


// get the the "SET_STATE" reducer payload given the scope
export const mapScopeToLandingPage = (scope: ScopesEnum): FrameStatesEnum => {
    switch (scope) {
        case ScopesEnum.NONE:
            return FrameStatesEnum.SHUTDOWN;
        case ScopesEnum.EMULATOR:
            return FrameStatesEnum.SHUTDOWN;
        case ScopesEnum.PERSONAL_WEBSITE:
            return FrameStatesEnum.DESKTOP;
        case ScopesEnum.PORTFOLIO:
            return FrameStatesEnum.DESKTOP;
        case ScopesEnum.RESUME:
            return FrameStatesEnum.DESKTOP;
        case ScopesEnum.LINKS:
            return FrameStatesEnum.DESKTOP;
        default:
            return FrameStatesEnum.LOGIN;
    }
}