export default class TokenService {
    accessToken: string | null = null;
    static make() {
        return new TokenService();
    }

    setAccessToken(token: string) {
        this.accessToken = token;
    }

    getAccessToken() {
        return this.accessToken;
    }

    clearToken() {
        this.accessToken = null;
    }
};
