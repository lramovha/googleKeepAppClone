import React, { useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Your Notes App</h1>
      <AddNote onNoteAdded={() => setRefresh(!refresh)} />
      <Notes key={refresh} />
    </div>
  );
};

export default App;


