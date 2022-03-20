import React from "react";

export const Filter = ({
    filteredMovies, genresDisplayed, setGenresDisplayed,
    genresList, setMinRating, minRating, movieListDisplay,
    genreDefaultDisplay, setShouldReset
    }) => {
    
    /**
     * When the user either presses the submit button or presses enter when focus is within the form
     * the fields that have been updated will be used to filter the movie list. It important for screen reader
     * and keyboard users that submission shouldn't occur on change, other wise the page context can change with
     * each value change.
     * @param {submitEvenvet} evt 
     * @returns boolean
     */
    const submitAction = evt => {
        evt.preventDefault();
        filteredMovies();
        return false;
    };
    const resetAction = evt => {
      evt.preventDefault();
      setMinRating(3);
      setGenresDisplayed(genreDefaultDisplay);
      setShouldReset(true);
    };
    /**
     * Keeps the list of genres the user wants to filter by in sync with the inputs.
     * @param {changeEvent} evt 
     */
    const changeAction = evt => {
      const updateGenresDisplayed = [...genresDisplayed];
      const targetValue = Number(evt.target.value);
      const ind = updateGenresDisplayed.indexOf(targetValue);
      if(ind === -1){
        updateGenresDisplayed.push(targetValue);
      }else{
        updateGenresDisplayed.splice(ind, 1);
      }
      setGenresDisplayed(updateGenresDisplayed);
    };
    /**
     * When the user has submited their choices, the filter view is closed so the updated list can be
     * easily viewed
     */
    const detailsElem = React.useRef();
    React.useEffect(() => {
      detailsElem.current.open = false;
    }, [movieListDisplay]);
    /**
     * The details element allows the filters to be easily hidden when not in use. Form controls
     * are used to list out the genres the user wants to filter by, and adds a range element to the controls
     * so that the minimum rating can be set. Marked up with form controls for a good screen reader, touch,
     * pointer and keyboard experience.
     */
    return (
        <details ref={detailsElem} className="filter">
          <summary className="filterTitle">Filter</summary>
            <form onSubmit={submitAction} onReset={resetAction} className="filterForm">
              <fieldset className="filterFieldSet">
                <legend className="filterLabel">Filter by genre</legend>
                <ul className="filterFormList">
                    {genresList.map((genre, ind) => {
                    return <li key={`${ind}-genre`} className="filterFormListItem">
                        <input
                        className="filterBoxInput"
                        type="checkbox"
                        name="genre"
                        id={`genre-${genre.id}-${ind}`}
                        value={genre.id}
                        onChange={changeAction}
                        checked={genresDisplayed.indexOf(genre.id) > -1 ? true : false} />
                        <label htmlFor={`genre-${genre.id}-${ind}`} className="filterBoxLabel">{genre.name}</label>
                    </li>
                    })}
                </ul>
                </fieldset>
                <div className="filterFieldSet">
                  <label htmlFor="minRating" className="filterLabel">Minimum rating</label>
                  <input className="filterRangeInput" id="minRating" onChange={ (evt) => setMinRating(evt.target.value) }type="range" min="0" max="10" step="0.5" defaultValue={minRating} />
                  <output className="filterRangeOutput" htmlFor="minRating" >{minRating}</output>
                </div>
                <button type="submit" className="filterButton">Update movie list</button>
                <button type="reset" className="filterButton">Reset</button>
            </form>
      </details>
    );
}