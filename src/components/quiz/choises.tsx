import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import type { QuestionTypes } from "./quiz-main";
import {
  getAppState,
  setScore,
  setLastChoise,
} from "../../store/slices/app-slice";
import { useSelector, useDispatch } from "../../store/store";

type Props = {
  currentData: QuestionTypes | null;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsSkipButtonDisabled :  React.Dispatch<React.SetStateAction<boolean>>;
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fafafa",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  borderRadius: 10,
}));

export default function Choises({
  currentData,
  setCurrentQuestionIndex,
  setIsSkipButtonDisabled
  
}: Props) {
  const [indexForStyle, setIndexForStyle] = useState<number>(-1);
  const [areButtonsDisabled, setAreButtonsDisabled] = useState<boolean>(false);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<boolean | null>();
  const currentDataObjectKeys : string[] = Object.keys(currentData?.choises || {})
  const { score,retry } = useSelector(getAppState);
  const dispatch = useDispatch();

  const isAnswerTrue = (answer: string, i: number) => {
    setAreButtonsDisabled(true);
    setIsSkipButtonDisabled(true)
    setIndexForStyle(i);
    
    const checkIsTrue = currentData?.trueAnswer === answer;
    if (checkIsTrue) {
      setIsCorrectAnswer(true);
      dispatch(setLastChoise(true));
      dispatch(setScore(score + 100));
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setAreButtonsDisabled(false);
        setIsSkipButtonDisabled(false)
      }, 1000);
    } else {
      setIsCorrectAnswer(false);
      dispatch(setLastChoise(false));
      dispatch(setScore(score - 100));
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
        setIsSkipButtonDisabled(false)
        setAreButtonsDisabled(false);
      }, 1000);
    }
  };
  React.useEffect(() => {
    setIndexForStyle(-1);
    setIsCorrectAnswer(null);
   
  }, [currentData,retry]);

  return (
    <Box sx={{ width: "100%", marginTop: 8 }}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, md: 4 }}>
        {Object.values(currentData?.choises || {}).map(
          (choice: string, i: number) => (
            <Grid item xs={6} key={i}>
              <Item
                className={`choises-button ${
                  indexForStyle === i && isCorrectAnswer === true
                    ? "true-answer"
                    : indexForStyle === i && isCorrectAnswer === false
                    ? "wrong-answer"
                    : ""
                } ${
                  currentDataObjectKeys[i] ==
                    currentData?.trueAnswer && areButtonsDisabled
                    ? "true-answer"
                    : ""
                }`}
                onClick={() =>
                  !areButtonsDisabled &&
                  isAnswerTrue(currentDataObjectKeys[i], i)
                }
              >
                <Typography
                variant="h6"
                  sx={{
                    fontSize:{lg:18,md:16,sm:15,xs:14},
                    color: `${
                      indexForStyle === i && isCorrectAnswer === true
                        ? "true-answer"
                        : indexForStyle === i && isCorrectAnswer === false
                        ? "wrong-answer"
                        : ""
                    } ${
                      currentDataObjectKeys[i] ==
                        currentData?.trueAnswer && areButtonsDisabled
                        ? "white"
                        : "black"
                    }`,
                  }}
                >
                  {choice}
                </Typography>
              </Item>
            </Grid>
          )
        )}
      </Grid>
    </Box>
  );
}
