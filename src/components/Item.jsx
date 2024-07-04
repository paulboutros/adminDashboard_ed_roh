 
import {  MenuItem } from "react-pro-sidebar";
import { Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { BootstrapTooltip, tokens } from "../theme";
  
 
 import React from "react";
 import { useAddress } from "@thirdweb-dev/react";


const Item = ({ title, to, icon, selected, setSelected, addressRequired=false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  
    //const { user } = useUserContext();
    const address = useAddress();
    return (

     
    <React.Fragment>  
   
        {(!address && addressRequired) ? (

   <></>


        ):(
     
          <BootstrapTooltip  title={title}  placement="right"  >

          <MenuItem
            active={selected === title}
            style={{
              color: colors.grey[100],
            }}
            onClick={() =>{
              setSelected(title)
            //  sendTracking(user , "N/A", "N/A" , title ,  "Side Bar " ) 
              }}
            icon={icon}
          >
            <Typography>{title}</Typography>
            <Link to={to} />
          </MenuItem>
          
          
          </BootstrapTooltip>


        ) } 
      

   </React.Fragment>


    );
  };

  export default Item;