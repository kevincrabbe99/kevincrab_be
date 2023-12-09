import { createContext } from "react";


export interface LoginState  {
    username: String;
    password: String;
}

export const LoginContext = createContext(null);