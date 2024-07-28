



import { useState } from "react";
 import { BrowserRouter as Router,
   Routes, Route  } from "react-router-dom";


import Topbar from "./scenes/global/Topbar.jsx";
 
import ChainSelection from  "./scenes/chainSelection/index.jsx"; 
import DebugPage from "./scenes/DebugPage/index.jsx";
import ClaimWulies from "./scenes/ClaimWuliesERC1155/index.jsx";
import ClaimWuliesERC721 from "./scenes/ClaimWuliesERC721/index.jsx";
//import ClaimLayerDropERC1155 from "./scenes/ClaimLayerDropERC1155/index.jsx";
 
//import AllLayerGrid from "./scenes/allLayerGrid/index.jsx";
import AllLayerImage from "./scenes/allLayerImage/index.jsx";
import ComposedCharacter from "./components/ComposedCharacter.jsx";   


 import Form from "./scenes/form/index.jsx";
  
  
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
// import { UserProvider } from './context/UserContext.js';    user_disabled
import { AllLayersProvider }  from './context/AllLayerAvailableContext.js';
import { NotificationProvider }  from './context/NotificationContext.js'; 
import { DropTimeProvider }  from './context/DropTimeContext.js'; 
  import ImageSelector from "./components/ImageSelector.jsx";
  
//web 3 market plce component:
//import './App.css';
import NavBar from "./components/FARMER/NavBar.jsx";
import FarmerPage from "./scenes/farmerPage/index.jsx";
import Sell from "./scenes/sell/index.jsx";

import Shop from"./scenes/shop/index.jsx";
    
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Sepolia, Base } from "@thirdweb-dev/chains"; // PolygonZkevmTestnet

import { ChakraProvider } from "@chakra-ui/react";
import {   PACK_ADDRESS } from "./const/addresses.ts";

import { addressesByNetWork } from "./scenes/chainSelection/index.jsx";

import { GetChain } from "./data/API.js";



import ChainContext from "./context/Chain.js";
import { useEffect } from "react";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);


  const [selectedChain, setSelectedChain] = useState("base");// "sepolia"
  



  /*
  useEffect(() => {
    const fetchDefaultChain = async () => {
      try {
        const response = await GetChain()
        const data = await response.json();
        setSelectedChain(data.defaultChain);
      } catch (error) {
        console.error('Error fetching default chain:', error);
      }
    };

    fetchDefaultChain();
  }, []);
*/
  
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
 
      <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
       <ThirdwebProvider activeChain={ selectedChain === "sepolia" ? Sepolia : Base }>
      <ChakraProvider>  
       
         <DropTimeProvider>
         <NotificationProvider>
   
         <AllLayersProvider>
            


   
        <ColorModeContext.Provider value={colorMode}>
         <ThemeProvider theme={theme}>
           <CssBaseline />
           <div className="app">  
       
             <main 
               className="content"
            >
               <Topbar setIsSidebar={setIsSidebar} />
   
             {/* <Router> */}
               <Routes>
                

               
                 
                 <Route path="/farmerPage" element={<FarmerPage/>} />
               
             
                 <Route path="/"                       element={
                   <AllListingsProvider  NFT_CONTRACT={  addressesByNetWork[selectedChain].LAYER_ADDRESS     } >
                      <AllLayerImage />
                  </AllListingsProvider>
                    
                 }/>
                 <Route path="/shop/:NFT_CONTRACT"      element={ 
                    <AllListingsProvider  NFT_CONTRACT={ addressesByNetWork[selectedChain].LAYER_ADDRESS } >
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
                      <AllListingsProvider  NFT_CONTRACT={ addressesByNetWork[selectedChain].LAYER_ADDRESS } >
                       <TokenPageByID/>
                     </AllListingsProvider>
                    } />
                 
   
                 {/* this is more like a personal profil tab .. */}

                
 
 
                 {/* 
                      <Route path="/profileWallet/:address" element={<ProfileWallet/>} />
                     <Route path="/profileWallet/:initialTabIndex" element={<ProfileWallet/>} />
                     <Route path="/profileWallet/:address/:initialTabIndex" element={<ProfileWallet/>} />
                 
                */}


               <Route path="/claimWuliesERC721" element={<ClaimWuliesERC721/>}/>
               <Route path="/claimWulies" element={<ClaimWulies/>}/>
               {/* <Route path="/claimLayerDropERC1155" element={<ClaimLayerDropERC1155/>}/> */}

               
               <Route path="/chainSelection" element={<ChainSelection/>}/>
               <Route path="/debugPage" element={<DebugPage/>}/>
               <Route path="/profile/:address" element={<ProfileWallet/>}/>
                 
               <Route path="/allLayerImage" element={<AllLayerImage />} />
               <Route path="/form" element={<Form />} />
                  
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
       
       </ChakraProvider>
       </ThirdwebProvider>

        </ChainContext.Provider>
 
      );

   


   
}

export default App;
