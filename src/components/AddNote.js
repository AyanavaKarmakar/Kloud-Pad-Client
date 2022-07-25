import React, { useContext, useState } from 'react'
import NoteContext from "../context/notes/NoteContext.js";


const AddNote = () => {

    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <>
                    <form className='my-3'>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input type="text" value={note.title} className="form-control" id="title" name="title" onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <input type="text" value={note.description} className="form-control" id="description" name="description" onChange={onChange} minLength={5} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tag" className="form-label">Tag</label>
                            <input type="text" value={note.tag} className="form-control" id="tag" name="tag" onChange={onChange} minLength={3} required />
                        </div>
                        <button disabled={note.title.length < 5 || note.description.length < 5 || note.tag.length < 3} type="submit" className="btn btn-primary" onClick={handleOnClick}>Add</button>
                    </form>
                </>
            </div>
        </>
    )
}

export default AddNote