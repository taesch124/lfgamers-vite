import { ApplicationConfig, ConfigRecord } from '@config/types';
import path from 'path';
import { readFileSync } from 'fs';

class ApplicationConfiguration {
    private config: ApplicationConfig;

    constructor() {
        const configJson = JSON.parse(readFileSync(path.resolve(process.cwd(), 'src/config/env.config.json'), 'utf-8'));
        this.config = configJson;
    
        this.applyEnvironmentConfigs();
    }

    applyEnvironmentConfigs = (): void => {
        ApplicationConfiguration.traverse(this.config,  ApplicationConfiguration.applyEnv) as unknown as ApplicationConfig;
    };

    getConfig = (): ApplicationConfig => this.config;

    private static applyEnv = (
        obj: string,
        ref: ConfigRecord,
        index: string,
    ) => {
        let envVar: string | Array<string> | undefined = process.env[obj.replace('process.env.', '')];
        // eslint-disable-next-line no-console
        console.log(`Applying to config process.env.${obj.replace('process.env.', '')} => ${process.env[obj.replace('process.env.', '')]}`);
        if (envVar?.includes(',')) {
            envVar = envVar.split(',').map((item) => item.trim());
        }
        
        ref[index] =  envVar;
    };

    private static traverse = (
        obj: Record<string, any>,
        func: (
            // eslint-disable-next-line no-unused-vars
            obj: string,
            // eslint-disable-next-line no-unused-vars
            ref: ConfigRecord,
            // eslint-disable-next-line no-unused-vars
            index: string
        ) => void,
        parentKey = '',
    ) => {
        for (const key in obj) {
            if (Object.hasOwn(obj, key)) {
                let fullKey = key;
                if (parentKey) {
                    fullKey = `${parentKey}.${key}`;
                }
                const value = obj[fullKey];
                if (typeof value === 'string' && value.includes('process.env')) {
                    func.apply(this, [value, obj, key]);
                }

                if (obj[key] !== null && typeof obj[key] === 'object') {
                    this.traverse(obj[key], func);
                }
            }
        }
    };
}

export default new ApplicationConfiguration().getConfig();