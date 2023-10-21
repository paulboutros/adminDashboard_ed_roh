
// one click data
export const interractions = {

    button: "Button1",
    pageSource: "Homepage",
    time: "2023-10-16 14:30:15",
}

// one document for one user
export const trackingMap = {
  ID: "ID", 
  
  interractions: [ ], // list of click data
   
// More users and their interactions
};
export function Create_interraction(  _button,  _pageSource,_time  ){
   
    const inter = {  _button,  _pageSource,_time  };
    return inter;
 

}
