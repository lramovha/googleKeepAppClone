import React, { useState, useEffect } from "react";
import { db, collection, getDocs, deleteDoc, doc } from "../firebase";

const Notes = ({ userId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "users", userId, "notes"));
      const notesArray = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotes(notesArray);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (noteId) => {
    try {
      await deleteDoc(doc(db, "users", userId, "notes", noteId));
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Notes</h2>
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p>No notes yet.</p>
      ) : (
        notes.map((note) => (
          <div key={note.id} className="p-4 border rounded my-2 bg-white shadow">
            <h3 className="font-bold">{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleDelete(note.id)} className="mt-2 px-3 py-1 bg-red-500 text-white rounded">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Notes;


