export default class Movie {
  constructor(data) {
    this.id = data[`id`];
    this.title = data.film_info[`title`];
    this.originalTitle = data.film_info[`alternative_title`];
    this.poster = data.film_info[`poster`];
    this.description = data.film_info[`description`] || ``;
    this.rating = data.film_info[`total_rating`];
    this.releaseDate = new Date(data.film_info.release[`date`]);
    this.duration = data.film_info[`runtime`];
    this.genre = data.film_info[`genre`];
    this.director = data.film_info[`director`];
    this.writers = data.film_info[`writers`];
    this.actors = data.film_info[`actors`];
    this.country = data.film_info.release[`release_country`];
    this.ageRating = data.film_info[`age_rating`];
    this.watchlist = data.user_details[`watchlist`];
    this.alreadyWatched = Boolean(data.user_details[`already_watched`]);
    this.favorite = Boolean(data.user_details[`favorite`]);
    this.comments = data[`comments`];
    this.watchingDate = new Date(data.user_details[`watching_date`]);
  }

  toRAW() {
    return {
      "comments": this.comments,
      "film_info": {
        "actors": this.actors,
        "age_rating": this.ageRating,
        "alternative_title": this.originalTitle,
        "description": this.description,
        "director": this.director,
        "genre": this.genre,
        "poster": this.poster,
        "release": {
          "date": this.releaseDate.toISOString(),
          "release_country": this.country,
        },
        "runtime": this.duration,
        "title": this.title,
        "total_rating": this.rating,
        "writers": this.writers,
      },
      "id": this.id,
      "user_details": {
        "already_watched": this.alreadyWatched,
        "favorite": this.favorite,
        "watching_date": this.watchingDate.toISOString(),
        "watchlist": this.watchlist,
      }
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
