import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";

const NoteCard = ({ note, handleDelete }) => {
  return (
    <Card sx={{ backgroundColor: note.color, margin: "10px", width: "250px" }}>
      <CardContent>
        <Typography variant="h6">{note.title}</Typography>
        <Typography variant="body2">{note.content}</Typography>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(note.id)}
          sx={{ marginTop: 2 }}
        >
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
