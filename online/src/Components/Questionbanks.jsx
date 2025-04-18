import React, { useState } from "react";
import axios from "axios";
import "./Css/Question.css";

const UploadQuestionBank = () => {
  const [title, setTitle] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("pdf_file", pdfFile);

    try {
      await axios.post("http://localhost:8000/api/upload-question-bank/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      alert("PDF uploaded successfully!");
      setTitle("");
      setPdfFile(null);
    } catch (error) {
      console.error("Error uploading PDF", error);
      alert("Failed to upload PDF.");
    }
  };

  return (
    <div className="question-container">
      <h2>Upload Question Bank</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          required
        />
        <button type="submit">Upload PDF</button>
      </form>
    </div>
  );
};

export default UploadQuestionBank;
