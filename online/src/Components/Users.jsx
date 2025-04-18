import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Css/Marks.css'

export default function Users() {
    const [Users,setUsers] = useState([])
    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/get_all_users/")
        .then((response)=>{
            console.log("all users:",response.data)
            setUsers(response.data)
        })
        .catch((error) => {
            console.error("Error fetching users:", error);
        });
    },[])

    return (
<div className="table-container">
      <header>
        <h1>User Details</h1>
      </header>
      <table id="users-table">
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Active</th>

          </tr>
        </thead>
        <tbody>
            {Users.map((user, index)=>(
                    <tr key={user.id}>
                          <td>{user.id }</td>
                          <td>{ user.username }</td>
                          <td>{user.first_name }</td>
                          <td>{user.last_name}</td>
                          <td>{user.email }</td>
                          <td>{user.is_active ? "Yes" : "No"}</td>

                    </tr>
            ))}
        </tbody>
      </table>
</div>
  )
}
