// import { Navigate } from "react-router-dom"

export const Landing = () => <h2>Landing Page (Public)!</h2>

export const Home = () => {
   
    return(
        <h2>Home Page (Private)!</h2>
    )
}

export const Dashboard = () => <h2>Dashboard Page (Private)!</h2>

export const Analytics = () => <h2>Analytics Page (Prvate, permission: analice)!</h2>

export const Admin = () => <h2>Admin Page (Prvate, permission: Admin)!</h2>


// console.log(user)
// if(!user){
//     return <Navigate to={'/landing'}/>
// }