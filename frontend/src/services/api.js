class Api {
    async get(url) {
        const result = await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'GET',
            }
        );
        console.log(result);
        return result.json();
    }
    // async post(url, body) {
    //     const result = await fetch(
    //         process.env.REACT_APP_API_URL + url,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(body),
    //         }
    //     );
    //     console.log(result);
    //     return result.json();
    // }
    async post(url, body) {
        await fetch(
            process.env.REACT_APP_API_URL + url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        )
        .then ((response) => {
            console.log(response);
            if(response.status !== 200 || response.status !== 201){
                throw new Error('400 or 500 에러 발생');
            }
            return response.json() 
        })
        .then ((result) => { console.log(result) })
        .catch((err) => { console.log(err) });
    }
}
export default Api;