import React, { useEffect } from "react";
import { useSelector } from "../../store/store";
import { getAppState } from "../../store/slices/app-slice";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import HeadComponent from "@/components/head";
import QuizHeader from "@/components/quiz/quiz-header";
import QuizMain from "@/components/quiz/quiz-main";
import Image from "next/image";
import { GetFromLocalStorage } from "@/utils/get-from-local-storage";
import { GetCategoryFromId } from "@/utils/get-category-from-id";
export default function index() {
  const router = useRouter();
  const { selectedCategory } = useSelector(getAppState);
  const categoryId: number | null = selectedCategory.categoryId;
  useEffect(() => {
    if (!GetFromLocalStorage("userName") || typeof categoryId !== "number") {
      router.push("/");
    }
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
