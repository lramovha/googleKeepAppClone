import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";

const AddNote = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        userId,
        timestamp: new Date(),
      });
      setTitle("");
      setContent("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="relative">
      {/* Floating Add Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-10 right-10 bg-yellow-500 text-white p-4 rounded-full shadow-lg hover:bg-yellow-600 transition"
        >
          +
        </button>
      )}

      {/* Note Input Box */}
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          className="fixed bottom-16 right-10 bg-white p-4 rounded-lg shadow-lg w-80"
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border-b mb-2 focus:outline-none"
          />
          <textarea
            placeholder="Take a note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
          />
          <div className="flex justify-between mt-2">
            <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Save
            </button>
            <button onClick={() => setIsOpen(false)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddNote;
