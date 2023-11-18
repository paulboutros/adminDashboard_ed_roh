 

export const getBackgroundColor = (debugMode, color) => {
    return debugMode ? color : color;
};


export  function addressShortened( addressText){
   return `${addressText.slice(0, 6)}...${addressText.slice(-4)}`;


}
export function formatTimestampToCustomFormat(timestamp) {
    const date = new Date(timestamp);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Month is zero-based
    const year = date.getUTCFullYear() % 100; // Two-digit year
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
  
    const formattedDate = `${month}/${day}/${year} ${hours}H${minutes}`;
  
    return formattedDate;
  }

  export function formatMilliseconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    const daysText = days > 0 ? `${days}d ` : '';
    const hoursText = hours % 24 > 0 ? `${hours % 24}h ` : '';
    const minutesText = minutes % 60 > 0 ? `${minutes % 60}m ` : '';
    const secondsText = seconds % 60 > 0 ? `${seconds % 60}s` : '';
  
    return `${daysText}${hoursText}${minutesText}${secondsText}`;
  }





  

export function CopyToClipboard(  copyText ) {
  
  console.log( " >>>>>>>>>>>>>.   copyText"  , copyText );
    // This is the function we wrote earlier
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {

      
      copyTextToClipboard(copyText)
        // .then(() => {
        
        //    setTimeout(() => {
        //    }, 1500);
        // })
        // .catch((err) => {
        //   console.log(err);
        // })
        ;
         
        


    }

    handleCopyClick();
  
     
  }

    

    


   


 