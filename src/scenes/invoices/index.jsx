import { Box, Typography, useTheme } from "@mui/material";
 
import { tokens } from "../../theme";
 
import Header from "../../components/Header";
import GridTwitter from "../../components/GridTwitter"

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => (
        <Typography color={colors.greenAccent[500]}>
          ${params.row.cost}
        </Typography>
      ),
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Twitter Board" subtitle="Data and Score for Twitter activity" />
      <Box m="40px 0 0 0" height="75vh">
    
        <GridTwitter/>
      </Box>
    </Box>
  );
};

export default Invoices;
