import { Component } from 'react'
import { Pagination } from 'antd'

import { genresContext } from '../../genresContext/GenresContext'
import MovieServices from '../../../services/MovieServices'
import MovieList from '../../moviesList/MoviesList'
import Spiner from '../../spiner/Spiner'
import ErrorMessage from '../../errorMessage/ErrorMessage'

import './ratedPage.scss'


class RatedPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movieList: [],
            totalResults: null,
            currentPage: null,
            selectedPage: null,
            startPage: 1,
            loading: false,
            error: false
        }
    }

    static contextType = genresContext
    movieServise = new MovieServices()

    componentDidMount() {
        const { startPage } = this.state
       
        this.onListLoading()
        this.onListUpdate(startPage)
    }

    
    componentDidUpdate(prevProps, prevState) {
        const { selectedPage } = this.state

        if (prevState.selectedPage !== selectedPage) {
            this.onListLoading()
            this.onListUpdate(selectedPage)
        }
    }

    onListUpdate = (page) => {
        const { sessionId } = this.props

        this.movieServise.getRatedMoviesList(sessionId, page)
        .then(this.onListLoaded)
        .catch(this.onError)
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

    onPageSelect = (page) => {
        this.setState({
          selectedPage: page,
        })
    }

    render() {
        const { movieList, loading, error, currentPage, totalResults} = this.state
        const { sessionId } = this.props
        const { genres } = this.context

        const spiner = loading ? <Spiner /> : null
        const errorMessage = error ? <ErrorMessage /> : null
        const content = !(loading || error) ? <MovieList movieList={movieList} genres={genres} sessionId={sessionId}/> : null

        return (
            <>
                <div className="rated-page__wrapper">
                    {spiner}
                    {errorMessage}
                    {content}
                </div>
                <div className="search-page__pagination-wrapper">
                <Pagination
                    current={currentPage}
                    total={totalResults}
                    showSizeChanger={false}
                    defaultPageSize={20}
                    hideOnSinglePage
                    onChange={this.onPageSelect}/>
                </div>
            </>
   
        )
    }
}

export default RatedPage
