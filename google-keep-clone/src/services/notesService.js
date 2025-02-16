import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";

// Firestore collection reference
const notesCollection = collection(db, "notes");

// Add a new note with the user's ID
export const addNote = async (userId, title, content) => {
  try {
    await addDoc(notesCollection, {
      userId,  // Associate note with the logged-in user
      title,
      content,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// Fetch only notes for the logged-in user
export const fetchNotes = async (userId) => {
  try {
    const q = query(notesCollection, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    let notesArray = [];
    querySnapshot.forEach((doc) => {
      notesArray.push({ id: doc.id, ...doc.data() });
    });
    return notesArray;
  } catch (error) {
    console.error("Error fetching notes:", error);
  }
};

// Update a note
export const updateNote = async (noteId, updatedContent) => {
  try {
    const noteRef = doc(db, "notes", noteId);
    await updateDoc(noteRef, { content: updatedContent });
  } catch (error) {
    console.error("Error updating note:", error);
  }
};

// Delete a note
export const deleteNote = async (noteId) => {
  try {
    await deleteDoc(doc(db, "notes", noteId));
  } catch (error) {
    console.error("Error deleting note:", error);
  }
};
