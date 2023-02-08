import  { Component } from 'react';
import { Input, Pagination, Alert } from 'antd';
import { debounce } from 'lodash';

import MovieServices from '../../services/MovieServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spiner from '../spiner/Spiner';
import SkeletonList from '../skeletonList/SkeletonList';

import './movieList.scss';

class MovieList extends Component { 
    state = {
        movieList: [],
        totalResults: null,
        currentPage: null,
        selectedPage: null,
        startPage: 1,
        loading: false,
        error: false,
        inputValue: ''
    }
 
    movieServise = new MovieServices();


    componentDidUpdate(prevProps, prevState) {
        const {inputValue, startPage, selectedPage} = this.state

        if (prevState.selectedPage !== selectedPage) {
            this.onListLoading()
            this.onListUpdateWithDebounce(inputValue, selectedPage)
        }

        if (prevState.inputValue !== inputValue) {
            if (inputValue === '') {
                this.onEmptyInput()
            } else {
                this.onListLoading()
                this.onListUpdateWithDebounce(inputValue, startPage)
            }
        }
    }

    onListUpdateWithDebounce = debounce((term, page) => {
            this.onListUpdate(term, page)
        }, 1000, { leading: false, trailing: true }
    )  
   
    onListUpdate = (term, page) => {
        this.movieServise.getMoviesList(term, page)
        .then(this.onListLoaded)
        .catch(this.onError)
    }

    onListLoaded = (result) => {
        this.setState({
            movieList: result.movieList,
            currentPage: result.currentPage,
            totalResults: result.totalResults,
            loading: false,
            error: false
        })
    }

    onListLoading = () => {
        this.setState({
            error: false,
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onEmptyInput = () => {
        this.setState({
            movieList: [],
            currentPage: null,
            totalResults: null,
        })
    }

    onInputValueChange = (e) => {
        this.setState({
          inputValue: e.target.value,
        })
    }

    onPageSelect = (page) => {
        this.setState({
            selectedPage: page
        })
    }


    render() {
        const {movieList, loading, error, inputValue, totalResults, currentPage} = this.state

        const skeleton = loading || error || inputValue ? null : <SkeletonList count={6}/>
        const spiner = loading ?  <Spiner/> : null
        const errorMessage = error ? <ErrorMessage/> : null
        const content = !(loading || error) && inputValue ? <View movieList={movieList}/> : null

        return (
            <>
                <Input placeholder="Type to search..." 
                        value={inputValue}
                        onChange={this.onInputValueChange}/>
                <div className='movie-list__wrapper'>
                    {skeleton}
                    {spiner}
                    {content}
                    {errorMessage}
                </div>
                <div className='movie-list__pagination-wrapper'>
                    <Pagination current={currentPage}
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

const View = ({movieList}) => {

    if (movieList.length === 0 ) {
        return (
            <Alert type='warning'
                showIcon 
                message='Nothing was found...'
                style={{'width': '100%'}}/>
                
        )
    }

    const renderGenreTitles = (arr) => {
        return arr.map(item => {
            return (
                <li key={item.id} className='movie-list__genre-title'>{item.name}</li>
            )
        })
    }

    const renderListItems = (arr) => {
        return arr.map(item => {
            return (
                <li tabIndex={0} key={item.id} className='movie-list__item'>
                    <img className='movie-list__img' src={item.posterImg} alt={item.title} />
                    <div className='movie-list__content'>
                        <h2 className='movie-list__title'>{item.title}</h2>
                        <div className='movie-list__date'>{item.date}</div>
                        <ul className='movie-list__genres'>{renderGenreTitles(item.genres)}</ul>
                        <p className='movie-list__description'>{item.description}</p>
                    </div>
                </li>
            )
        })
    }

    const items = renderListItems(movieList)
    
    return (
        <ul className='movie-list__grid'>
            {items}
        </ul>
    )
}

export default MovieList;