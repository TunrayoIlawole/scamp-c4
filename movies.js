

// data passed through async function always returns a promise
const getMovies = async () => {
    //fetch the API and store in moviesData(the data here are still strings that look like objects). Await stalls javascript from assigning the response to the variable'moviesData until the fetch is complete and correct
    const moviesData = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=f3f08c027c288ebf1a09b168451ce353&language=en-US&page=1');
    
    //pass the moviesData through the json method to turn it into javascript objects
    const jsonData = await moviesData.json();

    jsonData.results.forEach(movieElement => {
        console.log(jsonData.results);
        let images = "https://image.tmdb.org/t/p/w500/";
        const movies = `
        <div class = 'film'>
        <img src = ${images}${movieElement.poster_path} />
        <div class = 'content'>
        <h2>${movieElement.original_title}</h2>
        <p>${movieElement.overview}</p>
        </div>
        </div>
        `;
        document.querySelector('.movies-container').insertAdjacentHTML('beforeend', movies);
    });
};
//call the function 
getMovies()
//then check if jsonData is resolved
.then(jsonData => console.log('resolved:', jsonData))
//or check if there's error on the promise(await)
.catch(err => console.log('rejected:', err));
