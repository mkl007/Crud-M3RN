// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';


// import Inicio from './Inicio';

// export function Login() {
//     const [email, setEmail] = useState();
//     const [password, setPassword] = useState();
//     const [messages, setMessages] = useState()
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [userdata, setUserdata] = useState();

//   const navigate = useNavigate();

//     const API = 'http://localhost:5000/api/usuario'
//     // // para mostrar los datos actuales
//     // useEffect(() => {
//     //     axios.get('http://localhost:5000/api/usuario/obtenerUsuarios') 
//     //     .then(res => {
//     //         console.log(res.data)
//     //         setAllUsers()
//     //     }).catch(err => {
//     //       console.log(err)
//     //     })
//     // })

//     // Manejar el submit
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const userToLogin = {
//             email,
//             password
//         }
//         axios.post(`${API}/login`, userToLogin)
//             .then(function (res) {
//                 alert("Logged In...")
//                 console.log(res.data);
//                 setLoggedIn(true)
//             })
//             .catch(function (error) {
//                 console.log("Error bro", error);
//                 setMessages('Email or Password Wrong..')
//             });
//     }

//     useEffect(() => {
//       if(loggedIn) navigate('/Inicio')
//     }, [loggedIn])
    
  
//     return (
//         <div className="row" >
//             <h3 style={{ color: "red" }}>{messages}</h3>
//             <div className="col-md-6">
//                 <form onSubmit={handleSubmit} className="card card-body">
//                     {/* para el emails */}
//                     <div className="form-group">
//                         <input type="email"
//                             onChange={e => setEmail(e.target.value)}
//                             value={email}
//                             className="form-control"
//                             placeholder="Email"
//                             required
//                         />
//                     </div>
//                     <br></br>
//                     {/* para la contrase;a */}
//                     <div className="form-group">
//                         <input type="password"
//                             onChange={e => setPassword(e.target.value)}
//                             value={password}
//                             className="form-control"
//                             placeholder="Password"
//                             required

//                         />
//                     </div>
//                     <br></br>

//                     <button className="btn btn-primary btn-block">
//                         Login
//                     </button>
//                 </form>
//             </div>
//             {/* SHOW THE USERS WE GOT IN THE DB  */}

//         </div >
//     )
// }