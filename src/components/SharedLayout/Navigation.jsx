import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navigation = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          Product Management
        </Typography>
        <Button component={Link} to='/' color='inherit'>
          Home
        </Button>
        <Button component={Link} to='/create' color='inherit'>
          Create Product
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
