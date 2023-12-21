import React, { useState, useMemo } from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import Tooltip from '@mui/material/Tooltip';
import { allCSS, tokens } from '../theme';
import { useTheme } from '@emotion/react';

const tooltipClasses = {}; // Replace with your actual tooltipClasses object

const BootstrapTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
      ))(({ theme }) => ({
       [`& .${tooltipClasses.arrow}`]: {
        color: 'red',
       },
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'red',
        fontSize: 50,
        padding: theme.spacing(1.2), // Adjust the padding as needed
      },
    }));


const CustomTooltip = styled(Tooltip)(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: 'red', // Adjust the color as needed
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: 'red',
      fontSize: 11,
      padding: theme.spacing(1.2), // Adjust the padding as needed
    },
  }));

const MyComponent = () => {

    const theme = useTheme();
  const colors = tokens(theme.palette.mode);


 // const { BootstrapTooltip   } = allCSS(theme.palette.mode   );  
   


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    const iconButton = event.currentTarget;
    if (iconButton && document.body.contains(iconButton)) {
      setAnchorEl(iconButton);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = useMemo(
    () => [
      <MenuItem key="item1" onClick={handleClose}>Item 1</MenuItem>,
      <MenuItem key="item2" onClick={handleClose}>Item 2</MenuItem>,
      <MenuItem key="item3" onClick={handleClose}>Item 3</MenuItem>,
    ],
    [handleClose]
  );

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <BootstrapTooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={anchorEl ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </BootstrapTooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {columns}
      </Menu>
    </React.Fragment>
  );
};

export default MyComponent;
