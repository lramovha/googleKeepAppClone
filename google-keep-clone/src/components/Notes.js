import React, { useState, useEffect } from "react";
import { db, collection, getDocs, deleteDoc, doc, query, where } from "../firebase";
import { Grid, Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Notes = ({ userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  const fetchNotes = async () => {
    try {
      const q = query(collection(db, "notes"), where("userId", "==", userId)); // ✅ Fetch only the logged-in user's notes
      const querySnapshot = await getDocs(q);
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
    <div style={{ marginTop: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Your Notes
      </Typography>
      <Grid container spacing={2}>
        {notes.length === 0 ? (
          <Typography color="textSecondary">No notes yet.</Typography>
        ) : (
          notes.map((note) => (
            <Grid item xs={12} sm={6} md={4} key={note.id}>
              <Card sx={{ backgroundColor: "#FFF8E1", padding: 2 }}>
                <CardContent>
                  <Typography variant="h6">{note.title}</Typography>
                  <Typography variant="body2">{note.content}</Typography>
                  <IconButton onClick={() => handleDelete(note.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default Notes;




