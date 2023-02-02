import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "../../store/store";
import { getAppState,setIsReadyForStart } from "../../store/slices/app-slice";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import HeadComponent from "@/components/head";
import QuizHeader from "@/components/quiz/quiz-header";
import QuizMain from "@/components/quiz/quiz-main";
import Image from "next/image";
import { GetFromLocalStorage } from "@/utils/get-from-local-storage";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch()
  const { selectedCategory } = useSelector(getAppState);
  const categoryId: number | null = selectedCategory.categoryId;

  useEffect(() => {
    if (!GetFromLocalStorage("userName") || typeof categoryId !== "number") {
      router.push("/");
    }
    const timer = setTimeout(() => {
        dispatch(setIsReadyForStart(true))
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
          <HeadComponent title="Bilirim - Bilgi Yarışması" />
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        alt="quizbackground"
        fill
        src={"/assets/quizbackground.svg"}
        style={{ objectFit: "cover", objectPosition: "bottom", zIndex: "-2" }}

      />

      <Box sx={{ height: "90.8vh" }}>
        <QuizHeader />

        <Container>
          <QuizMain />
        </Container>
      </Box>
    </Box>
    </>
  );
}
