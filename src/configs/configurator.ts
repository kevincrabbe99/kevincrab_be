import configBase from './config.json';
import prod_override from './config.prod.json';

export type AppConfig = {
    baseURL: string;
    port: number | null;
    isHttps: boolean;
    domain: string;
    topLevelDomain: string | null;
    fullUrl: string;
    timezone: string;
    nodeEnv?: NodeEnv;
}

export type NodeEnv = 'development' | 'production' | 'test';

const configWithOverrides = (): AppConfig => {

    const config = configBase as AppConfig;

    // get node env
    const nodeEnv = process.env.NODE_ENV;
    config.nodeEnv = nodeEnv;

    // apply production overrides
    if (nodeEnv === 'production') {

        const prodOverrides = prod_override as AppConfig;
        const keys: string[] = Object.keys(prodOverrides);
        
        keys.forEach((key: string) => {
            // @ts-ignore
            if (prodOverrides[key] !== undefined) {
                // @ts-ignore
                config[key] = prodOverrides[key];
            }
        });

    }

    return config;
}

export const appConfig: AppConfig = configWithOverrides();