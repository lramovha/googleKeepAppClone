import React, { useState, useEffect } from "react";
import { db, collection, getDocs, deleteDoc, doc, query, where } from "../firebase";
import { Grid, Card, CardContent, Typography, IconButton, Fade } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation Library

const Notes = ({ userId }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, "notes"), where("userId", "==", userId));
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

    if (userId) {
      fetchNotes();
    }
  }, [userId]);


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
          <AnimatePresence>
            {notes.map((note) => (
              <Grid item xs={12} sm={6} md={4} key={note.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card sx={{ backgroundColor: "#FFF8E1", padding: 2, boxShadow: 4, borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="h6">{note.title}</Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {note.content}
                      </Typography>
                      <Fade in={true} timeout={500}>
                        <IconButton onClick={() => handleDelete(note.id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Fade>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </AnimatePresence>
        )}
      </Grid>
    </div>
  );
};

export default Notes;





