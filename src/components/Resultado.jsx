import styled from "@emotion/styled"

const Contenedor = styled.div `
    color: #FFF;
    font-family: 'Lato', sans-serif;

    display: flex;
    align-items: center;
    gap: 1rem;

`
const Imagen = styled.img `
    display: block;
    width: 120px;

`
const Texto = styled.p `
    font-size: 18px;
    span {
        font-weight: 700;
    }

`
const Precio = styled.p `
    font-size: 22px;
    span {
        font-weight: 700;
    }

`

const Resultado = ({resultado}) => {
    console.log(resultado)    
    
    const {PRICE, HIGHDAY,LOWDAY, HIGHHOUR, LOWHOUR, CHANGEPCT24HOUR, 
          IMAGEURL, LASTUPDATE } = resultado

  return (
    <Contenedor>
      <Imagen 
        src={`https://cryptocompare.com/${IMAGEURL}`} 
        alt="imagen cripto" 
      />  
      <div>
        <Precio>El Precio es de: <span>{PRICE}</span></Precio>
        <Texto>Precio más alto del día: <span>{HIGHDAY}</span></Texto>
        <Texto>Precio más bajo del día: <span>{LOWDAY}</span></Texto>
        <Texto>Precio más alto de la última hora: <span>{HIGHHOUR}</span></Texto>
        <Texto>Precio más bajo de la última hora: <span>{LOWHOUR}</span></Texto>
        <Texto>Variación últimas 24 horas: <span>{CHANGEPCT24HOUR}</span></Texto>
        <Texto>Última actualización: <span>{LASTUPDATE}</span></Texto>
      </div>
    </Contenedor>
  )
}

export default Resultado
