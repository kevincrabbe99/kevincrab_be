import configBase from './config.json';

export interface AppConfig {
    timezone: string;
}

export const appConfig: AppConfig = configBase;