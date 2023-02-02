import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UseInView from "../../animations/useInView";
import Image from "next/image";
import { Typography } from "@mui/material";
import type { ContentBoxPropTypes } from "@/pages";
import ContentBoxCategories from "./content-box-categories";
import { useSelector } from "../../store/store";
import { getThemeState } from "../../store/slices/theme-slice";
import { GetCategoryOnHover } from "@/utils/get-category-on-hover";
import { categories } from "./content-box-categories";
export default function ContentBox({
  contentBoxProps,
}: {
  contentBoxProps: ContentBoxPropTypes;
}) {
  const { hoveredCategory } = useSelector(getThemeState);
  const { homePageHoveredVideo } = hoveredCategory;
  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);
    const updateTarget = useCallback((e: MediaQueryListEvent): void => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addListener(updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeListener(updateTarget);
    }, []);

    return targetReached;
  };
  const isBreakpoint: boolean = useMediaQuery(900);
  const conditionalTitleStyle = homePageHoveredVideo
    ? {
        border: "2px solid white",
        borderRadius: 3,
        backgroundColor: "#0077ffc5",
        display: "flex",
        alignItems: "center",
        boxShadow:
          " rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
        paddingX: 3,
      }
    : { display: "block" };

  return (
    <>
      <UseInView>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "relative",
                height: 739,
                width: "100%",
                display: homePageHoveredVideo ? "none" : "",
              }}
            >
              <Image
                fill
                alt="test"
                src={"/assets/homepagebanner.jpeg"}
                style={{ opacity: 1 }}
              />
            </Grid>
            <Grid
              item
              md={homePageHoveredVideo ? 12 : 6}
              sx={{ position: "relative" }}
            >
              {categories.map((category) => (
                <video
                  key={category.id}
                  id="#video"
                  src={category.videoPath}
                  muted
                  autoPlay
                  loop
                  style={{
                    visibility:
                      homePageHoveredVideo !== category.videoPath
                        ? "hidden"
                        : "visible",
                  }}
                />
              ))}

              <Box sx={{ padding: 4 }}>
                <Box sx={conditionalTitleStyle}>
                  <Typography
                    fontSize="36px"
                    color={"whitesmoke"}
                    component="h1"
                  >
                    {GetCategoryOnHover(homePageHoveredVideo)?.name
                      ? GetCategoryOnHover(homePageHoveredVideo)?.name
                      : contentBoxProps.title}
                  </Typography>
                  <Typography fontSize={16} color={"whitesmoke"} mt={1}>
                    {GetCategoryOnHover(homePageHoveredVideo)?.desc
                      ? ""
                      : contentBoxProps.content}
                  </Typography>
                </Box>
                <ContentBoxCategories isBreakpoint={isBreakpoint} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </UseInView>
    </>
  );
}
