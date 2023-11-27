import { useState } from "react";
 import { BrowserRouter as Router,
   Routes, Route  } from "react-router-dom";


import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import DiscordBoard from "./scenes/discordBoard/index.jsx";

import Profile from "./scenes/profile/index.jsx";
import TwitterBoard from "./scenes/twitterBoard/index.jsx";
import AllLayerGrid from "./scenes/allLayerGrid/index.jsx";
import AllLayerImage from "./scenes/allLayerImage/index.jsx";
 
import Bar from  "./scenes/bar/index.jsx";
import Form from "./scenes/form/index.jsx";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie/index.jsx";
import FAQ from "./scenes/faq/index.jsx";
import Geography from "./scenes/geography/index.jsx";
import GetLayers from "./scenes/getLayers/index.jsx";
import Maintenance  from "./scenes/maintenance/index.jsx";
 
import TokenPage from "./scenes/tokenPage/index.jsx";
import TokenPageByID from "./scenes/tokenPageByID/index.jsx";

import ProfileWallet from "./scenes/profileWallet/index.jsx";


// provider
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";

 import { UserProvider } from './context/UserContext.js';
import { AllLayersProvider }  from './context/AllLayerAvailableContext.js';
import { NotificationProvider }  from './context/NotificationContext.js'; 
import { DropTimeProvider }  from './context/DropTimeContext.js'; 
import { DiscordProvider }  from './context/DiscordContext.js'; 
import { AppLinkProvider }from './context/AppLinkContext.js'; 

import Calendar from "./scenes/calendar/calendar.jsx";

 
//web 3 market plce component:
//import './App.css';
import NavBar from "./components/FARMER/NavBar.jsx";
import FarmerPage from "./scenes/farmerPage/index.jsx";
import Sell from "./scenes/sell/index.jsx";

import Shop from "./scenes/shop/index.tsx";



  
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains"; // PolygonZkevmTestnet

import { ChakraProvider } from "@chakra-ui/react";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

const testThirdWeb = false;
  if ( testThirdWeb === true  ){

    return (  
     
      <ThirdwebProvider 
      activeChain={Sepolia} 
      clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID}
      > 
      
      <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
      {/* <ChakraProvider> */}
         <NavBar/>  
      
         
        <Routes>
          <Route path="/" element={<FarmerPage/>} />
          <Route path="/shop" element={<Shop display_mode="list"/>} />
         </Routes>
      
     {/* </ChakraProvider> */}
  

    </ThemeProvider>
    </ColorModeContext.Provider>
    
    </ThirdwebProvider>
    
    )
  }










  
  if ( process.env.REACT_APP_MAINTENANCE === "true"  ){

    return (  
     
    
    <div className="app">
    
    <main className="content">
      
      <Routes>

      <Route path="/" element={<Maintenance />} />
      
        
      </Routes>
    </main>
  </div>

    
    
    
    )
  }
    

  return (


    <ThirdwebProvider activeChain={Sepolia}>
 <ChakraProvider>
       <UserProvider>

   <DiscordProvider>
    <AppLinkProvider>
   
      <DropTimeProvider>
      <NotificationProvider>

     <AllLayersProvider>

     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

          {/* <Router> */}
            <Routes>
              
              {/* <Route path="/" element={<AllLayerImage />} /> */}
               
              
              
            
              <Route path="/" element={<AllLayerImage />}/>
              {/* <Route path="/" element={<Marketplace />}/> */}
                 

              <Route path="/farmerPage" element={<FarmerPage/>} />
              {/* <Route path="/shop" element={<Shop display_mode="list"/>} /> */}
              <Route path="/shop" element={<Shop display_mode="grid"/>} />
              <Route path="/sell" element={<Sell/>} />
               
              <Route path="/token/:contractAddress/:tokenId" element={<TokenPage/>} />
              <Route path="/tokenByListingID/:contractAddress/:tokenId/:listingId/:auctionId" element={<TokenPageByID/>} />
              

              <Route path="/profileWallet/:address" element={<ProfileWallet/>} />

               
              <Route path="/profile" element={<Profile/>} />
              <Route path="/discordBoard" element={<DiscordBoard/>} />
              <Route path="/allLayerGrid" element={<AllLayerGrid />} />
              <Route path="/allLayerImage" element={<AllLayerImage />} />
              
              <Route path="/twitterBoard" element={<TwitterBoard />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
               <Route path="/getLayers" element={<GetLayers />} />
                
              
            </Routes>
         {/* </Router> */}


          </main>
        </div>
      </ThemeProvider>
     </ColorModeContext.Provider>

     </AllLayersProvider>


     </NotificationProvider>
     </DropTimeProvider>
     
     </AppLinkProvider>
  </DiscordProvider>
       </UserProvider>
    </ChakraProvider>
    </ThirdwebProvider>
  

  ); 
}

export default App;
