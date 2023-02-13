import { intlFormat } from 'date-fns'

const transformDate = (date) => {
    if (date === '') {
      return 'Release date not avalible'
    }
    const result = intlFormat(
      new Date(date),
      {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      },
      {
        locale: 'en-US',
      }
    )
    return result
}

export default transformDate