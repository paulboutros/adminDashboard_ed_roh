export const taskBadge ={

    discordAndWalletRegistration:0,
    appLinkInvite:1,
    guildMember_index:2,
    invite_index:3


}

export const listingStatus ={
    CREATED:   1,
    COMPLETED: 2,
    CANCELLED: 3,  
    ACTIVE:    4,
    EXPIRED:   5 
 }
function GetListingStatus(listingData){
  
    if (!listingData){return ""; }
      
    switch (listingData.status ){
      case 1: return "CREATED"; // created, maybe if it is listing for a future date.. it is created but not active
      case 2: return "COMPLETED";  
      case 3: return "CANCELLED";  
      case 4: return "ACTIVE"; // that one can be bought  
      case 5: return "EXPIRED"; 
     default: return "ERROR";  
    }
   
  }