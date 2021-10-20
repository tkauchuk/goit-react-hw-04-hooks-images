function getNewImages(url) {
    return fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(new Error('Something went wrong. Try later'));
                })
}

export default getNewImages;