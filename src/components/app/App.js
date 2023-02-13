import { Component } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Provider } from '../genresContext/GenresContext'
import { startGuestSession, getGenresList } from '../../services/MovieServices'
import ErrorBoundary from '../errorBoundary/ErrorBoundary'
import Header from '../header/Header'
import { SearchPage, RatedPage } from '../pages'

import './App.scss'

class App extends Component {
  state = {
    sessionId: '',
    genresList: {},
  }

  componentDidMount() {
	this.onStartSession()
	getGenresList()
	.then(this.onGenresListLoaded)
  }

  onStartSession = () => {
    const localSession = localStorage.getItem('gusetSession')

    if (localSession) {
		const gusetSession = JSON.parse(localSession)
		const {sessionId, expiresTime} = gusetSession

		if (new Date(expiresTime) > new Date()) {
			this.setState({ sessionId })
		} else {
			this.getNewSessionID()
		}
    } else {
		this.getNewSessionID()
    }
  }

  getNewSessionID = () => {
	startGuestSession()
	.then(this.onSessionLoaded)
  }

  onSessionLoaded = (gusetSession) => {
    this.setState({ 
		sessionId: gusetSession.sessionId 
	})
    localStorage.setItem('gusetSession', JSON.stringify(gusetSession))
  }

  onGenresListLoaded = (genresList) => {
	this.setState({
      genresList,
    })
  }

  render() {
    const { genresList, sessionId } = this.state

    return (
      <div className="App">
			<Provider value={genresList}>
				<BrowserRouter>
				<Header />
				<ErrorBoundary>
					<Routes>
						<Route path="/" 
							element={<SearchPage sessionId={sessionId}/>} />
						<Route path="/rated" 
							element={<RatedPage sessionId={sessionId}/>} />
					</Routes>
				</ErrorBoundary>
				</BrowserRouter>
			</Provider>
      </div>
    )
  }
}

export default App
