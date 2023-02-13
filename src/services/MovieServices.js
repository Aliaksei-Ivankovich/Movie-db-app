import { transformMovies } from "../utils"

class MovieServices {
  _apiBase = 'https://api.themoviedb.org/3/'
  _apiKey = process.env.REACT_APP_API_KEY

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
    	`${this._apiBase}authentication/guest_session/new?api_key=${this._apiKey}`
    )
    return {
		sessionId: res.guest_session_id,
		expiresTime: res.expires_at
	}
  }

  setMovieRaiting = async (vote, movieId, sessionId) => {
	const res = await this.postData(
		`${this._apiBase}movie/${movieId}/rating?api_key=${this._apiKey}&guest_session_id=${sessionId}`,
		'POST', { 'value': vote }
	)
	return res
  }

  getMoviesList = async (query, page) => {
    const res = await this.getResourse(
      `${this._apiBase}search/movie?api_key=${this._apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    )
    return {
      currentPage: res.page,
      totalResults: res.total_results,
      movieList: transformMovies(res.results),
    }
  }

  getGenresList = async () => {
	const res = await this.getResourse(
      `${this._apiBase}genre/movie/list?api_key=${this._apiKey}&language=en-US`
    )
    return res 
  }

  getRatedMoviesList = async (sessionID, page) => {
	const res = await this.getResourse (
		`${this._apiBase}guest_session/${sessionID}/rated/movies?api_key=${this._apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
	)
	return {
		currentPage: res.page,
		totalResults: res.total_results,
		movieList: transformMovies(res.results),
	  }
  }
}

const movieServices = new MovieServices
const { startGuestSession, setMovieRaiting, getMoviesList, getGenresList, getRatedMoviesList } = movieServices

export { startGuestSession, setMovieRaiting, getMoviesList, getGenresList, getRatedMoviesList }
