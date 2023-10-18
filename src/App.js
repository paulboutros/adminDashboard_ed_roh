import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";
import Team from "./scenes/team/index.jsx";

import Profile from "./scenes/profile/index.jsx";
import Invoices from "./scenes/invoices/index.jsx";
import AllLayerGrid from "./scenes/allLayerGrid/index.jsx";
import AllLayerImage from "./scenes/allLayerImage/index.jsx";
 
import Bar from  "./scenes/bar/index.jsx";
import Form from "./scenes/form/index.jsx";
import Line from "./scenes/line/index.jsx";
import Pie from "./scenes/pie/index.jsx";
import FAQ from "./scenes/faq/index.jsx";
import Geography from "./scenes/geography/index.jsx";

// provider
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme.js";
import { UserProvider } from './context/UserContext.js';

import Calendar from "./scenes/calendar/calendar.jsx";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (

    <UserProvider>
     <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/team" element={<Team/>} />
              <Route path="/allLayerGrid" element={<AllLayerGrid />} />
              <Route path="/allLayerImage" element={<AllLayerImage />} />
              
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
              
            </Routes>
          </main>
        </div>
      </ThemeProvider>
     </ColorModeContext.Provider>
    </UserProvider>

  );
}

export default App;
