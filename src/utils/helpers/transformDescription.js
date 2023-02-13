const transformDescription = (str) => {
    if (str.length > 200) {
      const endIndex = str.indexOf(' ', [190])

      return str.slice(0, endIndex) + ' ...'
    }
    return str
}

export default transformDescription
