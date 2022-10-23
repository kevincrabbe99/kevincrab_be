import { ScopesEnum } from "../../reducers/scopeReducer"


export const mapSubdomainToScope = (subdomain: string) => {


    switch (subdomain) {
      case 'kevincrab':
        return ScopesEnum.NONE
      case 'emulator':
        return ScopesEnum.EMULATOR
      case 'portfolio':
        return ScopesEnum.PORTFOLIO
    case 'resume':
        return ScopesEnum.RESUME
    case 'me':
        return ScopesEnum.PERSONAL_WEBSITE
      default:
        return ScopesEnum.NONE
    }
  }
  