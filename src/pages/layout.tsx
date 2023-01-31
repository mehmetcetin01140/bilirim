import React,{useState} from "react"
import NavigationBar from "@/components/navigation/navigation-bar"
import SnackBarComponent from "@/components/snackbar"
export default function Layout({ children } : {children:React.ReactNode}) {
    
  return (
    <>
    <NavigationBar/>
    <SnackBarComponent />
      <main>{children}</main>
    </>
  )
}