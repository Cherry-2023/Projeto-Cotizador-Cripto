import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Formulario from './components/Formulario'
import Resultado from './components/Resultado'
import Spinner from './components/Spinner'
import ImagenCripto from './img/imagen-criptos.png'

const Contenedor = styled.div `
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }

`
const Imagen = styled.img `
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;

`

const Heading = styled.h1 `
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`


function App() {

  const [monedas, setMonedas] = useState({})
  const [resultado, setResultado] = useState({})
  const [cargando, setCargando] = useState(false)

  useEffect(() => {
    if(Object.keys(monedas).length > 0) {  //En caso que haya algo en 'monedas', se ejecuta.
   
      const cotizarCripto = async () => {
        setCargando(true)
        setResultado({})

        const {moneda, criptomoneda} = monedas
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()

        // console.log(resultado)

        setResultado(resultado.DISPLAY[criptomoneda][moneda]) //De esta manera ingresa a sus diferentes propiedades de la URL.
        // Como es mucha información creamos State nuevo y lo almacenamos en setResultado.

        setCargando(false)
      }

      cotizarCripto()
    }

  }, [monedas]);

  return (
    <Contenedor>
      <Imagen
        src={ImagenCripto}
        alt='imagenes criptomonedas'
      />

      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setMonedas={setMonedas}
        />

        {cargando && <Spinner />}
        {resultado.PRICE && <Resultado resultado={resultado}/>} 
        {/*Este componente se va a ejecutar sólamente cuando se cumpla la condición de que haya una cotización, pues revisa una propiedad del objeto obtenido de la URL*/}
      </div>

    </Contenedor>
  )
}

export default App
