import React from "react";
import ScoreTable from "./score-table";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import BackgroundAnimation from "@/animations/background-animation";
type Props = {};

export default function ScoreWrapper({}: Props) {
  return (
    <Box
      sx={{
        position: "relative",
        marginY: 5,
        background: "#1C77FF",
        paddingY: 5,
        paddingX: 4,
        borderRadius: 10,
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      }}
      border="2px solid whitesmoke"
    >
      <Typography
        fontSize={26}
        color="white"
        fontWeight="bold"
        component="h5"
        marginY={1}
      >
        Liderlik Tablosu 👑
      </Typography>
      <BackgroundAnimation />

      <ScoreTable />
    </Box>
  );
}
