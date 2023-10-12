import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import {useEffect, useState} from "react";
import { tokens } from "../theme";
 
//import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//const BarChart = ({ isDashboard = false }) => {
    const dataX = [
        {
          wallet: 'Page A',
          invite_use: 400,
          twitterScore: 240,
          amt: 240,
        },
        {
          wallet: 'Page B',
          invite_use: 300,
          twitterScore: 139,
          amt: 221,
        },
        {
          wallet: 'Page C',
          invite_use: 200,
          twitterScore: 980,
          amt: 229,
        },
        {
          wallet: 'Page D',
          invite_use: 278,
          twitterScore: 390,
          amt: 200,
        },
        {
          wallet: 'Page E',
          invite_use: 189,
          twitterScore: 480,
          amt: 218,
        },
        {
          wallet: 'Page F',
          invite_use: 239,
          twitterScore: 380,
          amt: 250,
        },
        {
          wallet: 'Page G',
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
       //const getData_enpPoint = API_URL + "getData";
       const endpoint = `${process.env.REACT_APP_API_URL}getData`; // make it specific (filter to twitter fields)
       const result  = await fetch(endpoint);
      //const result  = await fetch("/api/findUsersWithNonZeroProperties");
      const resultsJson = await result.json();
       
      
      setRowData(resultsJson );
   console.log( "data   = "  + data);
      })();
   
   }, [ ]);


   const chartHeight = !isDashboard ? 800:250;
  const _barSize= !isDashboard ? 20:10;
 //https://nivo.rocks/bar/
  return (
     
    <ResponsiveContainer width="100%" height={chartHeight}>
    {data ? (
  <BarChart
    width={500}
    height={800}
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
    
      
   

    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis type="number" dataKey="socialScore" /> {/* Set the dataKey to the field you want on the vertical axis */}
    <YAxis dataKey="wallet"  type="category" width={100} /> {/* Set the dataKey to the field you want on the horizontal axis */}
    <Tooltip />
    <Legend />

   
   
   {/* background={{ fill: colors.blueAccent[700] }} */}
     {/*   */}

     <Bar dataKey="twitter_retweet" stackId="a" fill={colors.blueAccent[500]} barSize={ _barSize} /> 
     <Bar dataKey="twitter_like" stackId="a" fill={colors.blueAccent[600]} barSize={_barSize} /> 
       
     <Bar dataKey="discord_message" stackId="a" fill={colors.greenAccent[600]} barSize={_barSize} />
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
