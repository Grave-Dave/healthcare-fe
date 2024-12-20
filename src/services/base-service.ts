import axiosLib, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import AppConfig from "../config/service-config.ts";
import HeaderService from "./header-service.ts";

interface AxiosConfig extends AxiosRequestConfig {
    __pureUrl?: boolean;
    singleton?: boolean;
}

export default class BaseService {

    static axios: AxiosInstance | null = null;
    static errorService: null | any = null;
    baseEndpointUrl = '';
    headerService = HeaderService.make();

    constructor(endpointBaseUrl = "") {
        this.baseEndpointUrl = endpointBaseUrl;
    }

    get<T = any, R = AxiosResponse<T>>(url: string, config: AxiosConfig = {}) {
        return new Promise<R>((successFn, errorFn) => {
            this.getAxios(config).get<T, R>(url, config).then(successFn).catch(errorFn);
        });
    }

    patch<T = any, R = AxiosResponse<T>>(url: string, patchData: any, config: AxiosConfig = {}) {
        return new Promise<R>((successFn, errorFn) => {
            this.getAxios(config).patch<T, R>(url, patchData, config).then(successFn).catch(errorFn);
        });
    }

    post<T = any, R = AxiosResponse<T>>(url: string, postData = {}, config: AxiosConfig = {}) {
        return new Promise<R>((successFn, errorFn) => {
            this.getAxios(config).post<T, R>(url, postData, config).then(successFn).catch(errorFn);
        });
    }

    delete(url: string, deleteData = {}, config: AxiosConfig = {}) {
        const axiosConfig = {
            ...config,
            data: deleteData
        };

        return new Promise((successFn, errorFn) => {
            this.getAxios(config).delete(url, axiosConfig).then(successFn).catch(errorFn);
        });
    }

    getToken(){
        return localStorage.getItem('access_token')
    }

    getAxios(config: any = {singleton: true}) {
        let axios: AxiosInstance;

        const axiosInstance = axiosLib.create({
            baseURL: AppConfig.getApiBasePath(),
            // @ts-ignore
            onUploadProgress: function (progressEvent) {
            },
            // @ts-ignore
            onDownloadProgress: function (progressEvent) {
            },
        });

        if (config.singleton || config.singleton === undefined) {
            if (BaseService.axios == null) {
                axios = axiosInstance
                BaseService.axios = axios;
            } else {
                axios = BaseService.axios;
            }
        } else {
            axios = axiosInstance
        }

        const token = this.getToken()

        if (axios !== null && token !== null) {
            this.headerService.setAuthorization(token);
            axios.defaults.headers.common['Authorization'] = this.headerService.getAuthorization();
            axios.defaults.headers.common['Track-Id'] = this.headerService.getTrack();
            axios.defaults.headers.common['Context'] = this.headerService.getContext();
            axios.defaults.headers.common['Cache-Control'] = this.headerService.getCacheControl();
        }

        return axios;
    }
}
