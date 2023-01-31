import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import { GetFromLocalStorage } from "@/utils/get-from-local-storage";
import HomeIcon from "@mui/icons-material/Home";
import ReplayIcon from "@mui/icons-material/Replay";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "../../store/store";
import { getAppState, setLastChoise, setRetry, setScore } from "../../store/slices/app-slice";


export default function RetryDialog() {
  const [open, setOpen] = React.useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.up("xs"));
  const { score, retry } = useSelector(getAppState);
  const router = useRouter();
  const dispatch = useDispatch();
  const date : Date = new Date();
  const localizedDate : string = date.toLocaleString();
  const handleClose = () => {
    dispatch(setScore(0));
    dispatch(setLastChoise(null))
    dispatch(setRetry(false));
    
  };
  React.useEffect(() => {
    const checkTimeLeft = () : void => {
      if (retry) {
        setOpen(true);
      }
      else{
        setOpen(false)
      }
    };
    checkTimeLeft();
  }, [retry]);


  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundImage: "url(/assets/quizbackground.svg)",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: "2px solid white",
              borderRadius: 10,
              paddingY:10,
              width:{xs:"90%",md:"75vw"},
              background: "#0077ff65;",
            }}
          >
            <DialogTitle id="responsive-dialog-title"  color="white">
              Süreniz doldu !
            </DialogTitle>
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Image
                  src="/assets/coins.png"
                  alt="timer"
                  className="rotate-horizontally"
                  width={80}
                  height={80}
                  style={{
                    boxShadow: " rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    borderRadius: 40,
                  }}
                />
                <DialogContentText color="white" fontSize="25px">
                  {score}
                </DialogContentText>
                <Box sx={{ textAlign: "center" }}>
                  <Typography color="white" sx={{ marginBottom: 1 }}>
                    Yarışmacı Adı: {GetFromLocalStorage("userName")}
                  </Typography>
                  <Typography color="white">
                    Yarışma Tarihi: {localizedDate.slice(0, 10)}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  router.push("/")
               
                  
                } }
                variant="contained"
                color="secondary"
                endIcon={<HomeIcon />}
         
              >
                Ana Sayfa
              </Button>
              <Button
                variant="contained"
                color="success"
                endIcon={<ReplayIcon />}
                onClick={handleClose}
                autoFocus
          
              >
                Tekrarla
              </Button>
            </DialogActions>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
