import React, { useContext } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { FiEdit } from 'react-icons/fi';
import NoteContext from "../context/notes/NoteContext.js";


const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;

    const { note, updateNote } = props

    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <h4>
                        <button
                            className="unstyled-button"
                            onClick={() => {
                                deleteNote(note._id)
                            }}
                        >
                            <AiOutlineDelete className='mx-1' />
                        </button>
                        <button
                            className="unstyled-button"
                            onClick={() => {
                                updateNote(note)
                            }}
                        >
                            <FiEdit className='mx-1' />
                        </button>
                    </h4>
                </div>
            </div>
        </div>
    )
}

export default NoteItem