import React, {Component} from "react";
import Formulario from "./Componentes/Formulario";
import Usuario from "./Componentes/Usuario";
import {BrowserRouter, Switch, Route, Link, NavLink} from 'react-router-dom';
import './CSS/menu.css';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      usuarios: [],
    };
  }

  componentDidMount(){
    this.ListarUsuariosJPH();
  }

  ListarUsuariosJPH=()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response)=>response.json())
      .then((usuariosJSON)=>this.setState({usuarios:usuariosJSON}))
      .catch((e)=>alert("Error en la carga  "));
  };

  AgregarUsuario=(nombre, usuario, correo)=>{
    const usuarioNuevo = {
      id: this.state.usuarios.length+1,
      name:nombre,
      username:usuario,
      email:correo,
    };

    this.AgregarUsuarioJPH(usuarioNuevo);
    this.setState({usuarios: [...this.state.usuarios, usuarioNuevo] });

  };

  AgregarUsuarioJPH=(usuarioNuevo)=>{
    const URL = "https://jsonplaceholder.typicode.com/users";
    const HEADER = {
      method:"POST",
      body:JSON.stringify(usuarioNuevo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };
    fetch(URL,HEADER)
      .then((response)=>response.json())
      .then((usuarioJPH)=>console.log(usuarioJPH))
      .catch(e=>alert('Error al insertar el usuario'))
  };

  render(){
    return(
      <BrowserRouter>

    <nav class="menu">
      <NavLink className="enlace" activeClassName="activo" to="/" exact>Inicio</NavLink>
      <NavLink className="enlace" activeClassName="activo" to="/formulario">Formulario</NavLink>
      <NavLink className="enlace" activeClassName="activo" to="/usuarios">Usuario</NavLink>
    </nav>

      <Switch>

      <Route path="/formulario">
        <Formulario FuncionAgregar={this.AgregarUsuario}/>
      </Route>

      <Route path="/usuarios">
        {this.state.usuarios.map((e)=> ( 
          <Usuario 
            id={e.id} 
            key={e.id} 
            nombre={e.name} 
            usuario={e.username} 
            correo={e.email} 
          />
        ))}
      </Route>
      
      <Route path="/" exact>
        <Formulario FuncionAgregar={this.AgregarUsuario}/>

        {this.state.usuarios.map((e)=> ( 
          <Usuario 
            id={e.id} 
            key={e.id} 
            nombre={e.name} 
            usuario={e.username} 
            correo={e.email} 
          />
        ))}

      </Route>

      </Switch>
      </BrowserRouter>
    );
  }

}
