import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas.js'


const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover {
        background-color: #7A7DFE;
        cursor: pointer;
    }
`


const Formulario = ({ setMonedas }) => {

  const [criptos, setCriptos] = useState([])
  const [error, setError] = useState(false)

  const monedas = [
    { id: 'USD', nombre: 'Dolar de Estados Unidos' },
    { id: 'EUR', nombre: 'Euro' },
    { id: 'BRL', nombre: 'Real Brasileño' },
    { id: 'GBP', nombre: 'Libra Esterlina' },
    { id: 'MXN', nombre: 'Peso Mexicano' }
  ]

  const [moneda, SelectMonedas] = useSelectMonedas('Elige tu moneda', monedas)
  // moneda es el 'state' que estoy exportando desde useSelectMoneda, sólo que como aquí es un arreglo, el orden va por índice y se puede cambiar el nombre.

  const [criptomoneda, SelectCriptomoneda] = useSelectMonedas('Elige tu Criptomoneda', criptos)
  // No hay que olvidar que un Destructuring retorna por la posición y no por el nombre, es por eso que
  // Aunque desde useSelectMoneda esté retornando el (state, SelectMoneda), aquí cambio
  // el nomre a [criptomoneda, SelectCriptomoneda].

  useEffect(() => {
    const consultarAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()  // Esta respuesta nos retorna un JSON

      const arrayCriptos = resultado.Data.map(cripto => {
        //.map nos devuelve un array

        const objeto = {    //Creo un nuevo array de Objetos. Vamos colocando en un Objeto esos dos datos obtenidos del API.
          // Cuando es más de una linea de código se utilizan {}, pero si es una ().
          id: cripto.CoinInfo.Name,
          nombre: cripto.CoinInfo.FullName
        }
        return objeto // Con esta linea lo que voy construyendo se va retornando y va llenado con un objeto el arrayCriptos.

      })   // Se crea un array con los datos de la API.

      setCriptos(arrayCriptos)

    }

    consultarAPI();
  }, []);

  const handleSubmit = e => {
    e.preventDefault()

    if ([moneda, criptomoneda].includes('')) {
      setError(true)
      return
    }

    setError(false)
    setMonedas({
      moneda,
      criptomoneda
    })

  }

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form
        onSubmit={handleSubmit}
      >

        <SelectMonedas />
        <SelectCriptomoneda />

        <InputSubmit
          type="submit"
          value='Cotizar'
        />
      </form>
    </>
  )
}

export default Formulario
