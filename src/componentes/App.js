import React, {Component} from 'react';
import Header from './Header';
import Formulario from './Formulario';
import Resumen from './Resumen';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';

class App extends Component {

  state = {
    resultado : '',
    datos : {}
  }
 
 cotizarSeguro = (datos) => {
  // eslint-disable-next-line
  const {marca,plan, year} = datos;

//Agregar una base de 2000
let resultado = 2000;

//obtener la diferencia de años
const diferencia = obtenerDiferenciaAnio(year);

//por cada año restar 3% al valor del seguro
resultado -= ((diferencia * 3)* resultado)/100;



//Americano 15%, europeo 30% asiatico 5% de aumento al valor actual
resultado = calcularMarca(marca) * resultado;

//el plan de auto, el basico incrementa el valor 20% y el completo 50%
let incrementoPlan = obtenerPlan(plan);

 //dependiendo del plan incrementar
  resultado = parseFloat(incrementoPlan * resultado).toFixed(2) ;

//crearr objeto para el resumen
const datosAuto = {
  marca : marca,
  plan : plan,
  year : year
}

//ya tenemos el costo
this.setState({
  resultado : resultado,
  datos : datosAuto
})

 }

  render(){
    return (
      <div className="contenedor">
        <Header 
        titulo = 'Cotizador de Seguro de Auto'
        />

        <div className="contenedor-formulario">
          <Formulario
          cotizarSeguro={this.cotizarSeguro}
          />

          <Resumen
          datos = {this.state.datos}
          resultado={this.state.resultado}
          />
        </div>
      </div>

    );
  }
  
}

export default App;
