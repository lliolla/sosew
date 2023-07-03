import  {useState} from 'react';
import { styled, useTheme } from '@mui/material/styles';
//mui component
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

// views 
import Capsule from '../views/Capsule';
import Message from '../views/Message';
import Pattern from '../views/Pattern';
import Project from '../views/Project';
import Settings from '../views/Settings';

// components
import {navItem} from '../data/navData'

//styles

import {girdViewStyle,appBarStyles} from '../styles'
import SisebarListItems from '../components/global/SisebarListItems';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

  const [open, setOpen] = useState(false);
  const [menuData, setmenuData] = useState("Pattern");

  const handleMenuDataChange = (data) => {
    setmenuData(data); // Met à jour la valeur de menuData dans le parent
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>

      <AppBar position="fixed" elevation={4} sx={appBarStyles}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={()=>{setOpen(!open)}}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" >
          <img src="../../public/needle.png" alt="needle" height={40}/>
          
            SOSEW Bibliothèque de patrons
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
           
          </IconButton>
        </DrawerHeader>
        <Divider />
    <SisebarListItems navItem={navItem} setMenuData={handleMenuDataChange} />   
        <Divider />
       
      </Drawer>
      <Box component="main" 
      sx={girdViewStyle }>
    
        {menuData == "Capsule" && <Capsule/>    }  
        {menuData == "Message" && <Message/>    }  
        {menuData == "Pattern" && <Pattern/>    } 
        {menuData == "Project" && <Project/>    }  
        {menuData == "Settings" && <Settings/>    }  

      
       
      </Box>


    </>
   
  );
}