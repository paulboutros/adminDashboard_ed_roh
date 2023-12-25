 
 


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';

import React, { useEffect, useState } from 'react';
 

import { tokens  } from "../../theme";
import { Avatar, useTheme} from '@mui/material';
  
 

import {
   
  useAddress,
  
} from "@thirdweb-dev/react";
import { useUserContext } from '../../context/UserContext';
import { getAvatar } from '../../data/API';
  

export default function ToDoList ({ tasks    }) {

    const address = useAddress();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const {user, setUser } = useUserContext();
   
    
  
     function taskHandleClick( index ){
  
      switch ( index  ){
        case 0: 
     //   tasks[index].callBack ( address ); 
        ;break;
        case 1: 
          //   tasks[index].callBack ( user, address  );
        
        
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
           sx={
            {
             
              '&:not(.hover)': { 
                
                 outline: `1px solid rgba(102,178,255,0.0)`, 
                 WebkitTransition: "all 2000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
                 transition:       "all 2000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms",
                 borderRadius:"8px",
              },
              '&:hover': {
  
                cursor:"pointer",
                outline: `1px solid rgba(102,178,255,0.4)`, 
                borderRadius:"8px",
                backgroundColor: "rgba(102,178,255,0.2)" ,
                filter: "brightness(1.85)",
              //  color: `${colors.redAccent[200]}`,
                WebkitTransition: "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
                transition:       "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms"
                
              },
              
             } 
           }
          >
             <ListItemIcon  sx={{ minWidth :"54px" }}  >
                 <Avatar 
                  sx = {{ height : "30px", width:"30px"}}
                  src= { task.src } /> 
             </ListItemIcon>
            <ListItemText primary={task.global_name} />
            
            {task.verified ? (   <VerifiedIcon  style={{ marginLeft: "5px", color: colors.greenAccent[400] }} /> ) : ( <> </> )}  

          </ListItem>
        ))}
      </List>
    );
  };

   