import React, { useEffect, useRef, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CountdownTimer from "./countdown";
import Image from "next/image";
import { getAppState } from "../../store/slices/app-slice";
import { useSelector } from "../../store/store";
import { DynamicScoreMessages } from "@/utils/dynamic-score-messages";
import { GetCategoryFromId } from "@/utils/get-category-from-id";
type Props = {};

export default function QuizHeader({}: Props) {
  const { score, isLastChoiseTrueOrFalse, selectedCategory } =
    useSelector(getAppState);
  const [dynamicMessage, setDynamicMessage] = useState<string>("");
  const [duration, setDuration] = useState<number>(30);
  const scoreRef = useRef<HTMLImageElement>(null);
  const firstUpdate = useRef<boolean>(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    } else {
      scoreRef?.current?.classList.add("rotate-horizontally");
      const timeout = setTimeout(() => {
        scoreRef?.current?.classList.remove("rotate-horizontally");

        return () => clearTimeout(timeout);
      }, 1000);
    }
  });
  useEffect(() => {
    setDynamicMessage(DynamicScoreMessages(isLastChoiseTrueOrFalse));
  }, [isLastChoiseTrueOrFalse]);
  return (
    <Box
      sx={{
        height: "162px",

        borderBottomLeftRadius: "25px",
        borderBottomRightRadius: "25px",
        boxShadow: " rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
    >
      <Grid container sx={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ position: "relative" }}>
              <Image
                src="/assets/coins.png"
                alt="timer"
                ref={scoreRef}
                width={80}
                height={80}
                style={{
                  boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  borderRadius: 40,
                }}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                background: "#28D2E4",
                borderRadius: 5,
                display: "flex",
                justifyContent: "center",
                boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                border: "2px solid white",
              }}
            >
              <Typography
                color="white"
                letterSpacing="1px"
                fontWeight="bold"
                component="span"
              >
                {score}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: 50,
              background: "#28D2E4",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              border: "2px solid white",
            }}
          >
            <Typography
              color="white"
              sx={{ fontSize: { lg: 16, xs: 13 } }}
              letterSpacing="1px"
              component="h5"
            >
              {dynamicMessage
                ? dynamicMessage
                : GetCategoryFromId(
                    selectedCategory.categoryId !== null
                      ? selectedCategory.categoryId
                      : -1
                  )}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CountdownTimer duration={duration} />
        </Grid>
      </Grid>
    </Box>
  );
}
