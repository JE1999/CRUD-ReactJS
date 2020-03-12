import React from 'react';
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function (props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          <Link 
            to="/"
            className="text-white"
            style={{textDecoration: 'none'}}
          >
            <CodeIcon 
              fontSize="large"
              className="mb-1"
            /> CRUD-REDUX
            </Link>
          </Typography>

         
          <Link
            to="/producto/nuevo"
            className="btn btn-dark"
          >
            <AddIcon /> AGREGAR
          </Link>
        </Toolbar>
      </AppBar>

      <div className="container my-5">
        {props.children}
      </div>

      <footer>

        <div className="text-center">
          <h6>© 2020 Copyright: JE</h6>
        </div>

      </footer>

    </div>
  );
}
