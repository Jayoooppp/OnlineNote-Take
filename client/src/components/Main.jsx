import { useState, useEffect } from "react";
import axios from "axios";
import "./common.css"
import Note from "./Note";
import CreateArea from "./CreateArea";


function Main() {

    const [notes, setNotes] = useState([]);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    useEffect(() => {
        axios.get("/note/" + userInfo._id)
            .then(response => {
                setNotes(response.data);

            })
    })

    function addNote(newNote) {
        axios.post(
            "/note/" + userInfo._id, { newNote })
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    function deleteNote(id) {
        axios.delete(
            "/note/" + id + "")
            .then(res => {
                console.log(res);
                console.log(res.data);
            });
    }

    return (
        <div id="content-wrap">
            <CreateArea onAdd={addNote} />
            {notes.map((noteItem) => {
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
        </div>
    );
}

export default Main;