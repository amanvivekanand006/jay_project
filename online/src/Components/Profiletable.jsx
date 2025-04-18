import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Css/Marks.css"

function ProfileTable() {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = () => {
    axios.get("http://127.0.0.1:8000/api/get_users_profile")
      .then((response) => {
        console.log(response.data)
        setProfiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching profiles:", error);
      });
  };

  const handleUserTypeChange = (profileId, newType) => {
    axios
      .put(`http://127.0.0.1:8000/api/update_user_type/${profileId}/`, {
        user_type: newType,
      })
      .then(() => {
        setProfiles(
          profiles.map((profile) =>
            profile.id === profileId ? { ...profile, user_type: newType } : profile
          )
        );
      })
      .catch((error) => {
        console.error("Error updating user type:", error);
      });
  };

//   const filteredProfiles = profiles.filter(
//     (profile) =>
//       profile.user.full_name.toLowerCase().includes(search.toLowerCase()) ||
//       profile.user_type.toLowerCase().includes(search.toLowerCase())
//   );
  const filteredProfiles = (profiles || []).filter(
    (profile) =>
        profile.user_full_name.toLowerCase().includes(search.toLowerCase()) ||
        profile.user_type.toLowerCase().includes(search.toLowerCase())
  );
  

  return (
    <div className="table-container">
      <header>
        <h1>Profiles</h1>
      </header>

      <div className="search-bar">
      <input 
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>

      <table id="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>User Type</th>
            {/* <th>User ID</th> */}
          </tr>
        </thead>
        <tbody>
          {filteredProfiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.user_full_name}</td>
              <td>
                <select
                  value={profile.user_type}
                  onChange={(e) => handleUserTypeChange(profile.id, e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="tutor">Tutor</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              {/* <td>{profile.user.id}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 
export default ProfileTable;



