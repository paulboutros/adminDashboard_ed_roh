


import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { tokens } from "../theme";
import {  GetfilteredImages } from "./popup";
import { useEffect, useState } from "react";

 // data Model for Legenda s example
 /*
     const legendItems = [
        { color: colors.blueAccent[400], label: 'Label 1' },
        { color: colors.blueAccent[500], label: 'Label 2' },
        { color: colors.greenAccent[400], label: 'Label 3' },
        { color: colors.greenAccent[500], label: 'Label 4' }
        // Add more legend items as needed
      ];
 */


// const CustomLegend = ({ legendItems  ,  orientation = 'vertical'   }) => (
//     <Box>
//        {legendItems.map((item, index) => (
//     <Box
//       key={index}
//       sx={{ marginLeft: '20px'  }}
//       display="flex"
//       justifyContent="flex-start"
//       alignItems="center"
//       height="100%"
       
//     >
//       <Box sx={{ width: 15, height: 10, backgroundColor: item.color }}></Box>
//       <Typography variant="h6"  sx={{ marginLeft: '5px' }} color={item.color}>   {item.label} </Typography>
//     </Box>
//   ))}
//     </Box>
//   );

const CustomLegend = ({ legendItems, orientation = 'vertical' }) => (
    <Box  
     
    sx={orientation === 'vertical' ? {
       
        justifyContent: 'flex-start',
        alignItems: 'center',
 
        } : {

        
         display: 'flex',
         justifyContent: 'flex-start',
         alignItems: 'center',
          height: '100%',
   
        // margin: orientation === 'vertical' ? '0 0 5px 0' : '0 20px'
         margin: orientation === 'vertical' ? '0 0 5px 0' : '0 20px'



        }
        
        } 
    
      
      >
      {legendItems.map((item, index) => (
        <Box
          key={index}
          sx={{ marginLeft: '20px' }}
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                height="100%"
        >
          <Box sx={{ width: 15, height: 10, backgroundColor: item.color }}></Box>
          <Typography variant="h6" sx={{ marginLeft: '5px' }} color={item.color}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );


  export default CustomLegend;



  export function CustomLegend2 ( { legendItems, selectedImages,  orientation = 'vertical'  } ){ 
     
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


     
    const [ filteredImages, setFilteredImages] = useState();
    
    useEffect(() => {
      if (!selectedImages )return;


      let temp = GetfilteredImages(selectedImages);

      setFilteredImages(temp);
      
    }, [ selectedImages ]);

     return  (
    <Box  sx={     {marginRight:"10px"} } > 



      {
      
      filteredImages && (

      Object.keys(filteredImages).map((key, index) => (
      // {selectedImages .map((item, index) => (
        <Box
           key={index}
          sx={{ marginLeft: '20px' }} display="flex" justifyContent="flex-start" alignItems="center" height="100%"
         >
          {/* <Box sx={{ width: 15, height: 10, backgroundColor: item.color }}></Box> */}
            
                <Box
                    // variant="h6"
                    sx={{
                      width :"150px",
                      display: 'flex',justifyContent: 'space-between',  color: colors.grey[500]
                     }}
                  >
                    <span>  {filteredImages[key][0].name}</span>
                    <span>  [{filteredImages[key][0].tokenID}] : {filteredImages[key][0].owning}   </span>
                     
                  </Box>
 



        </Box>
      ))

      )
      
      
      }



    </Box>
  );
}
/*

        const knData = selectedImages["kn"][0];
        const heData = selectedImages["he"][0];
        const shData = selectedImages["sh"][0];
        const weData = selectedImages["we"][0];
        const beData = selectedImages["be"][0];
 */
 
  