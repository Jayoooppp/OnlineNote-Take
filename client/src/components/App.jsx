import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
	
	
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/note")
    .then(response => {
      console.log(response.data)
      setNotes(response.data);
      
    })
  })

  function addNote(newNote) {
    axios.post(
      "http://localhost:8080/note", { newNote }) 
             .then(res => {
               console.log(res);
               console.log(res.data);
           });
  }

  function deleteNote(id) {
    axios.delete(
      "http://localhost:8080/note/" +id +"")
      .then(res => {
        console.log(res);
        console.log(res.data);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem , index) => {
        return (
          <Note
            key={noteItem._id}
            id={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />

        );
      })}
      <Footer />
    </div>
  );
}

export default App;
