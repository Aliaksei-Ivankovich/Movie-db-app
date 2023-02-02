import { Component } from 'react'

import Header from '../header/Header'
import MovieList from '../movieList/MovieList'

import './App.scss'


class App extends Component {

  render() {
 
    return (
      <div className="App">
        <Header/>
        <MovieList/>
      </div>
    )
}
}

export default App
