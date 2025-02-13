import React, { useState } from "react";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import Login from "./components/Login";
import Notes from "./components/Notes";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div>
      {user ? (
        <div>
          <nav className="flex justify-between p-4 bg-gray-200">
            <h1 className="text-lg font-bold">Google Keep Clone</h1>
            <button onClick={() => signOut(auth).then(() => setUser(null))} className="bg-red-500 text-white px-3 py-1 rounded">
              Logout
            </button>
          </nav>
          <Notes user={user} />
        </div>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;

