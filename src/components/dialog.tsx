import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useSelector, useDispatch } from "../store/store";

import { setSnackBarIsOpen, getAppState,setSelectedCategory } from "../store/slices/app-slice";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/router";
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default function DialogComponent() {
  const [userName, setUserName] = React.useState<string>("");
  const { selectedCategory } = useSelector(getAppState);
  const dispatch = useDispatch();
  const router = useRouter()

  const onUserNameSubmit = () : void => {
    if (userName.length > 2 ) {
      window.localStorage.setItem("userName", userName);
      router.push("/quiz")
      dispatch(
        setSelectedCategory({
          categoryId: selectedCategory.categoryId,
          dialogIsOpen: false,
        })
      );

    } else dispatch(setSnackBarIsOpen(true));
  };

  const handleClose = () : void  => {
    dispatch(
      setSelectedCategory({
        categoryId: selectedCategory.categoryId,
        dialogIsOpen: false,
      })
    );
  };
  

  return (
    <Dialog
      open={selectedCategory.dialogIsOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          padding: 15,

          overflow: "hidden",
          borderRadius: 12,
          backgroundColor: "#0077ff",
          border: "1px solid white",
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.1,
          ease: [0, 0.71, 0.2, 0.1],
          
        }}
      >
        <Image
          className="dialog-hello"
          alt="hello"
          width={120}
          height={120}
          src={"/assets/hello.svg"}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.2,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <DialogTitle color="white">Merhaba..</DialogTitle>
        <DialogContent>
          <DialogContentText color="white">
            Lütfen skorunuzu kaydetmemiz için adınızı ve soyadınızı yazın.
          </DialogContentText>
          <input
            type="text"
            placeholder="Adınız ve Soyadınız"
            className="dialog-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </DialogContent>

        <DialogActions sx={{ marginTop: "auto" }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              fontSize: 16,
            }}
            endIcon={<CancelIcon />}
            color="error"
            onClick={handleClose}
          >
            Çık
          </Button>
          <Button
            variant="contained"
            endIcon={<CheckCircleIcon />}
            color="success"
            sx={{
              textTransform: "none",
              fontSize: 16,
            }}
            onClick={()=>
             onUserNameSubmit()}
          >
            {" "}
            Başla
          </Button>
        </DialogActions>
      </motion.div>
    </Dialog>
  );
}
