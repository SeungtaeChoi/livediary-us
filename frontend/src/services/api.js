class Api {
    async get(url) {
        return await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'GET',
            }
        ).then((response) => {
            return response.text()
        }).then(text => {
            return JSON.parse(text);
        });
    }
    async post(url, body) {
        return await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        ).then((response) => {
            return response.text()
        }).then(text => {
            return JSON.parse(text);
        });
    }
}
export default Api;