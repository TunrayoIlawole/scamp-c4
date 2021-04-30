const moviesContainer = document.querySelector('.movies-container');
const loaderCon = document.querySelector('.loader');
const movieSearch = document.querySelector('input'); 

let requestFile = 'https://api.themoviedb.org/3/movie/popular?api_key=f3f08c027c288ebf1a09b168451ce353&language=en-US&page=1';

const loader = `
<div class = "loader">
    <svg>
        <use href = "img/icons.svg#icon-cw"></use>
    </svg>
</div>
`;

const cutText = (text, length) => {
    if (text.length > length) {
        const main = text.slice(0, length);
        return `${main}...`;
    } else {
        return text;
    }
}

const displayResult = (data) => {
    data.forEach(movie => {
        let imagePath = "https://image.tmdb.org/t/p/w500/";
        const movieTitle = cutText(movie.original_title, 12);
        const movieText = cutText(movie.overview, 150);

        const movieCon = `
            <div class = "film" id = ${movie.id}>
                <img src = ${imagePath}${movie.poster_path} >
                <div class = "movie-details">
                    <h2>${movieTitle}</h2>
                    <p>${movieText}</p>
                    <a class = "read-more" href = "#">Read more...</a>
                </div>
            </div>
        `;
        moviesContainer.insertAdjacentHTML('beforeend', movieCon);
    })
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

        displayResult(data.results);
    } catch (error) {
        console.log(error);
    }
}

const searchByName = async () => {
    moviesContainer.innerHTML = "";
    let value = movieSearch.value.toLowerCase();

    try {
        const result = await fetch(requestFile);
        const data = await result.json();

        const returnedData = data.results.filter((word) => {
            return word.original_title.toLowerCase().includes(value);
        });
        console.log(returnedData);

        displayResult(returnedData);
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener('load', fetchMovies);
movieSearch.addEventListener('input', searchByName);