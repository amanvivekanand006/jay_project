import React,{useState,useEffect} from 'react'
import './Css/Marks.css'

export default function Marks() {
    const [search, setSearch] = useState("");
  
    const[Users, setUsers] =useState([])
    const[Marks, setMarks] = useState([])
    useEffect(()=>{
        fetch("http://127.0.0.1:8000/api/get_all_users/")
          .then(respone => respone.json())
          .then((users)=>{
                 console.log("fetched users:", users)
                 setUsers(users)})
          .catch(error => console.error("Error fetching data:", error))

        
        fetch("http://127.0.0.1:8000/get_marks/")
          .then(response=> response.json())
          .then((usersmarks)=>{
            console.log("all marks:", usersmarks)
            setMarks(usersmarks)
          })
          .catch(error => console.error("Error fetching data:", error))

    },[])

    const get_student_name = (student_id)=>{
        const student = Users.find((user)=>user.id===student_id)
        return student ? `${student.first_name} ${student.last_name}` : "Unknown";
    }
    
    const filteredMarks = Marks.filter(
      (mark) =>
        get_student_name(mark.student).toLowerCase().includes(search.toLowerCase()) ||
        mark.subject.toLowerCase().includes(search.toLowerCase()) ||
        (mark.score ? mark.score.toString().toLowerCase().includes(search.toLowerCase()) : false) // ✅ Prevent null error
    );
  
  
        return (
    <div className="table-container">
      <header>
        <h1>Students Marks</h1>
      </header>
      <div className="search-bar">
        <input type="text" id="search-input" placeholder="Search users..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
        {/* <button >Search</button> */}
      </div>
      <table id="users-table">
        <thead>
          <tr>
            <th>Student Id</th>
            <th>Name</th>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
            {filteredMarks.map((user, index)=>(
                    <tr key={user.id}>
                          <td>{user.student }</td>
                          <td>{get_student_name(user.student)}</td>
                          <td>{user.subject }</td>
                          <td>{ user.score }</td>
                    </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
 