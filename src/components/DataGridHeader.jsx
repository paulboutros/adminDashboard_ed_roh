 
import { Box , Typography, useTheme } from "@mui/material";
 
import {  RowChildrenAlignLeft } from "../components/Layout.jsx"  
 
import { text1, tokens } from "../theme";
      


function DataGridHeader ( {title}){


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return(
         <div> 

<Box 
        sx={{ 
          
           // border: "none",
            //borderTop: "none",
            // border: '1px solid #ddd', // Add border for better visibility
             border: `1px solid ${theme.palette.grey[700]}`, // Add border for better visibility
             borderBottom: "none",
            borderTopLeftRadius: '10px', // Top-left corner not rounded
            borderTopRightRadius: '10px', // Top-right corner not rounded
            borderBottomLeftRadius: '0', // Bottom-left corner rounded
            borderBottomRightRadius: '0', // Bottom-right corner rounded
            overflow: 'hidden', // Ensure overflow is hidden to hide rounded corners

          }}
        
         backgroundColor= { colors.primary[600]} height={50}  > 
           
            
           <RowChildrenAlignLeft > 
           <Typography m={2} > {title} </Typography>
           </RowChildrenAlignLeft> 
           
       </Box>


         </div>

    )
}
export default DataGridHeader;