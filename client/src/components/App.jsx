import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Home from "./HomePage/Home";
import Signup from "./HomePage/SIgnup";
import Login from "./HomePage/Home.js";
import Main from "./Main";
import { BrowserRouter, Route, Routes } from "react-router-dom"



function App() {

  const link = "https://onlinenote-taker.herokuapp.com"
  // const [notes, setNotes] = useState([]);

  // useEffect(() => {  
  //   axios.get(link + "/note")
  //     .then(response => {
  //       console.log(response.data)
  //       setNotes(response.data);

  //     })
  // })

  function addNote(newNote) {
    axios.post(
      link + "/note", { newNote })
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  function deleteNote(id) {
    axios.delete(
      link + "/note/" + id + "")
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
  }

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Login />} />
        <Route
          path="/main"
          element={<Main />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
