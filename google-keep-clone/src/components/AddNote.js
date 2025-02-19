import React, { useState } from "react";
import { db, collection, addDoc } from "../firebase";
import { Fab, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { SketchPicker } from "react-color"; // Import Color Picker

const AddNote = ({ userId, onNoteAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#FFF8E1"); // Default color

  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleSubmit = async () => {
    if (!title || !content) return; // Prevent empty notes

    try {
      await addDoc(collection(db, "notes"), {
        title,
        content,
        userId, // Ensure userId is stored
        color, // Save color in Firestore
        timestamp: new Date(),
      });

      if (onNoteAdded) {
        onNoteAdded(); // Ensure it only runs if passed from parent
      }
      setOpen(false);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <>
      {/* Floating Add Button */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(true)}
        sx={{ position: "fixed", bottom: 20, right: 20, backgroundColor: "#FFBF00" }}
      >
        <AddIcon />
      </Fab>

      {/* Modal for Adding Note */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Note</DialogTitle>
        <DialogContent>
          <SketchPicker color={color} onChangeComplete={handleColorChange} />
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Content"
            fullWidth
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNote;

