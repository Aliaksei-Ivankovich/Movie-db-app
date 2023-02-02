import { intlFormat } from 'date-fns';


class MovieServices {
  _apiBase = 'https://api.themoviedb.org/3/';
  _atiKey = 'api_key=dd48bd4b4c107ceaff888556190e9b26';

  getResourse = async (url) => {

    let res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }
    return await res.json()
  }

  getMoviesList = async (query, page) => {
    const movies = await this.getResourse(
      `${this._apiBase}search/movie?${this._atiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    const genresList = await this.getResourse(
      `${this._apiBase}genre/movie/list?${this._atiKey}&language=en-US`
    )
    return {
      currentPage: movies.page,
      totalResults: movies.total_results,
      movieList: movies.results.map(movie => {
                      return {
                        id: movie.id,
                        title: movie.original_title,
                        date: this._transformDate(movie.release_date),
                        genres: this._transformGenres(genresList.genres, movie.genre_ids),
                        description: this._transformDescription(movie.overview),
                        posterImg: this._traformImg(movie.poster_path)
                      }
                    })
    }
  }

  _traformImg = (imgPath) => {
    if (!imgPath) {
      return 'https://critics.io/img/movies/poster-placeholder.png'
    } 
    return `https://image.tmdb.org/t/p/w500${imgPath}`
  }

  _transformGenres = (genresArr, movieArr) => {
    return genresArr.filter(({id}) => movieArr.some(item => item === id))
  }
  
  _transformDate = (date) => {
    if (date === '') {
      return 'Release date not avalible'
    }
    const result = intlFormat(new Date(date), 
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }, 
      {
        locale: 'en-US',
      }
    )
    return result;
  }

  _transformDescription = (str) => {
    if (str.length > 200) {
      const endIndex = str.indexOf(' ', [190])

      return str.slice(0, endIndex) + ' ...'
    }
    return str
  }
}

export default MovieServices
