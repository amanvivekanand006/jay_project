import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Tutor from './Components/Tutor';
import Tutornav from './Components/Tutornav';
import Tutorfooter from './Components/Tutorfooter';
import Subjects from './Components/Subjects';
import Testpage from './Components/Testpage';
import Marks from './Components/Marks';
import Tutorsubjects from './Components/Tutorsubjects';
import Students from './Components/Students';
import Studentssub from './Components/Studentssub';
import Studentsans from './Components/Studentsans';
import Tutorquestions from './Components/Tutorquestions';
import LandingPage from './Components/Landing';
import Addtest from './Components/Addtest';
import Register_form from './Components/Register';
import Login_page from './Components/Login';
import Landingnav from './Components/Landingnav';
import Admindashboard from './Components/Admindashboard';
import Users from './Components/Users';
import Thanks from './Components/Thanks';
import ProfileTable from './Components/Profiletable';
import Adminnav from './Components/Adminnav';
import QuestionBank from './Components/Questionbanks';
import Viewquestionbanks from './Components/Viewbank';
import MonitoringDetails from './Components/Studentlogs'
import Students2 from './Components/Students2';
import CardOptions from './Components/Exam'
import ObjectiveExamStart from './Components/Mchoiceexam'
import ObjectiveExamForm from './Components/Add_m_exam'
import StudentReports from './Components/Report'
import CardOptions2 from './Components/Exam2';
import CardOptions3 from './Components/Exam3';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Register from './Components/Register';


// Layout Component to wrap common UI
const Layout1 = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

const Layout2 = ({ children }) => {
  return (
    <>
      <Tutornav/>
      {children}
      <Tutorfooter />
    </>
  );
};

const Layout3 = ({ children }) => {
  return (
    <>
      <Landingnav/>
      {children}
      <Tutorfooter />
    </>
  );
};

const Layout4 = ({ children }) => {
  return (
    <>
      <Adminnav/>
      {children}
      <Tutorfooter />
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage/>,
  },
  {
    path: "/home",
    element: <Layout1><Home/></Layout1>,
  },
  {
    path: "/tutor",
    element: <Layout2><Tutor/></Layout2>,
  },
  {
    path: "/subjects",
    element: <Layout1><Subjects/></Layout1>,
  },
  {
    path: "/testpage/:id",
    element: <Testpage/>,
  },
  {
    path: "/marks",
    element: <Layout1><Marks/></Layout1>,
  },
  {
    path: "/subjects2",
    element: <Layout2><Tutorsubjects/></Layout2>,
  },
  {
    path: "/marks2",
    element: <Layout2><Marks/></Layout2>,
  },
  {
    path: "/marks3",
    element: <Layout4><Marks/></Layout4>,
  },
  {
    path: "/students",
    element: <Layout2><Students/></Layout2>,
  },
  {
    path: "/student_sub/:id",
    element: <Layout2><Studentssub/></Layout2>,
  },
  {
    path: "/student_ans/:subject/:id",
    element: <Layout2><Studentsans/></Layout2>,
  },
  {
    path: "/tutor_q_cust/:id",
    element: <Layout2><Tutorquestions/></Layout2>,
  },
  {
    path: "/addquestion",
    element: <Layout2><Addtest/></Layout2>,
  },
  {
    path: "/register",
    element: <Layout3><Register_form/></Layout3>,
  },
  {
    path: "/login",
    element: <Layout3><Login_page/></Layout3>,
  },
  {
    path: "/admin",
    element: <Layout4><Admindashboard/></Layout4>,
  },
  {
    path: "/user",
    element: <Layout4><Users/></Layout4>,
  },
  {
    path: "/thanks",
    element:<Thanks/>,
  },
  {
    path: "/profile",
    element:<Layout4><ProfileTable/></Layout4>,
  },
  {
    path: "/questionbank",
    element:<Layout2><QuestionBank/></Layout2>,
  },
  {
    path: "/viewbank",
    element:<Layout1><Viewquestionbanks/></Layout1>,
  },
  {
    path: "/logs/:studentId",
    element:<Layout2><MonitoringDetails/></Layout2>,
  },

  {
    path: "/students2/",
    element:<Layout2><Students2/></Layout2>,
  },

  {
    path: "/exam_type/",
    element:<Layout2><CardOptions/></Layout2>,
  },
  {
    path: "/exam_type5/",
    element:<Layout4><CardOptions/></Layout4>,
  },
  {
    path: "/exam_type1/",
    element:<Layout1><CardOptions2/></Layout1>,
  },
  {
    path: "/exam_type2/",
    element:<Layout2><CardOptions2/></Layout2>,
  },
  {
    path: "/exam_type3/",
    element:<Layout2><CardOptions3/></Layout2>,
  },
  {
    path: "/exam_type4/",
    element:<Layout4><CardOptions3/></Layout4>,
  },
  {
    path: "/m_choice_exam/:examId/",
    element:<ObjectiveExamStart/>,
  },
  {
    path: "/add_choice_exam/",
    element:<Layout2><ObjectiveExamForm/></Layout2>,
  },
  {
    path: "/report/",
    element:<Layout2><StudentReports/></Layout2>,
  },
  {
    path: "/report2/",
    element:<Layout1><StudentReports/></Layout1>,
  },

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
