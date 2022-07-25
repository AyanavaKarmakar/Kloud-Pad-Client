import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from "../context/notes/NoteContext.js";
import AddNote from './AddNote.js';
import NoteItem from './NoteItem.js';
import { useNavigate } from "react-router-dom";

const Notes = (props) => {

    const context = useContext(NoteContext);
    const { notes, getAllNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", editTitle: "", editDescription: "", editTag: "" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const { handleSetAlert } = props;
    const nav = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('token')) {
            getAllNotes();
        } else {
            handleSetAlert("Please login or signup!", "info");

            nav("/");
        }

        // eslint-disable-next-line
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            editTitle: currentNote.title,
            editDescription: currentNote.description,
            editTag: currentNote.tag
        });

    }

    const handleOnClick = () => {
        // console.log("Updating the note: ", note);

        editNote(note.id, note.editTitle, note.editDescription, note.editTag);

        refClose.current.click();

        props.handleSetAlert("Updated Successfully!", "success");

    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote handleSetAlert={handleSetAlert} />

            <button style={{ display: 'none' }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <>
                                <form className='my-3'>
                                    <div className="mb-3">
                                        <label htmlFor="editTitle" className="form-label">Title</label>
                                        <input type="text" className="form-control" id="editTitle" name="editTitle" value={note.editTitle} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editDescription" className="form-label">Description</label>
                                        <input type="text" className="form-control" id="editDescription" name="editDescription" value={note.editDescription} onChange={onChange} minLength={5} required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="editTag" className="form-label">Tag</label>
                                        <input type="text" value={note.editTag} className="form-control" id="editTag" name="editTag" onChange={onChange} minLength={3} required />
                                    </div>
                                </form>
                            </>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.editTitle.length < 5 || note.editDescription.length < 5 || note.editTag.length < 3} type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3 mx-1'>
                <h2>Your Notes</h2>
                <div className='container mx-1'>
                    {notes.length === 0 && 'No notes to display!'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} handleSetAlert={handleSetAlert} note={note} updateNote={updateNote} />
                })}
            </div>
        </>

    )
}

export default Notes