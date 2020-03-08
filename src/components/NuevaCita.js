import React, { Component } from "react";
import uuid from "uuid";

const stateInicial = {
  cita: {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  },
  error: false
};

class NuevaCita extends Component {
  state = { ...stateInicial };
  // guardando lo que el usuario escribe en el formulario, en el state
  handdleChange = e => {
    //colocar lo que el usuario escribe en el state

    this.setState({
      cita: {
        ...this.state.cita,
        [e.target.name]: e.target.value
      }
    });
  };

  //enviando el formulario
  handdleSubmit = e => {
    e.preventDefault();
    //extraer los valores del state
    const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

    //validad que todos los campos esten llenos
    if (
      mascota === "" ||
      propietario === "" ||
      fecha === "" ||
      hora === "" ||
      sintomas === ""
    ) {
      this.setState({ error: true });
      return;
    }
    //generar un objeto con los datos del formulario
    const nuevaCita = { ...this.state.cita };
    nuevaCita.id = uuid();

    //Agregar la cita al state de app
    this.props.crearNuevaCita(nuevaCita);

    //asignar el stateInicial al state
    this.setState({ ...stateInicial });
  };

  render() {
    const { error } = this.state;

    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">Llena el Formulario</h2>

          {error ? (
            <div className="alert alert-danger mt-2 mb-5 text-center">
              Todos los Campos son obligatorios
            </div>
          ) : null}

          <form onSubmit={this.handdleSubmit}>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-from-label">
                Nombre Mascota:
              </label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  placeholder="Nombre de la mascota"
                  name="mascota"
                  className="form-control"
                  onChange={this.handdleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-from-label">Dueño:</label>
              <div className="col-sm-8 col-lg-8">
                <input
                  type="text"
                  placeholder="Dueño de la mascota"
                  name="propietario"
                  className="form-control"
                  onChange={this.handdleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-from-label">Fecha:</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  name="fecha"
                  className="form-control"
                  onChange={this.handdleChange}
                  value={this.state.cita.fecha}
                />
              </div>

              <label className="col-sm-4 col-lg-2 col-from-label">Hora:</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  name="hora"
                  className="form-control"
                  onChange={this.handdleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-from-label">
                Síntomas:
              </label>
              <div className="col-sm-8 col-lg-8">
                <textarea
                  type="text"
                  placeholder="Describa los sintomas de la mascota"
                  name="sintomas"
                  className="form-control"
                  onChange={this.handdleChange}
                  value={this.state.cita.sintomas}
                ></textarea>
              </div>
            </div>

            <input
              type="submit"
              className="py-3 mt-2 btn btn-success btn-block"
              value="Agregar cita"
            />
          </form>
          {/* fin del from*/}
        </div>
      </div>
    );
  }
}

export default NuevaCita;
