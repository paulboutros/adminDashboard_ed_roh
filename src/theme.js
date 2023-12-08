import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles/index.js";


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
// type: control + K the control + G to generate the shades
export const grayText = 100;
// color design tokens export
export const tokens = (mode) => ({
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
          '600': '#0d0d0d',
          '700': '#000000',
          '800': '#000000',
          '900': '#000000',
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

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
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
            blueSelectedTab :"#0294fe", //blue from thirdweb marketpalce
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
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
          })

          
          
    },
    
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
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
