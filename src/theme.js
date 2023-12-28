import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles/index.js";


import Tooltip ,{ tooltipClasses }   from    '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
//import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
//https://uicolors.app/create
// this is to replicate the css styles found in styles module of Thridweb market v 3
export const styles = {

 
  largeImage: {  
 // Override default NFT renderer width
 width: '100% !important',
 height: '100% !important',
 borderRadius: 8,
 background: 'rgba(255, 255, 255, 0.04)',
 objectFit: 'cover'  
   
  }


}




export const infoHeight = "30px"; 
export const buttonStyle={
    colorBlue: 700, 

    discord:{ height : 50 },
    wallet:{ height : 50 }
}
export const text1 ={
  color:100,
  fontSize: 100
};  
export const text2 ={
  color:200,
  fontSize: 50
}; 

const _blueSelectedTab = "#0294fe";
export const  debugModeColor ="#872b3f";
 
// type: control + K the control + G to generate the shades
export const grayText = 100;
// color design tokens export
export const tokens = (mode) => ({

  // this sites allow you to find colors in  betwwen 2 colors
 //https://meyerweb.com/eric/tools/color-blend/#:::hex
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: { // for primary, we now the the daark grey palette instead
         
          // 100: "#d0d0d0",
          // 200: "#a1a1a1",
          // 300: "#727272",
          // 400: "#434343",
          // 500: "#141414",
          // 600: "#101010",
          // 700: "#0c0c0c",
          // 800: "#080808",
          // 900: "#040404"
          '50': '#98999a',
          '100': '#868788',
          '200': '#6a6b6c',
          '300': '#4a4a4a',
          '400': "#272828" ,//  '#2e2e2e',
          '500': '#1e1f1f',
          '600': '#1A1B1B', //'#0d0d0d',
          '700': '#161616', // #000000
          '800': '#111212', // #000000
          '900': '#0D0D0D', // #000000
          '950': '#000000',
 
        },
        /*
        primary: { // this was the bleuish color.. we do not want anymore
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
       */
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        // primary: {
        //   100: "#040509",
        //   200: "#080b12",
        //   300: "#0c101b",
        //   400: "#f2f0f0", // manually changed
        //   500: "#141b2d",
        //   600: "#1F2A40",
        //   700: "#727681",
        //   800: "#a1a4ab",
        //   900: "#d0d1d5",
        // },
        primary: {
          '50': '#ffffff',
          '100': '#ffffff',
          '200': '#eae9e6',
          '300': '#cdc9c1',
          '400': '#b3aca2',
          '500': '#a59c93',
          '600': '#95877e', 
          '700': '#83726d',
          '800': '#766965',
          '900': '#695a59',
          '950': '#4e4341',
        // '50': '#ffffff',
        // '100': '#ffffff',
        // '200': '#f3f1f2',
        // '300': '#d4cecf',
        // '400': '#aea2a3',
        // '500': '#978787',
        // '600': '#867574',
        // '700': '#786a68',
        // '800': '#6d625f',
        // '900': '#655b58',
        // '950': '#393432',
      },

        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
      }),

   
});









export const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
    ))(({ theme }) => ({

      
     [`& .${tooltipClasses.arrow}`]: {
      color:  tokens(theme.palette.mode).primary[600],
     },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: tokens(theme.palette.mode).primary[600],
  
       color:   tokens(theme.palette.mode).grey[300],  
      fontSize: 14,
      fontWeight: 400,
      padding: theme.spacing(1.3), // Adjust the padding as needed
    },
  }));




  export const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor:  tokens(theme.palette.mode).primary[600], 
      color:  tokens(theme.palette.mode).primary[100], 
      fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
      
      borderRadius : "8px",
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
       border: '2px solid  rgba(150, 150, 150, 0.2)',
    },
  }));


export function basicRoundedBox1( address , theme){

  let sx;

  sx = address ?  
    { 
     borderRadius: 4,
     backgroundColor: tokens(theme.palette.mode).primary[400],
   
      // border: `2px dashed ${theme.palette.blueSelectedTab}` 
    }:{
      borderRadius: 4,
      //  backgroundColor: colors.primary[400]
          border: `2px dashed ${ _blueSelectedTab }` 
        };

    return sx;

}
  

