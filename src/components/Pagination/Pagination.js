import { useContext, useEffect, useState } from 'react'
import Context from '../../Context'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import Pagination from '@mui/material/Pagination'
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#55ACEE',
//       contrastText: '#E1E8ED',
//     },
//     typography: {
//       color: 'red',
//     },
//   },
// })
const BasicPagination = () => {
  const { setPage, page, newPokemonsList, themeColor } = useContext(Context)
  const [additionalPages, setAdditionalPages] = useState(null)
  const handlePagination = (e, value) => setPage(value)

  useEffect(() => {
    if (newPokemonsList) {
      const additionalPages = Math.ceil(newPokemonsList.length / 15)
      setAdditionalPages(additionalPages)
    }
  }, [newPokemonsList])
  return (
    <Pagination
      count={10 + additionalPages}
      onChange={handlePagination}
      size="large"
      page={page}
      color={themeColor}
    ></Pagination>
  )
}

export default BasicPagination
