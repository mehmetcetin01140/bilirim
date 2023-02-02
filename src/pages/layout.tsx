import React from "react"
import NavigationBar from "@/components/navigation/navigation-bar"
import SnackBarComponent from "@/components/snackbar"
import Loading from "@/components/quiz/loading"
import { useRouter } from "next/router"
import { useEffect } from "react";
import { useDispatch } from "../store/store";
import { setLastChoise, setRetry, setScore,setIsReadyForStart } from "../store/slices/app-slice";
import { setHomePageHoveredCategory } from "../store/slices/theme-slice";
export default function Layout({ children } : {children:React.ReactNode}) {
    const router = useRouter()
    const pathname = router.pathname
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(setScore(0));
      dispatch(setLastChoise(null));
      dispatch(setRetry(false));
      dispatch(
        setHomePageHoveredCategory({
          category: "/assets/homepagebanner.jpg",
          videoPath: "",
        })
      );
      dispatch(setIsReadyForStart(false))
    }, [pathname]);
  return (
    <>
    {
      router.pathname == "/quiz" && (

        <Loading/>
      )
    }
    <NavigationBar/>
    <SnackBarComponent />
      <main>{children}</main>
    </>
  )
}