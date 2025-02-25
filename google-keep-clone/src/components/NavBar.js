import React from "react";
import { AppBar, Toolbar, Typography, Button, Avatar, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4"; // 🌙 Icon
import Brightness7Icon from "@mui/icons-material/Brightness7"; // ☀️ Icon

const NavBar = ({ user, handleLogout, darkMode, toggleDarkMode }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "#FFBF00" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Notes App
        </Typography>

        {/* Dark Mode Toggle Button */}
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {user && (
          <>
            <Avatar src={user.photoURL} alt={user.displayName} sx={{ marginLeft: 2, marginRight: 2 }} />
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
