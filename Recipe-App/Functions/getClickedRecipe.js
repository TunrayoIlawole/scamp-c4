import makeRequest from './api';

function getClickedMovie(keyword) {
    return makeRequest.get('get?', {
        params: {
            rId: keyword
        }
    }).then(response => {
        return response.data;
    })
}

export default getClickedMovie;