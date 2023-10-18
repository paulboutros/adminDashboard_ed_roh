import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import {useEffect, useState} from "react";
import { globalData , bestEarner , userEarning } from "../data/API.js";

import { useUserContext } from '../context/UserContext.js'; // to get user data from context provider

//import { mockPieData as data } from "../data/mockData";

import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';


//import { Paper, Typography } from "@mui/material";
 
/*
let data = [
  { value: 5, label: 'A' },
  { value: 10, label: 'B' },
  { value: 15, label: 'C' },
  { value: 20, label: 'D' },
];
*/

const size = {
  width: 400,
  height: 200,
};

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) { //: { children: React.ReactNode }
 


  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel() {

  async function  GetData(){
// the first time the oage loads, user may not be defined(wait for auth)
// once defined the function will be re run from Use Effet (user dependency)
    if ( !user) return;
    const endpoint_disc =
    `${process.env.REACT_APP_API_URL}getSocialData?source=twitter&source=discord&userId=${user.ID}&limit=1`; // make it specific (filter to twitter fields)
    const response  = await fetch(endpoint_disc);
    const result = await response.json();
    console.log(JSON.stringify(result, null, 2));

   // console.log(">>>>>>>>>>>>..result    "   +  result   );
    const Fetchdata = [
      { value: result[0].message, label: 'discord messages' },
      { value: result[0].invite_use, label: 'invite use' },
      { value: result[0].like, label: 'Twitter Likes' },
      { value: result[0].retweet, label: 'Twitter retweets' },
    ];
/*
"total": 24,
        "invite_code": "",
        "message": 30,
        "invite_sent": 41,
        "invite_use": 24,
        "fake_invite": 0,
        "discord_score": 0,
        "like": 20,
        "retweet": 19,

*/
    
    setGlobalData(Fetchdata );
   


   


  } 

  const { user } = useUserContext();
   
  const [data, setGlobalData] = useState(); // Set rowData to Array of Objects, one Object per Row
  useEffect(()=>{
     GetData();
  
  }, [ user  ]);
  


  return (

    <div>
    {data ? ( 
    <PieChart series={[{ data, innerRadius: 80 }]} {...size}>
      <PieCenterLabel>Center label</PieCenterLabel>
    </PieChart>
    ) : (
      <div>User is not defined.</div>
    )}
</div>



  );
}
