import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import {useEffect, useState} from "react";
import { tokens } from "../theme";
 
//import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//const BarChart = ({ isDashboard = false }) => {
    const dataX = [
        {
          walletShort: 'Page A',
          invite_use: 400,
          twitterScore: 240,
          amt: 240,
        },
        {
          walletShort: 'Page B',
          invite_use: 300,
          twitterScore: 139,
          amt: 221,
        },
        {
          walletShort: 'Page C',
          invite_use: 200,
          twitterScore: 980,
          amt: 229,
        },
        {
          walletShort: 'Page D',
          invite_use: 278,
          twitterScore: 390,
          amt: 200,
        },
        {
          walletShort: 'Page E',
          invite_use: 189,
          twitterScore: 480,
          amt: 218,
        },
        {
          walletShort: 'Page F',
          invite_use: 239,
          twitterScore: 380,
          amt: 250,
        },
        {
          walletShort: 'Page G',
          invite_use: 349,
          twitterScore: 430,
          amt: 210,
        },
      ];
const BarChartHoriz = ({ isDashboard = false }) => {
  const theme = useTheme();
   const colors = tokens(theme.palette.mode);


   const [data, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
   useEffect(()=>{
     (async ()=> {

      const limit = !isDashboard?10:8;
       //const getData_enpPoint = API_URL + "getData";
       const endpoint_disc =
       `${process.env.REACT_APP_API_URL}getSocialData?source=twitter&source=discord&limit=${limit}`; // make it specific (filter to twitter fields)
       const result_disc  = await fetch(endpoint_disc);
       const discord_json = await result_disc.json();
       
 
      
      setRowData(discord_json );
   console.log( "data   = "  + data);
      })();
   
   }, [ ]);


   const chartHeight = !isDashboard ? 500:230;
  const _barSize= !isDashboard ? 15:12;
  const _fontSize = !isDashboard ? 14:12;
  const x_fontSize = !isDashboard ? 14:8;
 //https://nivo.rocks/bar/
  return (
     
    <ResponsiveContainer width="90%" height={chartHeight}>
    {data ? (
  <BarChart
    width={500}
    height={chartHeight}
    
    data={data}
    layout="vertical" 
    barCategoryGap = {5}
    
     margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    
      
   
   
      {/* <CartesianGrid strokeDasharray="3 3" />   */}
    <XAxis type="number" dataKey="socialScore"
     tickLine ={false}
      axisLine={{ stroke: colors.grey[100]  }}  
      tick={{ dx: 0, fontSize: x_fontSize, fill: colors.greenAccent[100] ,fontWeight:"100" }}
      /> {/* Set the dataKey to the field you want on the vertical axis */}
    <YAxis dataKey="walletShort"  type="category" width={100} 
      tickLine ={false}  axisLine={{ stroke: colors.grey[100]}}
      //style={ { fontSize: _fontSize , color: colors.greenAccent[200] ,fontWeight:"bold" }}
    tick={{ dx: -20, fontSize: _fontSize, fill: colors.greenAccent[100] ,fontWeight:"200" }} //  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
      
    /> {/* Set the dataKey to the field you want on the horizontal axis */}
    <Tooltip />
    {/* <Legend/> */}
    <Legend verticalAlign="middle" layout="vertical" align="right" />
   
   
   {/* background={{ fill: colors.blueAccent[700] }} */}
     {/*   */}

     <Bar dataKey="retweet" stackId="a" fill={colors.blueAccent[500]} barSize={ _barSize} /> 
     <Bar dataKey="like" stackId="a" fill={colors.blueAccent[600]} barSize={_barSize} /> 
       
     <Bar dataKey="message" stackId="a" fill={colors.greenAccent[600]} barSize={_barSize} />
     <Bar dataKey="invite_use" stackId="a" fill={colors.greenAccent[700]} barSize={_barSize} />

     {/* <Bar dataKey="socialScore" stackId="b" fill={colors.greenAccent[700]} barSize={10} />    */}

    {/* <Bar dataKey="twitterScore"   fill="#8884d8" barSize={20} />
    <Bar dataKey="invite_use"   fill="#82ca9d" barSize={20} /> */}
       


  </BarChart>
   ) : ( <div>Loading...</div>    )}
</ResponsiveContainer>


  );
};

export default BarChartHoriz;
