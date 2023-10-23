


import { Box, Typography } from "@mui/material";

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