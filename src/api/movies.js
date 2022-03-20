export const fetchMovies = () => {
    return fetch('./movies.json').then(resp => resp.json())
};
