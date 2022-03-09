class Api {
    async run(url, method, body){
        const result = await fetch(
            process.env.REACT_APP_API_URL+url,
            {
                method: method,
                body: JSON.parse(body),
            }
        );
        return result.json();
    } 
}
export default Api;