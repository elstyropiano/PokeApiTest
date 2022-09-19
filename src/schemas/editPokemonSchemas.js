import * as Yup from 'yup'

const nameRules = /^[aA-zZ\s]+$/
const validationSchemas = Yup.object().shape({
  name: Yup.string()
    .max(20, 'Imię pokemona może zawierać maksymalnie 20 liter')
    .min(3, 'Imię pokemona musi mieć conajmniej 3 litery')
    .required('Wypełnij pole')
    .matches(nameRules, {
      message: 'Imię może składać się tylko z liter',
    }),

  height: Yup.string()
    .max(2, 'Maxsymalny wzrost Pokemona wynosi 99')
    .required('Wypełnij pole'),
  experience: Yup.string()
    .max(3, 'Maxsymalne doświadczenie Pokemona wynosi 999')
    .required('Wypełnij pole'),
  weight: Yup.string()
    .max(4, 'Maxsymalna waga Pokemona wynosi 9999')
    .required('Wypełnij pole'),
})
export default validationSchemas
