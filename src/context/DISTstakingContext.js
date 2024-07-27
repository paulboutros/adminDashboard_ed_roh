import {createContext, useContext,    useState, useEffect } from "react";
import {   getSDK_fromPrivateKey  } from "../data/API.js";
 import { useAddress, useContract, useContractRead } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Discord_tokenLess_stakinContract } from "../const/addresses.ts";



//=======
import ChainContext from "../context/Chain.js";
import { addressesByNetWork } from "../scenes/chainSelection/index.jsx";
//const { selectedChain, setSelectedChain } = useContext(ChainContext);
//addressesByNetWork[selectedChain].LAYER_ADDRESS
//=======


export const DISTStakeInfo ="DISTStakeInfo";
export const DISTStakeInfoGeneral ="DISTStakeInfoGeneral";

let startTime;
let myInterval;

const DISTContext = createContext();

export function useDISTContext() {
  return useContext(DISTContext);
}


export function DISTProvider({ children }) {

  const { selectedChain } = useContext(ChainContext);
  const [timeRemaining, setTimeRemaining] = useState(1000);
  const address = useAddress();

    const { contract: dist_tokenLessContract, isLoading: loading_dist_tokenLess } = useContract( Discord_tokenLess_stakinContract );
    

   //const { contract: stakeContract }                                              = useContract(Discord_tokenLess_stakinContract,"custom");
   const { data: stakersVar,  isLoading: loadingstakers, } = useContractRead( dist_tokenLessContract , "stakers", [address] );

  //contract no staker specific data
    const [DISTStakeInfoGeneral, setDISTStakeInfoGeneral] = useState(null); 

    const [distStakedAmount, setDISTStakedAmount] = useState(0);
    const [distReward, setDISTReward] = useState(0);
     const [ stakeInfo, setStakeInfo] = useState(null);

   const [ stakeGetTimeUnit , setStakeGetTimeUnit ] = useState(null);


    const [reFetch, setReFetch] = useState( true );
 
    
  
   const fetchDataStakeInfo = async ( ) => {
 
    try {
      
      let res;
        const sdk = getSDK_fromPrivateKey(selectedChain);  
        const dist_tokenLessContract = await sdk.getContract(   Discord_tokenLess_stakinContract  );
        const stake_Info = await dist_tokenLessContract.call("getStakeInfo",[ address]);
 
        setStakeInfo( stake_Info  );
 
       const _rewards    =  (+ethers.utils.formatEther(stake_Info[1])).toFixed(4);  //unary to convert in number (+variable)
       const tokenStaked =  (+ethers.utils.formatEther(stake_Info[0])).toFixed(0);
    
      setDISTStakedAmount( tokenStaked );
      setDISTReward( _rewards );

     // console.log(  "context fetchDataStakeInfo   >>>> tokenStaked >>>  = " , tokenStaked , "_rewards ", _rewards  , "address", address);
      res = { tokenStaked :tokenStaked , _rewards:_rewards };
      return res;

    } catch (error) {
      console.error('Error  fetchDa taStakeInfo   :', error.message);
      throw error;
    }
    
   } 
 

  
   useEffect(() => {
    if (!stakeGetTimeUnit || !stakersVar)return;
   
      if (!stakeInfo) return;
      if (stakeInfo[0] === 0) return;
    
       if (myInterval) {  clearInterval(myInterval);}
     
       
      
    myInterval = setInterval( ( ) => {

     //  console.log(" stakersVar  ================= " , stakersVar.timeOfLastUpdate._hex );
      
     // timestamp time IN SECOND = time of update - time in second since //January 1, 1970, 00:00:00 UTC
           const  timeOfLastUpdate = parseInt(   stakersVar.timeOfLastUpdate._hex );
           // Assuming startTime is the timestamp of the past start time in seconds

              startTime = timeOfLastUpdate;// 2000;// in second
          //    console.log(  ">>> Hard coded startTime   =  "  , startTime);

              const timeOfLastUpdate_date = new Date( (timeOfLastUpdate *1000));
               
            //  console.log(  ">>> real startTime  =",(timeOfLastUpdate  ) ,"  ", timeOfLastUpdate_date.toLocaleString());

              // Assuming eventInterval is the time interval between events in seconds
              const eventInterval = parseInt(  stakeGetTimeUnit._hex , 16);
              
              


            //  console.log(  ">>> eventInterval  =  "  , eventInterval);
              // Assuming currentTime is the current timestamp in seconds
              const currentTime = Date.now() / 1000;
               // Calculate the elapsed time since the start time
              const elapsedTime = currentTime - startTime;
               // Calculate the time remaining for the next event
                 const timeRemainingTemp = eventInterval - (elapsedTime % eventInterval);

                // this will update the smart cotnract

                
                 if ( timeRemainingTemp < 1){
                    // refetchStakeInfo();

                       // set refesh can not be inside use effect or it would only work when component is rendered/visible
                     setReFetch(true);
                 }
                
                 setTimeRemaining(timeRemainingTemp);
            //  console.log(`Time remaining for the next event: ${timeRemainingTemp} seconds`);


    
    },  (  1000)     ); // update the counter every seconds
       
      
    }, [  stakeGetTimeUnit, stakersVar ]);
   





    useEffect(() => {

      if (!address)return;

        let isMounted = true;
       
       // console.log(" 111 DIST context    address=: "  ,   address   ,  " 111 reFetch   = "  , reFetch    );


        const fetchData = async () => {
          try {
            // Your code here
      
            if (reFetch) {
              await fetchDataStakeInfo();
              
              if (isMounted) {
                // Update the state only if the component is still mounted
                 setReFetch(false);
              }
            }
          } catch (error) {
            // Handle errors if needed
          }
        };
      
        fetchData();
      
        return () => {
          // Cleanup function
          isMounted = false;
        };
    }, [address, reFetch ]);
     
    useEffect(() => {
        setReFetch(true);
    }, [ address  ]);     

   // Below, same staking contract, but general variable not related to individual stakers
    //====================================================

    useEffect(()=>{
       
        if (  loading_dist_tokenLess ) return;
        const fetchData = async ( ) => {
  
           // the following data is not related to the staker, they are general info about the contract
           // therefore, they need to be loaded ONLY ONCE  (unlike getStakeInfo for example)
            const ratioInfo = await dist_tokenLessContract.call("getRewardRatio_Over"); 
            const timeUnit = await dist_tokenLessContract.call("getTimeUnit_Over"); 
            setStakeGetTimeUnit(timeUnit);
           
            // so let us consider this to be the initial balance only  
            const Initialbalance = await dist_tokenLessContract.call("TEST_getBalance");
           // console.log( "PPPPPPP   balance   " , Initialbalance );
  
           const  InitialbalanceRes  = (+ethers.utils.formatEther(  Initialbalance._hex     )).toFixed(1);
            const generalInfo ={
              _denominator: parseInt(  ratioInfo._denominator._hex , 16),
              _numerator: parseInt(  ratioInfo._numerator._hex , 16),
               timeUnit: parseInt(  timeUnit._hex , 16),
               initialBalance:  InitialbalanceRes
  
            }
            //console.log( ">>>      generalInfo   " , generalInfo );
  
            setDISTStakeInfoGeneral(   generalInfo );
           // setDISTStakeInfoGeneral(DISTStakeInfoGeneral , generalInfo );
           
            
   
         }
        fetchData();
     
      }, [    loading_dist_tokenLess   ]);
 
 
 



  
    return (
 
      <DISTContext.Provider value={{ 
        distStakedAmount, setDISTStakedAmount, 
        distReward, setDISTReward,
        reFetch, setReFetch,
        stakeInfo, setStakeInfo,
        stakersVar,
          //  general info 
        DISTStakeInfoGeneral,
        stakeGetTimeUnit,

        timeRemaining
         }}>
        {children}
      </DISTContext.Provider>
    );
  }
  