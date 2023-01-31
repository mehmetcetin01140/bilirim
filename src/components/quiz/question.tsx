import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import { QuestionTypes } from "./quiz-main";

export default function Question({
  currentQuestion,
}: {
  currentQuestion: QuestionTypes | null;
}) {
  return (
    <Box
      sx={{
        height: 200,
        background: "#fafafa",
        paddingX: "10%",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        boxShadow:
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
      }}
    >
      <Typography
        fontSize={18}
        sx={{ display: "inline-block", textAlign: "center" }}
      >
        {currentQuestion?.question}
      </Typography>
    </Box>
  );
}
