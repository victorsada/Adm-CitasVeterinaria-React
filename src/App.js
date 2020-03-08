import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from "./components/Header";
import NuevaCita from "./components/NuevaCita";
import ListaCitas from "./components/ListaCitas";

class App extends Component {
  state = {
    citas: []
  };
  //Cuando la aplicacion carga
  componentDidMount() {
    const citasLS = localStorage.getItem("citas");
    if (citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      });
    }
  }

  //cuando eliminamos o agregamos una cita
  componentDidUpdate() {
    localStorage.setItem("citas", JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    //copiar eñ state actual
    const citas = [...this.state.citas, datos];
    //agregar el nuevo state
    this.setState({
      citas: citas //el primer citas es el state, el segundo la variable creada en la linea anterior
    });
  };

  //Eliminar cita del state
  eliminarCita = id => {
    //tomar una copia del state
    const citasActuales = [...this.state.citas];

    //filter para sacar el elemento id del state
    const citas = citasActuales.filter(cita => cita.id !== id);

    //actualizar el state
    this.setState({
      citas //lo mismo que el citas:citas de la funcion crearNuevaCita. se puede hacer de las dos maneras
    });
  };
  render() {
    return (
      <div className="container">
        <Header titulo="Administrador de Veterinaria" />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