export const allCSS = (mode , _width, _margin) => {
  const colors = tokens(mode);
 
  
  const outline = {
    light : colors.primary[500],
    dark  : colors.primary[400]
  };
  const text1={
    light : colors.grey[500],
    dark  : colors.grey[400]
  }; 


   return {
   // HtmlTooltip,
    BootstrapTooltip,

     taskSelection: {
             
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
      
     },



     infoBox: { 
        
       backgroundColor :  colors.primary[500], 
       width : `${_width}`,
       height : "30px",
     //  margin :"5px",
        
       // center with flex, there is a method to center without flex as well, (relative/absolute technic)
       //https://www.w3schools.com/howto/howto_css_center-vertical.asp
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
   
       fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
       color: colors.primary[100],
      
       '& span': {
        color: _blueSelectedTab ,
         } ,

       '& .MuiButtonBase-root': {
          textTransform: 'none',
          fontSize: "10px",
          fontWeight: "400px",
       },


       '&:not(.hover)': { 
        outline: `1px solid ${mode === "dark" ? outline.dark : outline.light }`, 
        // transform: "translate3d(0px, 0px, 0px)",
       // backgroundColor :  colors.primary[500], 
         WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
         transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms" 
         
      },
      '&:hover': {
        cursor: "pointer",
       // transform: "translate3d(0px, -4px, 0px)",
        outline: `1px solid ${ _blueSelectedTab }`, 
      //  backgroundColor :  colors.primary[400], 
        WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
        transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms",
      //  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
        
      } ,
     
 





     
        borderRadius: "3px",
        outline: `1px solid ${  colors.primary[400] }`  
    },

    nftContainer:{
     
      
      width: `${_width}`,
      margin: `${_margin}`, // "8px",

      outline: `1px solid ${mode === "dark" ? outline.dark : outline.light }`, 
      borderRadius: "8px",
      flexDirection: "column",
      padding: "8px",
      maxHeight: "382px",
      position: "relative",
      overflow: "hidden",
     
      backfaceVisibility: "hidden",
      backgroundColor :  `${ colors.primary[500]}`, 
     
      display: "flex",
      
      '&:not(.hover)': { 
         transform: "translate3d(0px, 0px, 0px)",
         WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
         transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms" 
        
      },
      '&:hover': {
        cursor: "pointer",
        transform: "translate3d(0px, -4px, 0px)",
      
        WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
        transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
        
      } 
      
  
    },

    cardBack:{


    }

   }
}

// mui theme settings
export const themeSettings = (mode) => {

  const colors = tokens(mode);

  const outline = {
    light : colors.primary[500],
    dark  : colors.primary[400]
  };
  const text1={
    light : colors.grey[500],
    dark  : colors.grey[400]
  }; 

 
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main:  colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
            cancelIconColor: colors.grey[600], 
            blueSelectedTab : _blueSelectedTab, //blue from thirdweb marketpalce

            nftImage:colors.primary[400],
            nftContainer: colors.primary[400],
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[200],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default:  colors.primary[300],// "#fcfcfc",  // "#fcfcfc",
            },
            cancelIconColor: colors.grey[600],
            blueSelectedTab :_blueSelectedTab, //blue from thirdweb marketpalce

            nftImage:colors.primary[400],
            nftContainer: colors.primary[500],
          })
 
    },

   
    
    nftContainer:{
     
      
        width: "17.8%",
        margin: "8px",
        position: "relative",
        overflow: "hidden",
        borderRadius: "8px",
        outline: `1px solid ${mode === "dark" ? outline.dark : outline.light }`, 
        backfaceVisibility: "hidden",
        
       
        display: "flex",
        flexDirection: "column",
        padding: "8px",
        maxHeight: "382px",
  
  
        '&:not(.hover)': { 
           transform: "translate3d(0px, 0px, 0px)",
           WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
           transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms" 
           
        },
        '&:hover': {
          cursor: "pointer",
          transform: "translate3d(0px, -4px, 0px)",
        
          WebkitTransition: "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
          transition:       "all 500ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" 
          
        } 
        
    
    },
 
 // from home.module
    pack:{  
       nftCard: {
        padding: "8px",
        borderRadius: "10px",
        margin: "10px",
       // border: "black",
       outline: `1px solid ${mode === "dark" ? outline.dark : outline.light }`,  
      },
      myCardInfo: { 
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      },
       //.myCardInfo p (in css)
      myCardInfo_p:{
        color:  colors.grey[300], //"#333",
        fontSize: "12px", fontWeight: "500",
        border: `${mode === "dark" ? outline.dark : outline.light} solid 2px`, 
        padding: "5px",
        borderRadius: "10px",
      },
      name:{

        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxWidth: "100%",
        color: colors.grey[300],// `${mode === "dark" ? outline.dark : outline.light} solid 2px`,   // looks good >> "#615F5C",      
        fontFamily: "inherit",
        verticalAlign: "inherit",
        fontSize: "15px",
        lineHeight: "22px",
        fontWeight: "700",
        //margin: "0px",
        margin: "20px 0 20px 0",
        
       }
       
    },
      

    basicRoundedBox1:{

        borderRadius: 4 ,
        backgroundColor: colors.primary[400]  
    },
  

    web3Button1 :{

      
      fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
     // color: colors.primary[600],
       
     // '&:not(.hover)': { backgroundColor: `${colors.greenAccent[400]}`},
     '&:hover': { backgroundColor: `${colors.greenAccent[200]}`},

      backgroundColor: `${colors.greenAccent[200]}`
    },

    tabsStyle:{ 
         fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),


      
      '& .MuiButtonBase-root': {
         textTransform: 'none',
         fontSize: "0.9rem",
         fontWeight: "600px",
         minWidth:"30px", // if you set it to higher number... it spread on whole whidth , looks cool too.
         padding:"19px 15px" // shorthand for : "19px 15px 19px 15px"

      },
      '& .MuiTabs-indicator': {
         backgroundColor: _blueSelectedTab,  // colors.primary[600] 
         WebkitTransition: "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms", 
         transition:       "all 1000ms cubic-bezier(0.05, 0.82, 0.14, 0.95) 0ms"
     },    
   },

      
    tabStyle:{
      
      '&:not(.hover)': { color: `${colors.primary[100]}`},
      '&:hover': { color: `${colors.primary[50]}`},
      '&.Mui-selected': { color: `${  _blueSelectedTab }`},
    } ,
 
     title: {
       fontSize: 24,//32, 
       fontWeight: 700,
       color: colors.grey[200],
       fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
  
       // marginTop: "40px",
       m:  "30px 0 15px 8px " ,  // my top and bottom
        
   },
   titleDescription: {
    color: colors.grey[300],
     fontSize: 16,     
     fontWeight: 400,
     fontFamily:  ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),

     m:  "0  0 15px 8px " ,  // my top and bottom
     
     
   },
 
    // they were all:  "Source Sans Pro", "sans-serif" 
    typography: {  
      fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: [ "Inter", "Helvetica", "Arial", "sans-serif" ].join(","),
        fontSize: 40,
 
      },
      h2: {
        fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
          fontSize: 24,
     
      },
      h4: {
        fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "Helvetica", "Arial", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};



