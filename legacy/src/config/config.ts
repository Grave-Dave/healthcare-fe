export function getEnvVariable(variableName: string) {
    return import.meta.env[`VITE_${variableName}`];
}
export const config = {
    apiPath: getEnvVariable("APP_API_PATH"),
    apiHost: getEnvVariable("APP_API_HOST"),
    apiSchema: getEnvVariable("APP_API_SCHEMA"),
    apiPort: getEnvVariable("APP_API_PORT"),
}
