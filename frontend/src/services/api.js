class Api {
    constructor(API_URL) {
        this.API_URL = API_URL;
    }
    async get(url) {
        return await fetch(
            this.API_URL + url,
            {
                method: 'GET',
            })
            .then((response) => { return response.text() })
            .then(text => { return JSON.parse(text); });
    }
    async post(url, body) {
        return await fetch(
            this.API_URL + url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })
            .then((response) => { return response.text() })
            .then(text => { return JSON.parse(text); });
    }
}
export default Api;