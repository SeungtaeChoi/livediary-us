class Api {
    async get(url) {
        const result = await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'GET',
            }
        );
        return result.json();
    }
    async post(url, body) {
        const result = await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        return result.json();
    }
}
export default Api;