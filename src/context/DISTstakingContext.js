import {createContext, useContext,    useState, useEffect } from "react";
import {   getSDK_fromPrivateKey  } from "../data/API.js";
 import { useAddress, useContract } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Discord_tokenLess_stakinContract } from "../const/addresses.ts";

export const DISTStakeInfo ="DISTStakeInfo";
export const DISTStakeInfoGeneral ="DISTStakeInfoGeneral";

 

const DISTContext = createContext();

export function useDISTContext() {
  return useContext(DISTContext);
}


export function DISTProvider({ children }) {



    const { contract: dist_tokenLessContract, isLoading: loading_dist_tokenLess } = useContract( Discord_tokenLess_stakinContract );
    
  //contract no staker specific data
  const [DISTStakeInfoGeneral, setDISTStakeInfoGeneral] = useState(null); 

    const [distStakedAmount, setDISTStakedAmount] = useState(0);
    const [distReward, setDISTReward] = useState(0);
 

    const [reFetch, setReFetch] = useState( true );
 
    const address = useAddress();
  
   const fetchDataStakeInfo = async ( ) => {
 
    try {
      
      let res;
        const sdk = getSDK_fromPrivateKey();  
        const dist_tokenLessContract = await sdk.getContract(   Discord_tokenLess_stakinContract  );
        const getStakeInfo = await dist_tokenLessContract.call("getStakeInfo",[ address]);
 
     // addDataToUser(DISTStakeInfo , getStakeInfo );

       const _rewards    =  (+ethers.utils.formatEther(getStakeInfo[1])).toFixed(4);  //unary to convert in number (+variable)
       const tokenStaked =  (+ethers.utils.formatEther(getStakeInfo[0])).toFixed(0);
    
      setDISTStakedAmount( tokenStaked );
      setDISTReward( _rewards );

      console.log(  "context fetchDataStakeInfo   >>>> tokenStaked >>>  = " , tokenStaked , "_rewards ", _rewards  , "address", address);
      res = { tokenStaked :tokenStaked , _rewards:_rewards };
      return res;

    } catch (error) {
      console.error('Error  fetchDa taStakeInfo   :', error.message);
      throw error;
    }
    
   } 
 

    useEffect(() => {
        let isMounted = true;

        console.log(" 111 DIST context    address=: "  ,   address   ,  " 111 reFetch   = "  , reFetch    );


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
  
            setDISTStakeInfoGeneral(DISTStakeInfoGeneral , generalInfo );
           
            
   
         }
        fetchData();
     
      }, [    loading_dist_tokenLess   ]);
 
 
 



  
    return (
 
      <DISTContext.Provider value={{ 
        distStakedAmount, setDISTStakedAmount, 
        distReward, setDISTReward,
        reFetch, setReFetch,

        DISTStakeInfoGeneral
         }}>
        {children}
      </DISTContext.Provider>
    );
  }
  