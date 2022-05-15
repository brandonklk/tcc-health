import pino from "pino";
import { valueDotEnvIsBoolean } from "../utils/EnvUtils";

export const log = pino({
    enabled: valueDotEnvIsBoolean(process.env.LOG_ENABLE) || true,
    
    name: process.env.NAME_PLATFORM || 'app-doctor',
    level: process.env.LEVEL_DEBUG || 'debug',
    prettyPrint: {
        levelFirst: true,
        translateTime: 'SYS:standard',
        ignore: 'hostname,pid',
        colorize: true,
    }
});