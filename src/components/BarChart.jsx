import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as dataX } from "../data/mockData";
import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//const BarChart = ({ isDashboard = false }) => {
    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
const BarChartHoriz = ({ isDashboard = false }) => {
  const theme = useTheme();
   const colors = tokens(theme.palette.mode);
 //https://nivo.rocks/bar/
  return (
     
    <ResponsiveContainer width="100%" height={600}>
  <BarChart
    width={500}
    height={800}
    data={data}
    layout="vertical" 
    margin={{
      top: 5,
      right: 30,
      left: 20,
      bottom: 5,
    }}
  >
    {/* <CartesianGrid strokeDasharray="3 3" /> */}
    <XAxis type="number" dataKey="pv" /> {/* Set the dataKey to the field you want on the vertical axis */}
    <YAxis dataKey="name" tickline={false} type="category" width={100} /> {/* Set the dataKey to the field you want on the horizontal axis */}
    <Tooltip />
    <Legend />

    {/* <Bar dataKey="pv" fill={colors.blueAccent[600]} background={{ fill: colors.blueAccent[700] }} />
    <Bar dataKey="uv" fill="#82ca9d" /> */}
   
   {/* background={{ fill: colors.blueAccent[700] }} */}
     <Bar dataKey="pv" stackId="a" fill={colors.blueAccent[600]} barSize={20} />     
     <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={20} />  

    {/* <Bar dataKey="pv" stackId="a" fill="#8884d8" barSize={20} />
    <Bar dataKey="uv" stackId="a" fill="#82ca9d" barSize={20} /> */}

  </BarChart>
</ResponsiveContainer>


  );
};

export default BarChartHoriz;
