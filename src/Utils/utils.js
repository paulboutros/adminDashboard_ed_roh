 
 
export const getBackgroundColor = (debugMode, color) => {
    return debugMode ? color : color;
};



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



 