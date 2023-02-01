import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import RetryDialog from "./retry-dialog";
import { useSelector, useDispatch } from "../../store/store";
import { getAppState, setRetry } from "../../store/slices/app-slice";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { GetFromLocalStorage } from "@/utils/get-from-local-storage";
interface PostTypes {
  score: number;
  name: string | null;
  date: string;
  category: number | null;
}

function CountdownTimer({ duration }: { duration: number }) {
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [timeOver, setTimeOver] = useState<boolean>(false);
  const date: string = new Date().toLocaleDateString("tr-TR");
  const { score, retry, selectedCategory } = useSelector(getAppState);
  const dispatch = useDispatch();
  const quizDataForPostDatabase: PostTypes = {
    score: score,
    name: GetFromLocalStorage("userName"),
    date: date,
    category: selectedCategory.categoryId,
  };
  useEffect(() => {
    setTimeLeft(30);
    const intervalId = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft === 0) {
          setTimeOver(true);
          clearInterval(intervalId);
          return 0;
        }
        return timeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [retry]);
  useEffect(() => {
    if (timeOver) {
      dispatch(setRetry(true));

      const ref = collection(db, "topscore");
      addDoc(ref, {
        ...quizDataForPostDatabase,
      });

      setTimeOver(false);
    }
  }, [timeOver]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ position: "relative" }}>
        <RetryDialog />
        <Box className="timer" />
        <Image src="assets/timer.svg" alt="timer" width={80} height={80} />
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
          {timeLeft}
        </Typography>
      </Box>
    </Box>
  );
}

export default CountdownTimer;
