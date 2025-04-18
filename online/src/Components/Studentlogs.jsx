import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Css/monitoring.css'

function MonitoringDetails() {
  const { studentId } = useParams();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/get_student_logs/${studentId}/`)
      .then(response => {
        console.log(studentId)
        console.log(response)
        setLogs(response.data);
      })
      .catch(error => {
        console.error("Error fetching logs:", error);
      });
  }, [studentId]);

  return (
    <div className='logs-container'>
      <h2>Monitoring Logs for Student ID: {studentId}</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Event</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.event}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MonitoringDetails;
