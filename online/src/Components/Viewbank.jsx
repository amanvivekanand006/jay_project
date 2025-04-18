import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Css/Question.css";

const Viewquestionbanks = () => {
  const [questionBanks, setQuestionBanks] = useState([]);

  const fetchQuestionBanks = async () => {
    try {
      const response = await axios.get("http://localhost:8000/get_list_banks/");
      setQuestionBanks(response.data);
    } catch (error) {
      console.error("Error fetching question banks", error);
    }
  };

  useEffect(() => {
    fetchQuestionBanks();
  }, []);

  return (
    <div className="question-container">
      <h2>Available Question Banks</h2>
      <div className="card-container">
        {questionBanks.map((pdf) => (
          <div className="card" key={pdf.id}>
            <h3>{pdf.title}</h3>
            <a
              href={`http://localhost:8000${pdf.pdf_file}`}
              target="_blank"
              rel="noopener noreferrer"
              className="view-button"
            >
              📄 View PDF
            </a>
            {/* <p>Uploaded At: {new Date(pdf.uploaded_at).toLocaleString()}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Viewquestionbanks;
