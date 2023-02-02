import HeadComponent from "@/components/head";
import FirstContentBox from "@/components/home/content-box";
import { Container } from "@mui/system";
import { Box } from "@mui/material";
import ContentOfTheDay from "@/components/home/content-of-the-day";
import ScoreWrapper from "@/components/topscore/score-wrapper";
import Footer from "@/components/home/footer";
import { useEffect } from "react";
import { useDispatch } from "../store/store";
import { setLastChoise, setRetry, setScore } from "../store/slices/app-slice";
import { setHomePageHoveredCategory } from "../store/slices/theme-slice";
export interface ContentBoxPropTypes {
  id: number;
  title: string;
  content: string;
}
const contentBoxProps: ContentBoxPropTypes[] = [
  {
    id: 0,
    title: "Hoşgeldiniz",
    content:
      "Bilgilerinizi sınamak ister misiniz? İster spesifik bir alanda, ister genel modda özenle hazırlanmış sorularla bilgi dağarcığınızı sınayabilirsiniz.",
  },
];

export default function Home() {

  return (
    <Box sx={{ mt: 1.5 }}>
      <HeadComponent title="Bilirim - Bilgi Yarışması" />

      <Container maxWidth="xl">
        {contentBoxProps.map((props) => (
          <FirstContentBox key={props.id} contentBoxProps={props} />
        ))}
        <ScoreWrapper />
        <ContentOfTheDay />
      </Container>

      <Footer />
    </Box>
  );
}
