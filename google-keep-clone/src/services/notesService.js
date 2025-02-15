import { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "../firebase";

// Firestore collection reference
const notesCollection = collection(db, "notes");

// Add a new note
export const addNote = async (title, content) => {
  try {
    await addDoc(notesCollection, {
      title,
      content,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Error adding note:", error);
  }
};

// Fetch all notes
export const fetchNotes = async () => {
  try {
    const querySnapshot = await getDocs(notesCollection);
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
