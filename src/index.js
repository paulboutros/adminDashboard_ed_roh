
 import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.js";
 import { BrowserRouter } from "react-router-dom";

 const queryClient = new QueryClient() 

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QueryClientProvider client={queryClient}>
  <React.StrictMode>
      <BrowserRouter>
      <App />
    </BrowserRouter>
   </React.StrictMode>
    </QueryClientProvider>
);
