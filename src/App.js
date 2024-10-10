import React, { useState } from 'react';
import './Login.css'; 

function Login() {
  
  const [usuario, setUsuario] = useState({
    email: '',
    password: ''
  });
  const [mensaje, setMensaje] = useState('');

  
  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value
    }));
  };


  
  const manejarEnvio = (evento) => {
    evento.preventDefault(); 

    
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        return response.json(); 
      })
      .then((data) => {
        const usuarioEncontrado = data.find((u) => u.email.toLowerCase() === usuario.email.toLowerCase());

        if (usuarioEncontrado) {
          if (usuarioEncontrado.username === usuario.password) {
            setMensaje('Login correcto'); 
          } else {
            setMensaje('Contraseña incorrecta'); 
          }
        } else {
          setMensaje('Email no encontrado'); 
        }
      })
      .catch((error) => {
        console.error('Error al conectar con la API:', error); 
        setMensaje('Error al verificar los datos'); 
      });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarEnvio}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email" 
            value={usuario.email}
            onChange={manejarCambio} 
            required
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password" 
            value={usuario.password}
            onChange={manejarCambio} 
            required
          />
        </div>

        <button type="submit">Iniciar Sesión</button>
      </form>

      {}
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}

export default Login;
