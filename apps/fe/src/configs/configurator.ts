import configBase from './config.json';

export interface AppConfig {
    baseURL: string;
    port?: number;
    domain: string;
    timezone: string;
}

export const appConfig: AppConfig = configBase;