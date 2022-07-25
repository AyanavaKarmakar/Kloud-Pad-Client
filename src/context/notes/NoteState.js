import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";

    const notesInitial = [];

    const [notes, setNotes] = useState(notesInitial);

    // get all notes
    const getAllNotes = async () => {

        // API CALL
        const response = await fetch(`${host}/api/notes/fetch-all-notes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        const json = await response.json();
        // console.log(json);

        setNotes(json);

    }

    // add a note
    const addNote = async (title, description, tag) => {
        // console.log("adding a new note!");
        // API CALL

        const response = await fetch(`${host}/api/notes/add-note`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    }

    // delete a note
    const deleteNote = async (id) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        // const json = response.json();
        // console.log(json);

        // console.log("deleting node with id: " + id);

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        })

        setNotes(newNotes);
    }

    // edit a note
    const editNote = async (id, title, description, tag) => {
        // API call
        const response = await fetch(`${host}/api/notes/update-note/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });

        // const json = response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));

        // logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];

            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;