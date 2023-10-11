// DataFetchingComponent.js
import React, { useEffect, useState } from 'react';

const DataFetchingComponent = ({ onDataFetched }) => {
  useEffect(() => {
    // Fetch data and store it in the state
    const fetchData = async () => {

        const endpoint = `${process.env.REACT_APP_API_URL}getData`;
      const response = await fetch(endpoint);
      const data = await response.json();
      onDataFetched(data);
    };

    fetchData();
  }, [onDataFetched]);

  return <div>Loading data...</div>;
};

export default DataFetchingComponent;
