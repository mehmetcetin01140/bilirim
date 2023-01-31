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
export default function ContentBox({
  contentBoxProps,
}: {
  contentBoxProps: ContentBoxPropTypes;
}) {
  const { hoveredCategory } = useSelector(getThemeState);
  const { homePageHoveredVideo } = hoveredCategory;
  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);
    const updateTarget = useCallback((e:MediaQueryListEvent) : void => {
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
  const isBreakpoint : boolean = useMediaQuery(900);

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
                src={hoveredCategory.homePageHoveredImgPath}
                style={{ opacity: 1 }}
              />
            </Grid>
            <Grid
              item
              md={homePageHoveredVideo ? 12 : 6}
              sx={{ position: "relative" }}
            >
              <video
                id="#video"
                src={hoveredCategory.homePageHoveredVideo}
                muted
                autoPlay
                loop
              />
              <Box sx={{ padding: 4 }}>
                <Typography fontSize="36px" color={"whitesmoke"} component="h1">
                  {GetCategoryOnHover(homePageHoveredVideo)?.name
                    ? GetCategoryOnHover(homePageHoveredVideo)?.name
                    : contentBoxProps.title}
                </Typography>
                <Typography fontSize={16} color={"whitesmoke"} mt={1}>
                  {GetCategoryOnHover(homePageHoveredVideo)?.desc
                    ? ""
                    : contentBoxProps.content}
                </Typography>

                <ContentBoxCategories isBreakpoint={isBreakpoint} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </UseInView>
    </>
  );
}
