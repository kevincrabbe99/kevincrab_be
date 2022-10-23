import configBase from './config.json';

export interface AppConfig {
    baseURL: string;
    port?: number;
    timezone: string;
}

export const appConfig: AppConfig = configBase;