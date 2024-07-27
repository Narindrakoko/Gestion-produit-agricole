import React from 'react';
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ProductIcon from "@mui/icons-material/LocalMall";
import { useNavigate, useLocation } from "react-router-dom";
import { UseAppStore } from '../AppStore';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import tropical from '../sary/logo1.png'
import SpaIcon from '@mui/icons-material/Spa';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import Diversity3Icon from '@mui/icons-material/Diversity3';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidenav () {
  const theme = useTheme();
  //const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const open = UseAppStore((state) => state.dopen);
  const isItemSelected = (path) => location.pathname === path;

  return (
    <div>
        <div className="backdark">
        <Box sx={{ display: "flex" }} className="backdark">
          <CssBaseline />
          <Box height={30} />
          <Drawer variant="permanent" open={open} >
            <DrawerHeader>
              <IconButton>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />

        
            <img src={tropical} alt="tropical"  style={{width:'25vh' , height:'15vh'}}/>

            <hr className='text-secondary ' />
            <List className="backdark">
            <ListItem
                disablePadding
                sx={{ display: "block", marginTop: "3%"  }}
                onClick={() => {
                  navigate("/Acceuil");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Acceuil")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Acceuil") ? "#27b139" : "inherit",
                    }}
                  >
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Acceuil"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/Produit");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Produit")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Produit") ? "#27b139" : "inherit",
                    }}
                  >
                    <ProductIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Produit"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>



              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/Stock");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Stock")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Stock") ? "#27b139" : "inherit",
                    }}
                  >
                    <Diversity3Icon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Etat de stock"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>



              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/Client");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Client")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Client") ? "#27b139" : "inherit",
                    }}
                  >
                    <PeopleAltIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Client"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/Culture");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Culture")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Culture") ? "#27b139" : "inherit",
                    }}
                  >
                    <SpaIcon />
                  </ListItemIcon>
                  <ListItemText primary="Culture" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => {
                  navigate("/Commande");
                }}
              >
                <ListItemButton
                  selected={isItemSelected("/Commande")}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: isItemSelected("/Commande") ? "#27b139" : "inherit",
                    }}
                  >
                    <EditCalendarIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Commande"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
              
            </List>
            <hr className='text-secondary ' />
            <div className='btn   cover mb-3' style={{marginTop:'50%' , background:'transparent ' ,borderStyle:'double' , borderColor:'white'}}>
            <hr className='text-secondary ' />
        <i className="bi bi-person-circle me-3 fs-5"></i>
          <span className="fs-4 "  >ADMIN</span>
          </div>
          
          </Drawer>
        </Box>
      </div>
    </div>
  );
};
