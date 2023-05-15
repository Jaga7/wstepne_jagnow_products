import { Box } from "@mui/material";

const MainContent = ({ children }) => {
  return (
    <Box
      p={2}
      justifyContent='center'
      alignItems='center'
      display='flex'
      width='100%'
      maxWirdht='800px'
      flexDirection='column'
    >
      {children}
    </Box>
  );
};

export default MainContent;
