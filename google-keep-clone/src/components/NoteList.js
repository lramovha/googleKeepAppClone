import React, { useEffect, useState } from "react";
import { fetchNotes, deleteNote } from "../services/notesService";

const NotesList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      const notesData = await fetchNotes();
      setNotes(notesData);
    };
    getNotes();
  }, []);

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id)); // Remove from UI
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">My Notes</h2>
      {notes.length === 0 ? (
        <p>No notes available.</p>
      ) : (
        <ul>
          {notes.map((note) => (
            <li key={note.id} className="bg-gray-100 p-2 mb-2 rounded">
              <h3 className="font-semibold">{note.title}</h3>
              <p>{note.content}</p>
              <button
                onClick={() => handleDelete(note.id)}
                className="text-red-500 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesList;
