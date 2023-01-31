import React, { useEffect, useState, useMemo } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Choises from "./choises";
import Question from "./question";
import Questions from "../../questions/questions.json";
import { useSelector } from "../../store/store";
import { getAppState } from "../../store/slices/app-slice";

import Image from "next/image";

type Props = {};
export type QuestionTypes = {
  id: number;
  categoryId: number;
  question: string;
  choises: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  trueAnswer: string;
};

export default function QuizMain({}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState<null | QuestionTypes>(
    null
  );
  const { selectedCategory, retry } = useSelector(getAppState);
  const QuestionsJson: QuestionTypes[] = Questions;
  const [filteredQuestion, setFilteredQuestion] = useState<any>();
  const [skipQuestionCounter, setSkipQuestionCounter] = useState<number>(2);
  const [isSkipButtonDisabled, setIsSkipButtonDisabled] =
    useState<boolean>(false);
  useMemo(() => {
    const shuffle = () : QuestionTypes[] => {
      let currentIndex = QuestionsJson.length,
        randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [QuestionsJson[currentIndex], QuestionsJson[randomIndex]] = [
          QuestionsJson[randomIndex],
          QuestionsJson[currentIndex],
        ];
      }
      return QuestionsJson;
    };
    setFilteredQuestion(
      shuffle().filter(
        (question : QuestionTypes) => question.categoryId === selectedCategory.categoryId
      )
    );
  }, [retry]);

  useEffect(() => {
    if (retry) {
      setCurrentQuestionIndex(0);
      setSkipQuestionCounter(2);
      setCurrentQuestion(filteredQuestion[currentQuestionIndex]);
    } else {
      setCurrentQuestion(filteredQuestion[currentQuestionIndex]);
    }
  }, [retry, currentQuestionIndex]);
  const skipQuestion = () : void => {
    if (skipQuestionCounter !== 0) {
      setSkipQuestionCounter((prev: number) => prev - 1);
      setCurrentQuestionIndex((prev: number) => prev + 1);
    } else return;
  };

  return (
    <Box sx={{ height: "80%", marginTop: 5 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          position: "relative",
        }}
      >
        <Box
          className={
            skipQuestionCounter !== 0 ? "skip-question" : "skip-question-hidden"
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Image
              onClick={() => {
                !isSkipButtonDisabled && skipQuestion();
              }}
              alt="skip"
              src="/assets/skip.svg"
              width={40}
              height={40}
              style={{ cursor: "pointer" }}
            />
          </Box>
        </Box>
      </Box>
      <Question currentQuestion={currentQuestion} />
      <Choises
        currentData={currentQuestion}
        setCurrentQuestionIndex={setCurrentQuestionIndex}
        setIsSkipButtonDisabled={setIsSkipButtonDisabled}
      />
    </Box>
  );
}
