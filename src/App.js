import { useState } from "react";
 import { BrowserRouter as Router,
   Routes, Route  } from "react-router-dom";


import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
 
import DiscordBoard from "./scenes/discordBoard/index.jsx";

 import TwitterBoard from "./scenes/twitterBoard/index.jsx";
//import AllLayerGrid from "./scenes/allLayerGrid/index.jsx";
import AllLayerImage from "./scenes/allLayerImage/index.jsx";
 
import Bar from  "./scenes/bar/index.jsx";
import Form from "./scenes/form/index.jsx";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie/index.jsx";
import FAQ from "./scenes/faq/index.jsx";
 
import MyPacks from "./scenes/myPacks/index.jsx";
import Maintenance  from "./scenes/maintenance/index.jsx";
 
import TokenPage from "./scenes/tokenPage/index.jsx";
import TokenPageByID from "./scenes/tokenPageByID/index.jsx";

import ProfileWallet from "./scenes/profileWallet/index.jsx";
 
// provider
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";





// Context
import { AllListingsProvider } from "./context/AllListingContext.js";
import { UserProvider } from './context/UserContext.js';
import { AllLayersProvider }  from './context/AllLayerAvailableContext.js';
import { NotificationProvider }  from './context/NotificationContext.js'; 
import { DropTimeProvider }  from './context/DropTimeContext.js'; 
import { DiscordProvider }  from './context/DiscordContext.js';

import { AppLinkProvider }from './context/AppLinkContext.js'; 
import { DiscordInviteProvider } from "./context/DiscordInviteContext.js";

import { DebugModeProvider } from "./context/DebugModeContext.js";


 
  
//web 3 market plce component:
//import './App.css';
import NavBar from "./components/FARMER/NavBar.jsx";
import FarmerPage from "./scenes/farmerPage/index.jsx";
import Sell from "./scenes/sell/index.jsx";

import Shop from"./scenes/shop/index.jsx";
    
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia } from "@thirdweb-dev/chains"; // PolygonZkevmTestnet

import { ChakraProvider } from "@chakra-ui/react";
import { TOOLS_ADDRESS, PACK_ADDRESS } from "./const/addresses.ts";
import { DISTProvider } from "./context/DISTstakingContext.js";


 
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

const testThirdWeb = true;
  if ( testThirdWeb === true  ){

    return (  
     
      <ThirdwebProvider  activeChain={Sepolia} clientId={process.env.REACT_APP_THIRDWEB_CLIENT_ID} >
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
            <DISTProvider>
           <DebugModeProvider>

        <DiscordInviteProvider> 
        <AppLinkProvider>
   
      <DropTimeProvider>
      <NotificationProvider>

     <AllLayersProvider>
        {/* <AllListingsProvider>   */}

     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />

          {/* <Router> */}
            <Routes>
              
             
               
              
              <Route path="/farmerPage" element={<FarmerPage/>} />
            
          
              <Route path="/"                       element={
                <AllListingsProvider  NFT_CONTRACT={TOOLS_ADDRESS} >
                   <AllLayerImage />
               </AllListingsProvider>
                 
              }/>
              <Route path="/shop/:NFT_CONTRACT"      element={ 
                 <AllListingsProvider  NFT_CONTRACT={TOOLS_ADDRESS} >
                     <Shop key="1" itemType={"nfts"} />
                 </AllListingsProvider>
               }/>    
              <Route path="/shopPack/:NFT_CONTRACT"  element={
                 <AllListingsProvider  NFT_CONTRACT={PACK_ADDRESS} >  
                    <Shop key="2" itemType={"packs"} />
                </AllListingsProvider>  
              }/> 

               
           
                <Route path="/sell" element={<Sell/>} />
                 <Route path="/token/:contractAddress/:tokenId" element={<TokenPage/>} />
                 <Route path="/tokenByListingID/:contractAddress/:tokenId/:listingId/:auctionId" element={
                   <AllListingsProvider  NFT_CONTRACT={TOOLS_ADDRESS} >
                    <TokenPageByID/>
                  </AllListingsProvider>
                 } />
              

              {/* this is more like a personal profil tab .. */}
              <Route path="/profileWallet/:initialTabIndex" element={<ProfileWallet/>} />
              <Route path="/profileWallet/:address" element={<ProfileWallet/>} />
              <Route path="/profileWallet/:address/:initialTabIndex" element={<ProfileWallet/>} />
              
            
               
              <Route path="/discordBoard" element={<DiscordBoard/>} />
             {/* <Route path="/allLayerGrid" element={<AllLayerGrid />} /> */}
              <Route path="/allLayerImage" element={<AllLayerImage />} />
              
              <Route path="/twitterBoard" element={<TwitterBoard />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              
              
              <Route path="/myPacks" element={<MyPacks/>} />
                
              
            </Routes>
         {/* </Router> */}


          </main>
        </div>
      </ThemeProvider>
     </ColorModeContext.Provider>

      {/* </AllListingsProvider>   */}
    </AllLayersProvider>


     </NotificationProvider>
     </DropTimeProvider>
     
     </AppLinkProvider> 
        </DiscordInviteProvider>
     
         </DebugModeProvider>

         </DISTProvider>
    </DiscordProvider>
       </UserProvider>
    </ChakraProvider>
    </ThirdwebProvider>
  

  ); 
}

export default App;
