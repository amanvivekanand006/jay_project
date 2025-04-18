import React,{useState,useEffect} from 'react'
import photo from './Images/photo.png'
import './Css/Subjects.css'
import { Link } from 'react-router-dom'


export default function Students() {
    const[search,setSearch] = useState("")
    const[Users, setUsers] = useState([])
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/get_all_users/')
        .then(response=>response.json())
        .then((data)=>{
            console.log("fetched users:", data)
            setUsers(data)
        })
        .catch(error=>console.error("Error fetching data:",error))
    },[])

    const filter_users = Users.filter(
      (profile)=>
        profile.username.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div>
    <div className="search-bar" style={{ marginTop: "90px", marginBottom:"0px" }}>
    <input type="text" id="search-input" placeholder="Search users..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
    {/* <button >Search</button> */}
  </div>
 <div className='card-container' style={{ marginTop: "20px"}}>
         {filter_users.map((user, index)=>
         (
          <div className="card" key={user.id}>
              <img src={photo} alt="Photo" className="card-img" />
              <button className="card-btn">
                   <Link to={`/student_sub/${user.id}`}> {user.username}</Link>
              </button>
          </div>
         ))}
    </div> 
    </div>
  )
}