export function DataGridStyle(theme , colors){
  const sx={ 
    "& .MuiDataGrid-root": {
     // border: "none",
      //borderTop: "none",
      // border: '1px solid #ddd', // Add border for better visibility
       border: `1px solid ${theme.palette.grey[700]}`, // Add border for better visibility
      borderTopLeftRadius: '0', // Top-left corner not rounded
      borderTopRightRadius: '0', // Top-right corner not rounded
      borderBottomLeftRadius: '10px', // Bottom-left corner rounded
      borderBottomRightRadius: '10px', // Bottom-right corner rounded
      overflow: 'hidden', // Ensure overflow is hidden to hide rounded corners

    },
    "& .MuiDataGrid-cell": {
     // borderBottom: "none",
    },
    

    "& .MuiDataGrid-cellContent": {
      fontSize:14,
    },
    "& .name-column--cell": {
      color: colors.grey[200],
    },
    "& .MuiDataGrid-columnHeaders": {
       
      backgroundColor: colors.primary[600],
     // borderBottom: "none",
    },
    "& .MuiDataGrid-virtualScroller": {
      // that is color of each row
      backgroundColor: colors.primary[500],
    },

    "& .MuiDataGrid-footerContainer": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
     //  borderTop: "none",
      backgroundColor: colors.primary[600],   
    //  minHeight :"20px" // default is 52, see chrome element inspector
    },
    // .MuiToolbar-root MuiToolbar-gutters MuiToolbar-regular, , .css-78c6dr-MuiToolbar-root-MuiTablePagination-toolba
    "& .MuiTablePagination-toolbar, .MuiDataGrid-footerContainer": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
      
      minHeight :"10px" // default is 52, see chrome element inspector
    },
    // the area where it is written "row per page"| block 1 page out of X page
    
    "& .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows ": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
      marginBottom :"0px" ,marginTop :"0px"  // these affect pagination bar heights
      //marginBottom :"5px" ,marginTop :"5px"  // these affect pagination bar heights
    },
    // to go to next pagination page
    "& .MuiButtonBase-root ": { // class="MuiDataGrid-footerContainer css-n830jf-MuiDataGrid-footerContainer
      paddingBottom :"0px" ,paddingTop :"0px"  // initial was 8 (affect pagination bar height)
     
    },
     //  MuiTablePagination-select MuiSelect-standard MuiInputBase-input
     "& .MuiSelect-select": {
      paddingBottom :"0px" ,paddingTop :"0px"  // initial was 8 (affect pagination bar height)
     },
     "& .css-pwwg96": {
      marginTop :"0px"  // initial was 40 (affect distance with title)
     },
   
    "& .MuiCheckbox-root": {
      color: `${colors.greenAccent[200]} !important`,
    },
    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
      color: `${colors.grey[100]} !important`,
    },
  };

return sx;

}
