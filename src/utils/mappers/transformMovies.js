import transformDate from "./transformDate"
import transformDescription from "../helpers/transformDescription"
import transformImg from "../helpers/transformImg"

const transformMovies = (arr) => {
    return arr.map((movie) => {
      return {
        id: movie.id,
        title: movie.original_title,
        genres: movie.genre_ids,
        averageVote: movie.vote_average,
        rating: movie.rating ? movie.rating : 0,
        date: transformDate(movie.release_date),
        description: transformDescription(movie.overview),
        posterImg: transformImg(movie.poster_path),
      }
    })
}

export default transformMovies