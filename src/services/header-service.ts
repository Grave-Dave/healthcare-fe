export default class HeaderService {
    headers = {
        Authorization: '',
        Track: '',
        Context: {},
        'Cache-Control': '',
    };

    static make() {
        return new HeaderService();
    }

    getContext = () => JSON.stringify(this.headers.Context);
    getAuthorization = () => this.headers.Authorization;
    getTrack = () => this.headers.Track;
    getCacheControl = () => this.headers["Cache-Control"];

    setAuthorization = (token: string, type = 'Bearer') => {
        this.headers.Authorization = `${type} ${token}`.trim();

        return this;
    }
}
