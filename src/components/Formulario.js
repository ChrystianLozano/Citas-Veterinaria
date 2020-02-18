import React, {Fragment, useState} from 'react';
import uuid from 'uuid/v4'
import PropTypes from 'prop-types'

const Formulario = ({crearCita}) => {

    //Crear State de Citas
    const [cita, actualizarCita] = useState({
       mascota:'' ,
       propietario: '',
       fecha: '',
       hora: '',
       sintomas: ''
    })

    const [error, actualizarError] = useState(false)


    //funcion que se ejecuta cada que el usuario escrie en un imput
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value,

        })
        actualizarError(false)
    }



    //extraer valores
    const { mascota, propietario, fecha, hora, sintomas} = cita

    //cuanto el usuario le da click en agregar cita jijiji
    const submitCita = e => {
      e.preventDefault();
      
      //validar
      if (
        mascota.trim() === "" ||
        propietario.trim() === "" ||
        fecha.trim() === "" ||
        hora.trim() === "" ||
        sintomas.trim() === ""
      ) {
        actualizarError(true)
        return;
      }


      //asignar id
      cita.id = uuid()

      //crear la cita
      crearCita(cita)

      //reiniciar formulario
      actualizarCita({
        mascota: "",
        propietario: "",
        fecha: "",
        hora: "",
        sintomas: ""
      });

        }



    return (
      <Fragment>
        <h2>Crear Cita</h2>

        { error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

        <form
          onSubmit={submitCita}
        >
          <label>Nombre de Mascota</label>
          <input
            type="text"
            name="mascota"
            className="u-full-width"
            placeholder="Nombre de Mascota"
            onChange={actualizarState}
            value={mascota}
          />

          <label>Nombre del Dueño</label>
          <input
            type="text"
            name="propietario"
            className="u-full-width"
            placeholder="Nombre del Dueño de la Mascota"
            onChange={actualizarState}
            value={propietario}
          />

          <label>Fecha de cita</label>
          <input
            type="date"
            name="fecha"
            className=""
            onChange={actualizarState}
            value={fecha}
          />

          <label>Hora</label>
          <input
            type="time"
            name="hora"
            className=""
            onChange={actualizarState}
            value={hora}
          />

          <label>Sintomas</label>
          <textarea
            className="u-full-width"
            name="sintomas"
            onChange={actualizarState}
            value={sintomas}
          ></textarea>
          <button type="submit" className="u-full-width button-primary">
            Agregar Cita
          </button>
        </form>
      </Fragment>
    );
}

Formulario.propTypes = {
  crearCita: PropTypes.func.isRequired
}
 
export default Formulario;