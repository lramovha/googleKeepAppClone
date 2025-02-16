import React, { useState } from "react";
import AddNote from "./components/AddNote";
import Notes from "./components/Notes";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null); // Track logged-in user

  return (
    <div className="p-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">Your Notes App</h1>
          <button onClick={() => setUser(null)} className="px-4 py-2 bg-red-500 text-white rounded">
            Logout
          </button>
          <AddNote userId={user.uid} />
          <Notes userId={user.uid} />
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;


