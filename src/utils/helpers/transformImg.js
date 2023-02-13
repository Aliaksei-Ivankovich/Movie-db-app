const transformImg = (imgPath) => {
    if (!imgPath) {
      return 'https://critics.io/img/movies/poster-placeholder.png'
    }
    return `https://image.tmdb.org/t/p/w500${imgPath}`
}

export default transformImg