import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import { MainContent, Navigation } from "../components/SharedLayout";

const SharedLayout = () => {
  return (
    <Box>
      <Stack direction='row' spacing={4}>
        <MainContent>
          <Navigation />
          <Outlet />
        </MainContent>
      </Stack>
    </Box>
  );
};
export default SharedLayout;
