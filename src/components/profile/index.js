import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Profile = () => {

    const {user:currentuser}=useSelector((state)=>state.auth)
    if(!currentuser){
        return <Navigate to="/login" />
    }
  return (
    <div className='container'>
        <header className='jumbtron'>
            <h3>
                <strong>{currentuser.username}</strong>Profile
            </h3>
        </header>
        <p>
            <strong>Token:</strong>{currentuser.accessToken.substring(0, 20)}...{" "}
            {currentuser.accessToken.substr(currentuser.accessToken.length-20)}
        </p>
        <p>
            <strong>ID:</strong>{currentuser.id}
        </p>
        <p>
            <strong>Email:</strong>{currentuser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
            {currentuser.roles.map((role,index)=><li key={index}>{role}</li>)}
        </ul>
    </div>
  )
}

export default Profile;