import { createContext } from 'react'

const genresContext = createContext()
const { Provider, Consumer } = genresContext

export { genresContext, Provider, Consumer }
