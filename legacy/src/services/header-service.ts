export default class HeaderService {
    headers = {
        Authorization: '',
        Context: {},
    };

    static make() {
        return new HeaderService();
    }

    getContext = () => JSON.stringify(this.headers.Context);
    getAuthorization = () => this.headers.Authorization;

    setAuthorization = (token: string, type = 'Bearer') => {
        this.headers.Authorization = `${type} ${token}`.trim();

        return this;
    }
}
