import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Drawer } from "../components/Drawer";

export const Index = () => {
  useEffect(() => {}, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer />
      <Box style={{ width: `calc(100vw - 280px)` }}>
        <Box
          sx={{
            p: 2,
            display: "flex",
            color: "#4c4848",
          }}
        >
          <Box display="flex" sx={{ flexDirection: "column", width: "100%" }}>
            <h1>Dashboard</h1>
            <br />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
