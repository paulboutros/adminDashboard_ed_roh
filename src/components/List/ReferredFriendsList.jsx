 
 


import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
 
import VerifiedIcon from '@mui/icons-material/Verified';

 
 

import { allCSS, tokens  } from "../../theme";
import { Avatar, useTheme} from '@mui/material';
  
  

export default function ToDoList ({ tasks    }) {

     
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
     
    
  
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
               allCSS( theme.palette.mode ).taskSelection  
           }
          >
             <ListItemIcon  sx={{ minWidth :"54px" }}  >
                 <Avatar 
                  sx = {{ height : "30px", width:"30px"}}
                  src= { task.src } /> 
             </ListItemIcon>
            <ListItemText primary={task.global_name} />
            
            {task.verified ? (   <VerifiedIcon  style={{ marginLeft: "5px", color: colors.greenAccent[400] }} /> ) : ( <> </> )}  

            {/* <ListItemText secondary = "Additional Text" /> */}
            {task.mockMember ? (   <VerifiedIcon  style={{ marginLeft: "5px", color: colors.redAccent[400] }} /> ) : ( <> </> )}  

          </ListItem>
         ))}
      </List>
    );
  };

   