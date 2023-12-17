import * as React from 'react';
 
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
 
 
 


export default function SpeedDialTooltipOpen(  ) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const actions = [
    { icon: <FileCopyIcon /> , name: 'Copy' , callBack: () => { 
       console.log("  copy icon !!!");
       handleClose();
     
      }},
    { icon: <SaveIcon />     , name: 'Save',callBack: () => { 
        handleClose(); 
      }},
    { icon: <PrintIcon />    , name: 'Print',callBack: () => { 
        handleClose(); 
      }},
    { icon: <ShareIcon />    , name: 'Share',callBack: () => {  
       handleClose(); 
      }},
  ];


  return (
    <>   
       {/* Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }} */}
      <Backdrop open={open} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ 
          position: 'absolute',
          display: 'inline-block',
          overflow: 'visible', // Allow content to overflow
          zIndex: 1000, // Adjust the z-index based on your needs
          top: 0,//"50%",
          left:0,// "50%",
         
          
          // we want to make the button is invisible
           '& .MuiButtonBase-root.MuiFab-root.MuiSpeedDial-fab': {
                color:'transparent', // hide the cross,
              backgroundColor :'transparent', // color of the round buttom
              boxShadow: 'none',
           },
          
            
          
          }}
        //  src= "https://via.placeholder.com/250x100?text=hello"
         icon=  {<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
 
 
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={action.callBack}
          />
        ))}
 
 {/* <CopyToClipboard copyText={referralData.shareableLink}  backgroundColor={colors.primary[400]}  textColor={colors.greenAccent[400]}
                            /> */}

      </SpeedDial>
    </>
  );
}


