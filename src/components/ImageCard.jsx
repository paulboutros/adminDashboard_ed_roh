
import {useEffect, useState} from "react";

import { Box } from "@mui/material";
 
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';          // Update this import
import Card from '@mui/material/Card';          // Update this import
import CardMedia from '@mui/material/CardMedia'; // Update this import

function ImageCard({ image, title, extraInfo }) {
    return (
      <Card>
        <CardMedia
          component="img"
          alt={title}
          height="200"
          image={image}
        />
        <CardContent>
          <h2>{title}</h2>
          <p>{extraInfo}</p>
        </CardContent>
      </Card>
    );
  }
  
  export default ImageCard;