import React from "react";;

/**
 * Base path for the image
 */
const basePath = "https://image.tmdb.org/t/p/";
/**
 * Array of images widths that are going to be possible. Only one used
 * as was expecting more image sizes but didn't need them in the end
 */
const widths = [
    200
];
/**
 * List of pixel density ratios to support
 */
const dpiList = [
    1, 2, 3
];
/**
 * The image service doesn't support images larger than 600px wide, got 400
 */
const maxWidith = 600;

export const Movie = React.forwardRef((props, ref)  => {
    const { poster_path, original_title, genreTitles,
        vote_average, popularity, overview,
        original_language } = {...props};
    /**
     * A default value for image src
     */
    let imageSrc = "";
    /**
     * Create a list of image sources that the browser can use to determine the
     * best size for the user's device, based on viewport and pixel density
     */
    const imageSrcSet = [...widths.map(width =>  {
        const imageDpi = dpiList.map(dpi => {
            const totalWidth = dpi * width;
            if(totalWidth < maxWidith){
                if(!imageSrc){
                    imageSrc = `${basePath}w${totalWidth}${poster_path}`
                }
                return `${basePath}w${totalWidth}${poster_path} ${totalWidth}w`;
            }
            return "";
        });
        return imageDpi.filter(item => item.length > 0 ? true : false);
    })];
    /**
     * Returns the movie entry. Image optimised for multiple devies, performance and screen readers. The lang
     * attribute on the title is used for when languages besides english are used on the page, important
     * for screen readers
     */
    return (
        <li className="movie" tabIndex="-1" ref={ref}>
            <h3 lang={original_language} className="movieTitle">{original_title}</h3>
            <p className="movieSummary">{overview}</p>
            <img
            className="moviePoster"
            srcSet={imageSrcSet.join(",")}
            src={imageSrc}
            loading="lazy"
            sizes="(min-width: 600px) 200px, calc(100vw - 1.3rem)"
            alt={`Poster for movie ${original_title}`} />
            <figure className="movieGenres">
                <figcaption className="movieGenresTitle metaTitle">Genres</figcaption>
                <ul className="movieGenresList">
                    {genreTitles.map((genre, ind) => {
                        return <li key={`genre-${ind}`} className="movieGenresListItem">{genre}</li>
                    })}
                </ul>
            </figure>
            <dl className="movieMeta">
                <div className="movieMetaLine">
                    <dt className="movieMetaText metaTitle">Rating</dt>
                    <dd className="movieMetaText">{vote_average}/10</dd>
                </div>
                <div className="movieMetaLine">
                    <dt className="movieMetaText metaTitle">Popularity</dt>
                    <dd className="movieMetaText">{popularity}</dd>
                </div>
            </dl>
        </li>
    );
});