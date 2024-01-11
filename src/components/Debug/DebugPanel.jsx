import React from 'react';
import Typography from '@mui/material/Typography';
import { HtmlTooltip } from "../../theme.js";
import { Box, Button, Tooltip, useTheme } from '@mui/material';
import { useAddress } from "@thirdweb-dev/react";
import { emit_guildMemberAdd, emit_guildMemberRemove, getSDK_fromPrivateKey, myDiscordInvite, setWallet } from '../../data/API.js';
import { useUserContext } from '../../context/UserContext.js';
import { Discord_tokenLess_stakinContract } from '../../const/addresses.ts';
import { useDebugModeContext } from '../../context/DebugModeContext.js';
import { ServerButton } from '../Buttons/buttons.jsx';
import { useDiscordInviteContext } from '../../context/DiscordInviteContext.js';
import { useNotificationContext } from '../../context/NotificationContext.js';
import { ethers } from 'ethers';

export function DebugPanel({ DISTstakedAmount, setDISTAmount }) {


  const address = useAddress();
  const { notification, setNotification } = useNotificationContext();
  const { discordInvite, setDiscordInvite } = useDiscordInviteContext();
  const { debugMode } = useDebugModeContext();
  const { user, setUser } = useUserContext();
  const theme = useTheme();
 
  async function disconnectWalletDiscord() {

    const nullAdress = null;

    const result = await setWallet(user, nullAdress);
    /*
   When working with React state,
    it's important to note that React relies on
     shallow comparisons to determine whether the state has changed
     To properly trigger the useEffect when a property inside the user object changes,
     you should create a new object with the updated property. Here's how you can do it:
   */
    const modifUser = { ...user, wallet: nullAdress };

    setUser(modifUser);

  }

  async function checkCondition () {

    const sdk = getSDK_fromPrivateKey();
    const dist_tokenLessContract = await sdk.getContract(Discord_tokenLess_stakinContract);

    const getStakeInfo = await dist_tokenLessContract.call("getStakeInfo", [address]);

    const _rewards = parseInt(getStakeInfo._rewards._hex, 16);
    let tokenStaked = parseInt(getStakeInfo._tokensStaked._hex, 16);
    tokenStaked = (+ethers.utils.formatEther(getStakeInfo[0])).toFixed(0);

    let result = { tokenStaked: tokenStaked, _rewards: _rewards };

    console.log("tokenStaked = ", tokenStaked, "tokenStakedBeforeClicking    ", DISTstakedAmount);

    // be extremely careful that "tokenStaked" and "tokenStakedBeforeClicking"
    // are formatted teh same way so comparason is accurate
    if (tokenStaked !== DISTstakedAmount) {
      // onConditionMet( result );
      return result; // true;
    } else {
      return null; //false;
    }

  }
    
  


  return (
    <>
      {debugMode && (
        <>

          <Tooltip title={"disconnect, as if user did not completed this task"}>
            <Button variant="contained"
              sx={{ backgroundColor: theme.debugModeColor }}
              onClick={() => disconnectWalletDiscord()}>
              {"[X]"}
            </Button>
          </Tooltip>


          {/* ====================================================================================== */}
          <HtmlTooltip //open={true} 

            title={<React.Fragment>

              <Typography fontSize={"15px"}>{"Simulate a join Server using your invite code"}</Typography>

              <Box>
                <p> - In real, this event is called by Discord server when someone join using your invite code </p>
                <p> - this simulates a Discord join event with this invite code </p>
                <p> - then increase the stakedAmount on invites stacking smart contract </p>
                <p> - this can not and will not modify the real Discord invite uses! </p>
              </Box>
            </React.Fragment>}
          >



          </HtmlTooltip>

          {/* ====================================================================================== */}


          {user?.wallet === address ? (
            <>
              <ServerButton
               
                action={() => emit_guildMemberAdd(user, discordInvite?.invite)}
 
                onConditionMet={async (result) => {
                  console.log("onConditionMetXXXXXXXXXX  result", result);

                  setDISTAmount(result.tokenStaked);

                  let discordInvite_response = await myDiscordInvite(user.ID);
                  setDiscordInvite(discordInvite_response);

                  console.log("onConditionMetXXXXXXXXXX  discordInvite_response", discordInvite_response);

                }}

                checkCondition = { checkCondition }
                
                width="200px"
              >
                Add Invitee
              </ServerButton>

              <ServerButton
               // user={user}
             //   discordInvite={discordInvite}
               
                action={() => {
                  // pick whoever is the first member pretends that is the one who leave the server
                  const mock_leavingrMember_ID = discordInvite?.acceptedUsers[0];
                  emit_guildMemberRemove(mock_leavingrMember_ID, discordInvite?.invite); // /emit/guildMemberRemove
                }}

                onConditionMet={async (result) => {
                 console.log("onConditionMet={async (result) =>", result);

                  setDISTAmount(result.tokenStaked);

                  let discordInvite_response = await myDiscordInvite(user.ID);
                  setDiscordInvite(discordInvite_response);

                  console.log("let discordInvite_response = await myDiscordInvite(user.ID", discordInvite_response);

                }}

                checkCondition =  { checkCondition } 
                width="200px"
              >
                remove Invitee
              </ServerButton>
            </>
          ) : (
 
            <p>Some debug button not available. Please use wallet saved on Serer</p>
          )}




        </>
      )}



    </>



  );


}
