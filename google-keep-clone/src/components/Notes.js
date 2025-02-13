import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";

const Notes = ({ user }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notes"), (snapshot) => {
      setNotes(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const addNote = async () => {
    if (!title || !content) return;
    await addDoc(collection(db, "notes"), {
      title,
      content,
      userId: user.uid,
      timestamp: new Date(),
    });
    setTitle("");
    setContent("");
  };

  const deleteNote = async (id) => {
    await deleteDoc(doc(db, "notes", id));
  };

  return (
    <div className="p-5">
      <div className="flex flex-col mb-5">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Take a note..."
          className="border p-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button onClick={addNote} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
          Add Note
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="p-4 border shadow-lg rounded-lg relative">
            <h2 className="font-bold">{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note.id)} className="absolute top-2 right-2 text-red-500">
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
