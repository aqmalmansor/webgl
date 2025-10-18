import packageJson from "../../../package.json";

export const APP_VERSION = packageJson.version;

export const ENV_STAGE = import.meta.env.MODE;

export const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const BASE_API_URL = import.meta.env.VITE_APP_BASE_API_URL;
