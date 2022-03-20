# Movie task

😍 Be sure to write comments, including and any assumptions

🧐 We're most interested to see problem solving and your approach

😇 Keep it simple, keep it DRY, but don't over complicate or over engineer

🤓 We've added some files and styles to give you a head start - but feel free to blaze your own trail if you prefer

😎 **Your time is precious**. You don't need to complete all the steps - rather detail _how_ you would approach those you didn't get to

## Instructions:

1. Break the HTML into multiple components. Don't go too far here - 2 or 3 is fine as there is no reusability requirement. Rather think about how you'd like it broken up if you were reviewing.

2. Retrieve the data from the provided json files (in `./public`). We've added stub api code in `./api`.

3. Order the listed movies by popularity (most popular first - `popularity` property).

4. Show the movie poster image (use the `poster_path` property - eg: `https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg`).

5. List out the genres that are present the movie data set.

6. Using the genre list added above, add a multiple genres filter using checkboxes. The user should have the ability to toggle movies depending on all of its assigned genres. For example if 'Action' and 'Drama' genres are selected, listed movies must have both 'Action' and 'Drama' genres.

7. Implement genres names in movie card (same style as popularity/rating), comma separate and include `and` for last item if 2 or more - eg: `Genres: genreA, genreB and genreC` (an Oxford comma is totally allowed 😁).

8. Add a _minimum_ rating (`vote_average` property) filter with a range between `0` and `10`, increments of `0.5` and an initial value of `3`. This must work with the genre filter.

9. Add a filter reset button.

## Candidate notes

> *Please add details of next steps or any notes for the reviewer here.*
