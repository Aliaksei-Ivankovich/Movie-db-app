import { Component } from 'react'
import { Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import { genresContext } from '../../genresContext/GenresContext'
import MovieServices from '../../../services/MovieServices'
import MovieList from '../../moviesList/MoviesList'
import ErrorMessage from '../../errorMessage/ErrorMessage'
import Spiner from '../../spiner/Spiner'
import SkeletonList from '../../skeletonList/SkeletonList'

import './searchPage.scss'

class SearchPage extends Component {
  state = {
    movieList: [],
    totalResults: null,
    currentPage: null,
    selectedPage: null,
    startPage: 1,
    loading: false,
    error: false,
    inputValue: '',
  }

  static contextType = genresContext
  movieServise = new MovieServices()

  componentDidUpdate(prevProps, prevState) {
    const { inputValue, startPage, selectedPage } = this.state

    if (prevState.selectedPage !== selectedPage) {
      this.onListLoading()
      this.onListUpdateWithDebounce(inputValue, selectedPage)
    }

    if (prevState.inputValue !== inputValue) {
      this.onListLoading()
      this.onListUpdateWithDebounce(inputValue, startPage)
    }
  }

  onListUpdateWithDebounce = debounce(
    (term, page) => {
      this.onListUpdate(term, page)
    },
    1000,
    { leading: false, trailing: true }
  )

  onListUpdate = (term, page) => {
    if (!term) {
      this.onEmptyInput()
    } else {
      this.movieServise
        .getMoviesList(term, page)
        .then(this.onListLoaded)
        .catch(this.onError)
    }
  }

  onListLoaded = ({ movieList, currentPage, totalResults }) => {
    this.setState({
      movieList,
      currentPage,
      totalResults,
      loading: false,
      error: false,
    })
  }

  onListLoading = () => {
    this.setState({
      error: false,
      loading: true,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  onEmptyInput = () => {
    this.setState({
      movieList: [],
      currentPage: null,
      totalResults: null,
      loading: false,
      error: false,
    })
  }

  onInputValueChange = (e) => {
    this.setState({
      inputValue: e.target.value,
    })
  }

  onPageSelect = (page) => {
    this.setState({
      selectedPage: page,
    })
  }

  render() {
    const { movieList, loading, error, inputValue, totalResults, currentPage } =
      this.state
    const { sessionId } = this.props
    const { genres } = this.context

    const skeleton = loading || error || inputValue ? null : <SkeletonList count={6} />
    const spiner = loading ? <Spiner /> : null
    const errorMessage = error ? <ErrorMessage /> : null
    const content =
      !(loading || error) && inputValue ? (
        <MovieList movieList={movieList} genres={genres} sessionId={sessionId}/>
      ) : null

    return (
      <>
        <Input
          placeholder="Type to search..."
          value={inputValue}
          onChange={this.onInputValueChange}
        />
        <div className="search-page__wrapper">
          {skeleton}
          {spiner}
          {content}
          {errorMessage}
        </div>
        <div className="search-page__pagination-wrapper">
          <Pagination
            current={currentPage}
            total={totalResults}
            showSizeChanger={false}
            defaultPageSize={20}
            hideOnSinglePage
            onChange={this.onPageSelect}
          />
        </div>
      </>
    )
  }
}

export default SearchPage
