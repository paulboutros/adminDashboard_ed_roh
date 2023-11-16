 
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
 
 
import {sendTracking} from "../data/API"
import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider


const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    const { user } = useUserContext();
    
    return (
      <MenuItem
        active={selected === title}
        style={{
          color: colors.grey[100],
        }}
        onClick={() =>{
           setSelected(title)
           sendTracking(user , "N/A", "N/A" , title ,  "Side Bar " ) 
          }}
        icon={icon}
      >
        <Typography>{title}</Typography>
        <Link to={to} />
      </MenuItem>
    );
  };

  export default Item;