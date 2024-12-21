import axiosLib, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import AppConfig from "../config/service-config.ts";
import HeaderService from "./header-service.ts";
import authActions from '../auth/actions.tsx';
import authSelectors from '../auth/selectors.ts';
import store from "../store/store.ts";

interface AxiosConfig extends AxiosRequestConfig {
    __pureUrl?: boolean;
    singleton?: boolean;
}

export default class ApiService {

    static axios: AxiosInstance | null = null
    static errorService: null | any = null
    headerService = HeaderService.make()
    baseEndpointUrl = ''

    constructor(endpointBaseUrl = "") {
        this.baseEndpointUrl = endpointBaseUrl
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

    getAxios(config: any = {singleton: true}) {
        let axios: AxiosInstance;

        const axiosInstance = axiosLib.create({
            baseURL: AppConfig.getApiBasePath(),
            withCredentials: true,
            // @ts-ignore
            onUploadProgress: function (progressEvent) {
            },
            // @ts-ignore
            onDownloadProgress: function (progressEvent) {
            },
        });

        if (config.singleton || config.singleton === undefined) {
            if (ApiService.axios == null) {
                axios = axiosInstance
                ApiService.axios = axios;
            } else {
                axios = ApiService.axios;
            }
        } else {
            axios = axiosInstance
        }

        if (axios !== null) {
            const state = store.getState();
            const token = authSelectors.getAccessToken(state)

            axios.interceptors.request.use((config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }

                return config;
            }, (error) => Promise.reject(error))

            let isRefreshing = false;
            let failedQueue: any[] = [];

            const processQueue = (error: any, token = null) => {
                failedQueue.forEach((prom) => {
                    if (token) {
                        prom.resolve(token);
                    } else {
                        prom.reject(error);
                    }
                });

                failedQueue = [];
            };

            axios.interceptors.response.use(
                (response) => response,
                async (error) => {
                    const originalRequest = error.config;

                    if (error.response?.status === 401 && !originalRequest._retry) {
                        if (isRefreshing) {
                            return new Promise((resolve, reject) => {
                                failedQueue.push({resolve, reject});
                            })
                                .then((token) => {
                                    originalRequest.headers.Authorization = `Bearer ${token}`;
                                    return axios(originalRequest);
                                })
                                .catch((err) => Promise.reject(err));
                        }

                        originalRequest._retry = true;
                        isRefreshing = true;

                        try {
                            const response = await axios.post(
                                '/auth/refresh',
                                {},
                                {withCredentials: true}
                            );

                            const newAccessToken = response.data.access_token;

                            authActions.setAccessToken(newAccessToken);

                            processQueue(null, newAccessToken);

                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                            return axios(originalRequest);
                        } catch (err) {
                            processQueue(err, null);
                            authActions.clearAccessToken();
                            return Promise.reject(err);
                        } finally {
                            isRefreshing = false;
                        }
                    }
                    return Promise.reject(error);
                }
            )

            if (token) {
                this.headerService.setAuthorization(token);
            }

            axios.defaults.headers.common['Authorization'] = this.headerService.getAuthorization();
            axios.defaults.headers.common['Context'] = this.headerService.getContext();
        }

        return axios;
    }
}
