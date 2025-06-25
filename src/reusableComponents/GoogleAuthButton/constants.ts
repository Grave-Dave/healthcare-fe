import {config} from "../../config/config.ts";

export const GOOGLE_REDIRECT_URL = `${config.apiSchema}://${config.apiHost}${config.apiPath}/auth/google/redirect`;
