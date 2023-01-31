import UseInView from "@/animations/useInView";
import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "../../store/store";
import {  setLastChoise, setRetry, setScore } from "../../store/slices/app-slice";
import HeadComponent from "@/components/head";

export default function index() {
  const dispatch = useDispatch( )
  useEffect(()=>{
    dispatch(setScore(0));
    dispatch(setLastChoise(null))
    dispatch(setRetry(false));
  },[])
  return (
    <>
       <HeadComponent title="Hakkımızda" />

    <Container maxWidth="xl"  >
      <UseInView>


      <Box
        sx={{
          minHeight: "90.8vh",
          paddingX: "5%",
          background: "#1C77FF",
          position: "relative",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px;"
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ width: 150, height: 150, position: "relative" }}>
            <Image src="/assets/logo.png" alt="logo" fill />
          </Box>
        </Box>

        <Typography color="whitesmoke" variant="h4" sx={{ paddingY: 2,textAlign:"center" }}>
          Hakkımızda
        </Typography>
        <Typography color="whitesmoke" fontSize="18px">
          Bilirim, Mehmet Çetin tarafından oluşturulmuş bir bilgi yarışması
          platformudur. Sitemizde bilim, tarih, spor veya karışık olarak
          kategoriler bulunmaktadır. Bu kategorilerden yarışmak istediğiniz
          kategoriyi seçip hemen yarışmaya başlayabilirsiniz. Sitemizi ilk defa
          ziyaret ediyorsanız kategori seçimi yaptığınızda sizden ad ve soyad
          bilgilerini istemekteyiz. Bu bilgileri liderlik sıralamasında
          kullanmak için sizden talep etmekteyiz. Eğer gerçek isminizi kullanmak
          istemiyorsanız bir takma isim de kullanabilirsiniz.
        </Typography>
        <Typography color="whitesmoke" fontSize="18px" sx={{ marginY: 2 }}>
          Aynı kategoriden yalnızca en yüksek puanınızla sıralamaya
          girebilirsiniz ancak farklı kategorilerde, kategori sayısı kadar
          sıralamada bulunabilirsiniz. Yarışma sırasında iki adet soruyu pas
          geçme hakkınız bulunmaktadır. Soruyu pas geçtiğinizde puanınızda bir
          azalma veya artma olmaz. Her doğru cevabınızda 100 puan alırsınız. Her
          yanlış cevabınız sizden 100 puan götürür. Yarışma sonunda otomatik olarak skorunuz sisteme kayıt edilir ve anlık olarak lider tablosuna isminiz düşer. Girdiğiniz isimler sıralamaya girmeniz dahilinde liderler tablosunda listeleneceği için gerçek adınızı girmeyecekseniz, takma adınızı ahlaki kurallar çerçevesinde belirlemeniz önemle rica olunur. İyi eğlenceler.
        </Typography>
      <Box sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",marginTop:5}}>
        <Box sx={{width:"100%",minHeight:300,position:"relative"}}>

      <Image src="/assets/testtubes.svg" alt="hello" fill />
        </Box>
      <Typography sx={{color:"white",textAlign:"center",marginBottom:1,fontSize:13}}>2023</Typography>
      </Box>
        {/* <Typography color="whitesmoke" variant="h4" sx={{ paddingY: 2 }}>
          Bize Ulaşın
        </Typography>
        <Typography color="whitesmoke" fontSize="17px" >
          Email Adresi <MailOutlineIcon className="material-icons" /> :
          mcetin.01170@gmail.com
        </Typography>
        <Typography color="whitesmoke" fontSize="17px" sx={{ marginY: 2 }}>
          Görüş ve önerilerinizi bildirmek, soru göndermek veya başka bir durum
          için yukarıdaki adresten iletişime geçebilirsiniz.
        </Typography> */}
       
      </Box>
      </UseInView>
    </Container>
    </>
  );
}
