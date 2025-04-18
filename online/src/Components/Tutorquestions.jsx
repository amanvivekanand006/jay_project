import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Css/Studentans.css";
import { toast,ToastContainer } from 'react-toastify';

export default function Tutorquestions() {
  const { id } = useParams();
  const [questions, setQuestions] = useState({
    question1: "",
    question2: "",
    question3: "",
    question4: "",
    question5: "",
  });

  const [editMode, setEditMode] = useState({
    question1: false,
    question2: false,
    question3: false,
    question4: false,
    question5: false,
  });

  // Handle changes in the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestions({ ...questions, [name]: value });
  };

  // Toggle edit mode for a specific question
  const toggleEdit = (questionKey) => {
    setEditMode({ ...editMode, [questionKey]: !editMode[questionKey] });
  };

  // Handle form submission to save updated questions
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Questions:", questions);
    axios.put(`http://127.0.0.1:8000/api/update_test_questions/${id}/`, questions)
      .then((response) => {
        console.log("Saved Successfully:", response.data);
        toast.success("Questions updated successfully!")
        // alert("Questions updated successfully!");
      })
      .catch((error) => {
        console.error("Error saving questions:", error);
        toast.error(error.response.data.error || "Something Went Wrong!")
        alert("Failed to save questions.");
      });
  };

  // Fetch initial questions data
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/update_test_questions/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Questions:", data);
        setQuestions(data);
      })
      .catch((error) => console.error("Error fetching questions:", error));
  }, [id]);

  return (
    <div className="ans-table-container">
      <h1>Questions</h1>
      <form onSubmit={handleSubmit}>
        <table id="ans-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(questions)
            .filter((key) => key.startsWith("question"))
            .map((key, index) => (
              <tr key={index}>
                <td>
                  {editMode[key] ? (
                    <input
                      type="text"
                      name={key}
                      value={questions[key]}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    questions[key]
                  )}
                </td>
                <td>
                  <div
                    className="but"
                    style={{
                      display: "flex",
                      gap: "20px",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      id="sub-btn"
                      type="button"
                      onClick={() => toggleEdit(key)}
                    >
                      {editMode[key] ? "Cancel" : "Edit"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button id="sub-btn" type="submit">
          Save All
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
