import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import UseInView from "../../animations/useInView";
import Image from "next/image";
import { Typography } from "@mui/material";

export default function ContentOfTheDay({}) {

  const date : string = new Date().toLocaleDateString("tr-TR");

  return (
    <Box sx={{ marginTop: 1.5 }}>
      <UseInView>
        <Box sx={{ flexGrow: 1, }}>
          <Grid container>
            <Grid item md={6}>
              <Box sx={{ padding: 4 }}>
                <Typography fontSize="36px" color={"whitesmoke"} component="h1">
                  Günün Bilgisi &#129299;
                </Typography>
                <Typography fontSize="22px" color={"whitesmoke"} component="h2">
                  Konu: Bambu Ağacı
                </Typography>
                <Typography fontSize="18px" color={"whitesmoke"} component="h5">
                  Tarih: {date}
                </Typography>
                <Typography fontSize={16} color={"whitesmoke"} mt={2}>
                  Bambu ağacının yetişme serüveni oldukça ilginç ve zorludur.
                  Bambular ekildikten sonra yaklaşık olarak beş yıl boyunca
                  büyümezler. Beş yılı tamamlayan bambular yavaş yavaş
                  filizlenirler ve bu süreçten sonra günde yaklaşık olarak 90 cm
                  uzarlar.
                </Typography>
                <Typography fontSize={16} color={"whitesmoke"} mt={3}>
                  Bazı bambu türleri 80 cm kalınlığa ve 38 metre uzunluğa kadar
                  varabilir. Bazı türler ise çok seyrek çiçek açar ki bu bazen
                  100 yılda bir kez veya daha az olabilir.
                </Typography>
                <Typography fontSize={16} color={"whitesmoke"} mt={3}>
                  Bambuların hafif ve sağlam olması onları silah yapımında
                  tercih edilen bir ağaç yapmıştır. Bambudan mızraklar, ok
                  boruları gibi araçlar yapılır. Vietnam Savaşı sırasında Viet
                  Kong'un bambulardan yaptıkları tuzaklar Amerikan askerlerinin
                  en büyük kabusu olmuşlardı.
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              md={6}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                position: "relative",
                height: {xl:500},
                width: "100%",
              }}
            >
              <Image
                fill
                alt="test"
                src="/assets/bamboo.gif"
                style={{ opacity: 1 }}
              />
            </Grid>
          </Grid>
        </Box>
      </UseInView>
    </Box>
  );
}
