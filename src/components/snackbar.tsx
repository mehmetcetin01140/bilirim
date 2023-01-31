import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { useSelector, useDispatch } from "../store/store";
import { getAppState, setSnackBarIsOpen } from "../store/slices/app-slice";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export default function SnackBarComponent() {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const { snackBarIsOpen } = useSelector(getAppState);
  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setSnackBarIsOpen(false));
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackBarIsOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          İsminiz çok kısa. Lütfen tekrar kontrol ediniz.
        </Alert>
      </Snackbar>
    </Stack>
  );
}
