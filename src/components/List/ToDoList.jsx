import Avatar from '@mui/material/Avatar';
 


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';


import React, { useEffect, useState } from 'react';
 

import { allCSS, tokens  } from "../../theme";
import { useTheme} from '@mui/material';
  
 

import {
   
  useAddress,
  
} from "@thirdweb-dev/react";
import { useUserContext } from '../../context/UserContext';
  

export default function ToDoList ({ tasks    }) {

    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {user, setUser } = useUserContext();
   
    
  
     function taskHandleClick( index ){
  
      switch ( index  ){
        case 0: 
        tasks[index].callBack ( address ); 
        ;break;
        case 1: 
             tasks[index].callBack ( user, address  );
       //  handleConnect(); 
        
        ;break; 
        case 2:     ;break;
         
       default: return "ERROR";  
      }
  
     }
  
    return (
      <List>
        {tasks.map((task, index) => (
          <ListItem key={index} 
             onClick={() => taskHandleClick(index)}
             sx={  allCSS( theme.palette.mode ).taskSelection } 
           
           
          >
            <ListItemIcon  sx={{ minWidth :"34px" }}  >
            
               {task.completed ? (
                <CheckCircleIcon style={{ color: theme.palette.blueSelectedTab }} />
              ) : (
                <CancelIcon style={{ color: colors.grey[400] }} />
              )}
            </ListItemIcon>
            <ListItemText primary={task.description} />
          </ListItem>
        ))}
      </List>
    );
  };

   