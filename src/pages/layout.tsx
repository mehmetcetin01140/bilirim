import React from "react"
import NavigationBar from "@/components/navigation/navigation-bar"
import SnackBarComponent from "@/components/snackbar"
import Loading from "@/components/quiz/loading"
import { useRouter } from "next/router"

export default function Layout({ children } : {children:React.ReactNode}) {
    const router = useRouter()

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