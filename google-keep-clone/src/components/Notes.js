import React, { useState, useEffect } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";

const Notes = ({ userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const notesArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "notes", noteId));
      setNotes(notes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Notes</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition"
            >
              <h3 className="font-bold">{note.title}</h3>
              <p>{note.content}</p>
              <button
                onClick={() => handleDelete(note.id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notes;


