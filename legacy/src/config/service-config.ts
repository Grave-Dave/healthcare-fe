import {config} from "./config.ts";


export default {
    getApiBasePath() {
        return `${config.apiSchema}://${config.apiHost}${config.apiPath}${config.apiPort ? ":" + config.apiPort : ""}`;
    },
}
