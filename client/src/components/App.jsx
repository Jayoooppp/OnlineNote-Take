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


  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
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
