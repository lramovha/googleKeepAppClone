import React, { useState } from "react";
import { addNote } from "../services/notesService";

const AddNote = ({ onNoteAdded }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return; // Prevent empty notes

    await addNote(title, content);
    setTitle(""); // Reset form
    setContent("");
    onNoteAdded(); // Trigger refresh
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">Add a Note</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;



