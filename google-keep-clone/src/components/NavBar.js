import React from "react";
import { auth } from "../firebase";
import { AppBar, Toolbar, Typography, Button, Avatar } from "@mui/material";

const NavBar = ({ user, handleLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#FFBF00" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>
        {user ? (
          <>
            <Avatar src={user.photoURL} alt={user.displayName} sx={{ marginRight: 2 }} />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
