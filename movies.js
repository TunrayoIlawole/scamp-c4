const moviesContainer = document.querySelector('.movies-container');
const loaderCon = document.querySelector('.loader');

let requestFile = 'https://api.themoviedb.org/3/movie/popular?api_key=f3f08c027c288ebf1a09b168451ce353&language=en-US&page=1';

const loader = `
<div class = "loader">
    <svg>
        <use href = "img/icons.svg#icon-cw"></use>
    </svg>
</div>
`;

const cutText = (text) => {
    if (text.length > 200) {
        const main = text.slice(0, 200);
        return `${main}...`;
    } else {
        return text;
    }
}


const fetchMovies = async () => {
    loaderCon.insertAdjacentHTML('afterbegin', loader);

    try {
        //fetch the API and store in moviesData(the data here are still strings that look like objects). Await stalls javascript from assigning the response to the variable'moviesData until the fetch is complete and correct
        const moviesData = await fetch(requestFile);

        //pass the moviesData through the json method to turn it into javascript objects
        const data = await moviesData.json();

        const loader = document.querySelector('.loader')

        if (loader) {
            loader.parentElement.removeChild(loader);
        }

        data.results.forEach(movie => {
            let imagePath = "https://image.tmdb.org/t/p/w500/";
            const movieText = cutText(movie.overview);

            const movieCon = `
            <div class = "film">
                <img src = ${imagePath}${movie.poster_path} >
                <div class = "movie-details">
                    <h2>${movie.original_title}</h2>
                    <p>${movieText}</p>
                </div>
            </div>
            `;
            moviesContainer.insertAdjacentHTML('beforeend', movieCon);
        })
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', fetchMovies);
