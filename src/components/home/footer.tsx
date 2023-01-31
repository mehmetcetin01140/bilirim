import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
type Props = {};

export default function Footer({}: Props) {
  const isBrowser = () : boolean => typeof window !== 'undefined'; 

 const scrollToTop = () : void => {
      if (!isBrowser()) return;
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <footer>
    <Box
      sx={{
        width: "100%",
        height: 98,
        background: "royalblue",
        paddingX: 3,
        boxSizing: "border-box",
        marginTop: 5,
      }}
    >
     <Container  maxWidth="xl">
     <Grid container sx={{ height:98,alignItems:"center" }}>
        <Grid
          item
          xs={6}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Image width={90} height={90} alt="logo" src={"/assets/logo.png"} />
          <Typography color="whitesmoke" fontSize="14px" >2023  Bilirim</Typography>
        </Grid>
        <Grid item xs={6} sx={{display:"flex",justifyContent:"flex-end"}}>
       <ArrowCircleUpIcon onClick={scrollToTop} sx={{color:"white",fontSize:40,cursor:"pointer"}}/>
        </Grid>
      </Grid>
     </Container>
    </Box>
    </footer>
  );
}
