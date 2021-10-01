import React from "react";
import '../CSS/tarjeta.css';
import '../CSS/boton.css';


class Usuario extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      nombre: this.props.nombre,
      usuario: this.props.usuario,
      correo: this.props.correo,
      mostrarUsuario: false,
      elemento: this.props.usuario,
    };
  }
    
  CambiarElemento = () => {
    this.setState({
      elemento:this.state.mostrarUsuario
        ? this.state.usuario
        : this.state.correo, 
        mostrarUsuario: !this.state.mostrarUsuario
    });
  };

  render(){
    return(
      <div class="card">
        <div class="card-side front">
          <div>{this.state.nombre}</div> 
        </div>
        <div class="card-side back">
          <div>{this.state.elemento}</div>
          <br/>
          <button class="button-swing" onClick={this.CambiarElemento}>
            Mostar {this.state.mostrarUsuario?"Usuario":"Correo"}
          </button>
        </div>
      </div>
    );
  }
}

export default Usuario;