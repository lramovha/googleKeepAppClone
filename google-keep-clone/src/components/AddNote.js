import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";

const AddNote = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = async () => {
    if (!userId) return alert("Please log in to add notes");

    try {
      await addDoc(collection(db, "users", userId, "notes"), {
        title,
        content,
        timestamp: new Date(),
      });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full"
      />
      <button onClick={handleAddNote} className="mt-2 px-4 py-2 bg-green-500 text-white rounded">
        Add Note
      </button>
    </div>
  );
};

export default AddNote;




