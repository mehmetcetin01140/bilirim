
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Image from "next/image";
import { Typography } from "@mui/material";

import { useDispatch, useSelector } from "../../store/store";
import {
  getThemeState,
  setHomePageHoveredCategory,
} from "../../store/slices/theme-slice";
import { getAppState, setSelectedCategory } from "../../store/slices/app-slice";
import DialogComponent from "../dialog";
import { GetFromLocalStorage } from "@/utils/get-from-local-storage";
import { useRouter } from "next/router";
type Props = {
  isBreakpoint:boolean
};
export interface CategoryTypes {
  id: number;
  name: string;
  imgPath: string;
  hoverPath: string;
  videoPath: string;
  desc:string;
}
export const categories: CategoryTypes[] = [
  {
    id: 0,
    name: "Bilim",
    imgPath:
      "/assets/sciencemini.jpg",
    hoverPath: "/assets/science.jpg",
    videoPath: "/assets/science.mp4",
    desc:"Bilim sorularıyla kendinizi sınayın. Otuz saniye süreniz ve iki kez soruyu pas geçme hakkınız var."
  },
  {
    id: 1,
    name: "Tarih",
    imgPath:
      "/assets/historymini.jpg",
    hoverPath: "/assets/history.jpg",
    videoPath: "/assets/historyy.mp4",
    desc:"Tarih alanında seçilmiş sorularla kendinizi sınayın. Otuz saniye süreniz ve iki kez soruyu pas geçme hakkınız var."
  },
  {
    id: 2,
    name: "Spor",
    imgPath:
      "/assets/sportsmini.jpg",
    hoverPath: "/assets/sports.jpg",
    videoPath: "/assets/sports.mp4",
    desc:"Çeşitli sporlarla ilgili sorularla kendinizi sınayın. Otuz saniye süreniz ve iki kez soruyu pas geçme hakkınız var."
  },
  {
    id: 3,
    name: "Karışık",
    imgPath:
      "/assets/randommini.jpg",
    hoverPath: "/assets/mix.jpg",
    videoPath: "/assets/random.mp4",
    desc:"Kategori fark etmeksizin çeşitli sorularla kendinizi sınayın. Otuz saniye süreniz ve iki kez soruyu pas geçme hakkınız var."
  },
];

export default function ContentBoxCategories({isBreakpoint}: Props) {
  const dispatch = useDispatch();
  const router = useRouter()
  const {hoveredCategory} = useSelector(getThemeState)
    const {homePageHoveredVideo} = hoveredCategory

  return (
    <Box sx={{ flexGrow: 1 }}>
      <DialogComponent />
      <Typography fontSize={22} component="h2" color="whitesmoke" my={5}>
      {!homePageHoveredVideo && "Kategori Seç"}
      </Typography>
      <Grid container >
        {categories.map((category : CategoryTypes) => (
          <Grid
            item
            p="5px"
            md={6}
            xs={12}
            key={category.id}
          
            onClick={() =>{
              if(typeof(GetFromLocalStorage("userName"))=="string"){
                dispatch(
                  setSelectedCategory({
                    categoryId: category.id,
                    dialogIsOpen: typeof(GetFromLocalStorage("userName"))=="string" ? false : true,
                  })
                )
               router.push("/quiz")
              }
              else{
                dispatch(
                 setSelectedCategory({
                    categoryId: category.id,
                    dialogIsOpen: true
                       }))
              }
            }
            }
            onMouseEnter={() =>
             !isBreakpoint &&  dispatch(
              setHomePageHoveredCategory({
                category: category.hoverPath,
                videoPath: category.videoPath,
              })
            )
            }
            onMouseLeave={() =>
              dispatch(
                setHomePageHoveredCategory({
                  category: "/assets/homepagebanner.jpg",
                  videoPath: "",
                })
              )
            }
          >
            <Box className="categories-box" sx={{marginX:homePageHoveredVideo  ? "15%" : ""}}>
              <Box sx={{ position: "relative", width: "100%", height: homePageHoveredVideo || isBreakpoint  ? "215px" : "150px" }}>
                <Image alt={category.name} fill src={category.imgPath} />
              </Box>
              <Typography textAlign="center" my={1}>
                {category.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
