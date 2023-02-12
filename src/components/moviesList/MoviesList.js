import { Alert, Rate  } from 'antd';
import { Component } from 'react';

import MovieServices from '../../services/MovieServices'
import MovieRating from '../movieRating/MovieRating';

import './movieList.scss';


class MovieList extends Component {
  
    movieServise = new MovieServices()

    onMovieRate = (vote, movieId) => {
        const { sessionId } = this.props

        this.movieServise.setMovieRaiting(vote, movieId, sessionId)
    }

    render() {
        const {movieList, genres} = this.props

        const content = movieList && movieList.length !== 0 ? <View movieList={movieList} 
                                                                    genres={genres} 
                                                                    onMovieRate={this.onMovieRate}/> : null
        const noSearchRes = movieList.length === 0 ? <Alert type='info'
                                                            showIcon 
                                                            message='Nothing was found...'
                                                            style={{'width': '100%'}}/> : null
                                                        
        return (
            <>
                {content}
                {noSearchRes}
            </> 
        )
    }
}

const View = ({movieList, genres, onMovieRate}) => {

    const renderGenreTitles = (genresIDs, genresList) => {
        const arr = genresList.filter(({id}) => genresIDs.some(item => item === id))

        return arr.map(item => {
            return (
                <li key={item.id} className='movie-list__genre-title'>{item.name}</li>
            )
        })
    }

    const renderListItems = (movieList, genresList, onMovieRate) => {
        return movieList.map(item => {
            return (
                <li key={item.id} className='movie-list__item'>
                    <img className='movie-list__img' src={item.posterImg} alt={item.title} />
                    <div className='movie-list__content'>
                        <div className="movie-list__title-wrapper">
                            <h2 className='movie-list__title'>{item.title}</h2>
                            <MovieRating averageVote={item.averageVote}/>
                        </div>
                        <div className='movie-list__date'>{item.date}</div>
                        <ul className='movie-list__genres'>{renderGenreTitles(item.genres, genresList)}</ul>
                        <p className='movie-list__description'>{item.description}</p>
                        <div className='movie-list__rate-wrapper'>
                            <Rate count={10}
                                style={{fontSize: 18}}
                                defaultValue={item.rating}
                                allowHalf={true}
                                onChange={(vote) => onMovieRate(vote, item.id)}/>
                        </div>
                    </div>
                </li>
            )
        })
    }

    const items = renderListItems(movieList, genres, onMovieRate)
    
    return (
        <ul className='movie-list__grid'>
            {items}
        </ul>
    )
}

export default MovieList;