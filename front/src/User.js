import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function UserState() {
    
    const [name , setName] = useState('')
    const [nom , setNom] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        // Fetch user profile data from the backend API
        axios.get('http://localhost:8081')
          .then(res => {
            if(res.data.valid){
                 setName(res.data.idcli);
                 setNom(res.data.nom);
                
            } else {
                console.log(res)
                navigate('/login')
            }
          })
          .catch(error => {
            console.error('Error fetching user profile:', error);
            alert("Error fetching user profile");
          });
    }, []);

    return (
        <div className="profile-container">
            <h2>User Profile : {name} </h2>
            <h2>Nom : {nom} </h2>
        
        
        </div>
    );
}

export default UserState;
