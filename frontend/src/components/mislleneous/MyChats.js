import React, { useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider';
import { Box, Button, Stack, Text, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from './ChatLoading';
import { getSender } from '../../config/chatLogics';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const {user,setSelectedChat,chats,setChats,selectedChat} = ChatState();

  const toast = useToast();

  const fetchChats = async() =>{
    try {
    const  config={
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data} = await axios.get('/api/chat',config);
      console.log(data);
      if(!chats.find((c) => c._id === data._id)) setChats([data,...chats])

      setSelectedChat(data);

      setChats(data);
    } catch (error) {
      toast({
        title:"Error Occured!",
        description:error.message,
        status:"error",
        isClosable:true,
        position:"top-right",
        duration:3000
      })
    }
  }


  useEffect(()=>{
    setLoggedUser(JSON.parse(sessionStorage.getItem("userInfo")));
    fetchChats();
  },[])
  return (
    <>
    <Box
    display={{base:selectedChat ? "none" : "flex", md:"flex"}}
    flexDirection="column"
    alignItems="center"
    p={3}
    w={{base:"100%", md:"31%"}}
    borderWidth="1px"
    borderRadius="1g"
    >

      <Box
      pb={3}
      px={3}
      fontSize={{base:"28px", md:"30px"}}
      display="flex"
      w="100%"
      justifyContent="space-between"
      alignItems="center"
      >
        My Chats

        <Button
        display="flex"
        fontSize={{base:"17px", md:"10px", lg:"17px"}}
        rightIcon={<AddIcon/>}
        >
          New Group Chat
        </Button>
      </Box>

      <Box
      display="flex"
      flexDir="column"
      p={3}
      bg="#F8F8F8"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflow="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll"
          >
            {chats.map((chat) => (
              <Box
              onClick={()=>setSelectedChat(chat)}
              cursor="pointer"
              bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
              color={selectedChat === chat? "white" : "black"}
              px={3}
              py={2}
              borderRadius="lg"
              key={chat._id}
              > 
              <Text>
                {!chat.isGroupChat? getSender(loggedUser,chat.users):(chat.chatName)}
              </Text>
              </Box>
            ))}

          </Stack>
        ) : (
          <ChatLoading/>
        )}
      </Box>

    </Box>
    </>
  )
}

export default MyChats;