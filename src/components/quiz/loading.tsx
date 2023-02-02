import { Box } from '@mui/system'
import Image from 'next/image'
import React from 'react'
import { getAppState} from "../../store/slices/app-slice";
import { useSelector, useDispatch } from "../../store/store";

type Props = {}

export default function Loading({}: Props) {
    const { isReadyForStart } = useSelector(getAppState);
  return (
   <Box sx={{width:"100%",height:"100vh",backgroundColor:"royalblue",position:"absolute",display:!isReadyForStart ? "flex" : "none",justifyContent:"center",alignItems:"center",zIndex:999}}>
  <Image width={120} height={120} alt="logo" src={"/assets/logo.png"} className="loader-logo" />

   </Box>
  )
}