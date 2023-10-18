import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBoxEarn = ({ title,title2, subtitle,subtitle2, icon1, icon2, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 30px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon1}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100]  }}
          >
            {title  }
          </Typography>
        </Box>


        <Box>
          {icon2}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: colors.grey[100] }}
          >
            {title2}
          </Typography>
        </Box>

 

        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>








      <Box display="flex" justifyContent="space-between" mt="2px">

        <Typography variant="h5" sx={{ color: colors.greenAccent[500] }}>
          {subtitle}
        </Typography>

      
        <Typography variant="h5" sx={{ color: colors.greenAccent[500], marginLeft: "-40px" }}>
          {subtitle2}
        </Typography>

        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{ color: colors.greenAccent[600] }}
        >
          {increase}
        </Typography>


      </Box>
    </Box>
  );
};

export default StatBoxEarn;
