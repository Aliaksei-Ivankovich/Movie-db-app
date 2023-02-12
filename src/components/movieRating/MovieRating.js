import cl from 'classnames'

import './movieRating.scss'

const MovieRating = ({ averageVote }) => {
  const clazz = cl('movie-raiting', {
    ' movie-raiting__vote-0-3': averageVote < 3,
    ' movie-raiting__vote-3-5': averageVote >= 3 && averageVote < 5,
    ' movie-raiting__vote-5-7': averageVote >= 5 && averageVote < 7,
    ' movie-raiting__vote-7': averageVote >= 7,
  })

  return (
    <div className={clazz}>
      <span className="movie-raiting__text">{averageVote.toFixed(1)}</span>
    </div>
  )
}

export default MovieRating
