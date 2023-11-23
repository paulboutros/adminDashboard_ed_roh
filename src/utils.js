 

export const getBackgroundColor = (debugMode, color) => {
    return debugMode ? color : color;
};


export  function addressShortened( addressText){

  if(!addressText){return "no adress"; }

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
 

  export function hexToReadableTimestamp(hexTimestamp, short = false) {
    // Convert hex to decimal
    const decimalTimestamp = parseInt(hexTimestamp, 16);
  
    // Create a Date object using the decimal timestamp (milliseconds since epoch)
    const date = new Date(decimalTimestamp * 1000);
  
    // Format the date as a string
    let readableTimestamp = date.toLocaleString(); // Adjust the format as needed
  
  if (short){
    readableTimestamp = date.toLocaleTimeString([], { timeStyle: 'short' });
  }

    return readableTimestamp;
  }
  
  export function hexToDaysAgo(hexTimestamp) {
    // Convert hex to decimal
    const decimalTimestamp = parseInt(hexTimestamp, 16);
  
    // Create a Date object using the decimal timestamp (milliseconds since epoch)
    const date = new Date(decimalTimestamp * 1000);
  
    // Calculate the difference in milliseconds between the current time and the provided timestamp
    const differenceInMilliseconds = Date.now() - date.getTime();
  
    // Convert milliseconds to days
    const daysAgo = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
  
    if (daysAgo === 0 ){
      return "Today at "+ hexToReadableTimestamp(hexTimestamp ,true );
    }

     return `${daysAgo} days ago`
    return daysAgo;
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



  export function convertSecondsToDateString(endTimeInSeconds) {
    // Convert seconds to milliseconds
    const endTimeInMilliseconds = endTimeInSeconds * 1000;
  
    // Create a Date object using the milliseconds
    const date = new Date(endTimeInMilliseconds);
  
    // Format the date
    const options = {
      month: 'long', // Specify the full month name
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true, // Use 12-hour clock format
    };
  
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    return formattedDate;
  }
  
  // Example usage
  //const endTimeInSeconds = 1679790700; // Replace with your actual seconds value
   
  
  //console.log(formattedDateString); // Output: November 22, 2023 at 3:45 PM
  

    

    


   


 