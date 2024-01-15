import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
import { Login } from "./components/Authenticatons/Login";
import { SignUp } from "./components/Authenticatons/SignUp";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

const HomePage = ()=>{
 const history = useHistory()

 useEffect( () =>{
  const user = JSON.parse(sessionStorage.getItem("userInfo"));

  if(user){
    history.push("/chatpage")
  }
 },[history])
    return(
        <>
       <Box
       d="flex"
       justifyContent="center"
       alignItems="center"
       w="50%"
       margin="0px auto"
       borderWidth="1px"
       >
       <Tabs variant='soft-rounded' colorScheme='blue'>
  <TabList>
    <Tab width="50%">Login</Tab>
    <Tab width="50%">Sign Up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
     <Login/>
    </TabPanel>
    <TabPanel>
     <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>
       </Box>
        </>
    )
}

export default HomePage;