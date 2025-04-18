import React from 'react'
import Ai from './Images/ai.jpg'
import five from './Images/five.jpg'
import future from './Images/future.jpg'
import "./Css/LandingPage.css";



const blogs = [
  {
    id: 1,
    image: future,
    title: "The Future of Online Exams",
    content:
      "Online exams are transforming the education sector by making assessments more accessible and efficient. With AI-based proctoring, students can take exams from anywhere without compromising integrity.",
    date: "October 25, 2024",
  },
  {
    id: 2,
    image: five,
    title: "Top 5 Study Tips for Online Learning",
    content:
      "Online learning requires discipline and proper strategies. Follow these tips: set a schedule, eliminate distractions, take notes, participate in discussions, and take regular breaks to enhance retention.",
    date: "October 20, 2024",
  },
  {
    id: 3,
    image: Ai,
    title: "How AI is Enhancing Online Education",
    content:
      "Artificial Intelligence is personalizing learning experiences by analyzing student performance and providing adaptive learning materials. This helps students improve their weak areas effectively.",
    date: "October 15, 2024",
  },
];

export default function Landingblog() {
  return (
<div className="blog-section">
      <h2>Latest Blogs</h2>
      <div className="blog-list">
        {blogs.map((blog) => (
          <div key={blog.id} className="blog-card">
            <img src={blog.image} alt="" />
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <span className="date">{blog.date}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
