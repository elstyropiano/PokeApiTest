import { S } from './DeleteFromArenaIcon.styled'
import axios from 'axios'
import { useContext } from 'react'
import Context from '../../Context'

const DeleteFromArenaIcon = ({ pokemonData }) => {
  const { arenaMembers, setArenaMembers } = useContext(Context)
  const deleteArenaMember = () =>
    arenaMembers.map(({ name }, index) => {
      if (name === pokemonData.name) {
        const id = arenaMembers[index].id
        ;(async () => {
          try {
            await axios.delete(`http://localhost:3000/arenaMembers/${id}`)
            getArenaMembers()
          } catch (err) {
            console.log(err)
          }
        })()
      }
    })
  const getArenaMembers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/arenaMembers')
      setArenaMembers(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <S.ClearIcon fontSize="large" color="info" onClick={deleteArenaMember} />
  )
}

export default DeleteFromArenaIcon
