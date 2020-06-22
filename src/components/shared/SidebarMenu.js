import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { Link } from "react-router-dom";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function CustomizedMenus() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        onClick={handleClick}
        edge="start"
        className={classes.menuButton} color="inherit">
        <MenuIcon />
      </IconButton>

      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <Link to="/users">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-user" />
            </ListItemIcon>
            <ListItemText primary="Usuarios" />
          </StyledMenuItem>
        </Link>

        <Link to="/agentes">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-user-shield" />
            </ListItemIcon>
            <ListItemText primary="Agentes" />
          </StyledMenuItem>
        </Link>

        <Link to="/alumnos">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-user-graduate" />
            </ListItemIcon>
            <ListItemText primary="Alumnos" />
          </StyledMenuItem>
        </Link>

        <Link to="/ets">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-file-alt" />
            </ListItemIcon>
            <ListItemText primary="ETS" />
          </StyledMenuItem>
        </Link>

        <Link to="/ets2">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-file-alt" />
            </ListItemIcon>
            <ListItemText primary="ETS2" />
          </StyledMenuItem>
        </Link>

        <Link to="/tramiteFase1">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-file-alt" />
            </ListItemIcon>
            <ListItemText primary="TramiteFase1" />
          </StyledMenuItem>
        </Link>

        <Link to="/tramite">
          <StyledMenuItem>
            <ListItemIcon>
              <Icon className="fas fa-file-alt" />
            </ListItemIcon>
            <ListItemText primary="Tramite" />
          </StyledMenuItem>
        </Link>

      </StyledMenu>
    </div>
  );
}
