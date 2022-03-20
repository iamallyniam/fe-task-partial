export const fetchGenres = () => {
    return fetch('./genres.json').then(resp => resp.json())
};
