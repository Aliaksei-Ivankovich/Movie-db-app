import { intlFormat } from 'date-fns'

class MovieServices {
  _apiBase = 'https://api.themoviedb.org/3/'
  _atiKey = 'dd48bd4b4c107ceaff888556190e9b26'

	getResourse = async (url) => {
		let res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}
		return await res.json()
	} 

	postData = async ( url, method, data = {} ) => {
		let res = await fetch(url, {
			method: method,
			headers: {
			  'Content-Type': 'application/json'
			},
			body:  JSON.stringify(data)
		})
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}
		return await res.json()
	}


  startGuestSession = async () => {
    const res = await this.getResourse(
    	`${this._apiBase}authentication/guest_session/new?api_key=${this._atiKey}`
    )
    return {
		sessionId: res.guest_session_id,
		expiresTime: res.expires_at
	}
  }

  setMovieRaiting = async (vote, movieId, sessionId) => {
	const res = await this.postData(
		`${this._apiBase}movie/${movieId}/rating?api_key=${this._atiKey}&guest_session_id=${sessionId}`,
		'POST', { 'value': vote }
	)
	return res
  }

  getMoviesList = async (query, page) => {
    const res = await this.getResourse(
      `${this._apiBase}search/movie?api_key=${this._atiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    return {
      currentPage: res.page,
      totalResults: res.total_results,
      movieList: this._transformMovies(res.results),
    }
  }

  getGenresList = async () => {
	const res = await this.getResourse(
      `${this._apiBase}genre/movie/list?api_key=${this._atiKey}&language=en-US`
    )
    return res 
  }

  getRatedMoviesList = async (sessionID, page) => {
	const res = await this.getResourse (
		`${this._apiBase}guest_session/${sessionID}/rated/movies?api_key=${this._atiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
	)
	return {
		currentPage: res.page,
		totalResults: res.total_results,
		movieList: this._transformMovies(res.results),
	  }
  }

  _transformMovies = (arr) => {
    return arr.map((movie) => {
      return {
        id: movie.id,
        title: movie.original_title,
        genres: movie.genre_ids,
        averageVote: movie.vote_average,
		rating: movie.rating ? movie.rating : 0,
        date: this._transformDate(movie.release_date),
        description: this._transformDescription(movie.overview),
        posterImg: this._traformImg(movie.poster_path),
      }
    })
  }

  _traformImg = (imgPath) => {
    if (!imgPath) {
      return 'https://critics.io/img/movies/poster-placeholder.png'
    }
    return `https://image.tmdb.org/t/p/w500${imgPath}`
  }

  _transformDate = (date) => {
    if (date === '') {
      return 'Release date not avalible'
    }
    const result = intlFormat(
      new Date(date),
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      {
        locale: 'en-US',
      }
    )
    return result
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
