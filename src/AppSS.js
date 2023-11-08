 
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { Goerli } from "@thirdweb-dev/chains"; // PolygonZkevmTestnet
 
import NavBar from "../components/FARMER/NavBar";

import FarmerPage from "./scenes/farmerPage/index.jsx";

import { Routes, Route  } from "react-router-dom";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
// const activeChain = "PolygonZkevmTestnet";

function MyApp({ Component, pageProps } ) {
   

  return (  
     
    <ThirdwebProvider activeChain={Goerli}> 
      
     
       
    <NavBar/>
    <div className="app">
    
    <main className="content">
      
      <Routes>

      <Route path="/" element={<FarmerPage />} />
      
        
      </Routes>
    </main>
  </div>
   </ThirdwebProvider>
    
    
    
    );













}

 


export default MyApp;
