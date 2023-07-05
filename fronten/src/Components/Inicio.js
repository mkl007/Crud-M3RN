import React, { useState, useEffect } from 'react'
import axios from 'axios';

import Nota from './Nota';

export default function Inicio({ userdata }) {
  // Hooks
  const [loggedIn, setLoggedIn] = useState(true); // establecer en true inicialmente
  const [titulo, setTitilo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [messages, setMessages] = useState();
  const [userNotes, setUserNotes] = useState([]);
  // para mostrar los datos actuales
  useEffect(() => {
    axios.get(`http://localhost:5000/api/usuario/nota/${userdata._id}`)
      // axios.get('http://localhost:5000/api/usuario/nota/649a5da3775edec4bb7bbdd2') 
      .then(res => {
        // console.log(res.data)
        setUserNotes(res.data)

      }).catch(err => {
        console.log(err)
      })

  })

  // Manejo del Submit
  const handleSubmit = () => {

  }

  const Notes_user = userNotes.map(nota => {
    return (
      <Nota nota={nota} />
    )
  })
  return (
    <div className="row" >
      <div >Bienvenida {userdata.nombre}</div>
      <h3 style={{ color: "red" }}>{messages}</h3>
      <div className="col-md-6">
        <form onSubmit={handleSubmit} className="card card-body">
          {/* para el Titulo */}
          <div className="form-group">
            <input type="text"
              onChange={e => setTitilo(e.target.value)}
              value={titulo}
              className="form-control"
              placeholder="Titulo"
              required
            />
            {/* </div> */}

            {/* para la Descripcion */}

            {/* <div className="form-group"> */}
            <label for="descripcion" class="form-label mt-4" />
            <textarea className="form-control"
              id="descripcion"
              rows="3"
              placeholder='Descripcion'
              onChange={e => setDescripcion(e.target.value)}
              value={descripcion}
              required
            />
            {/* </div> */}

            {/* <input type="text"
              onChange={e => setDescripcion(e.target.value)}
              value={descripcion}
              className="form-control"
              placeholder="Descipcion"
              required

            /> */}
          </div>
          <br></br>

          <button className="btn btn-primary btn-block">
            Guardar
          </button>
        </form>
      </div >
      {/* SHOW THE NOTES WE GOT IN DB*/}
      <div className="col-md-6">
      <h2>Notas</h2>
      <p>{Notes_user}</p>

      </div>
    </div >
  )
}
