import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Header(){
const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <img src="./images/header.png" style={{width:'60px',height:'60px'}} alt="noHeaderImage"/>
          <Typography style={{marginLeft:'10px'}}variant="h6" color="inherit">
            CheckListTracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}