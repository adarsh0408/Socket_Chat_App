import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuItem, MenuList, Spinner, Text, Tooltip, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './profileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks";
import axios from 'axios';
import UserListItem from '../UserAvtar/UserListItem';
const SideDrawer = () => {
  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);
  const[loadingChat,setLoadingChat]=useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user,setSelectedChat,chats,setChats} = ChatState();
  const history = useHistory();
  const toast = useToast();

  const logoutHandler = () =>{
    sessionStorage.removeItem("userInfo");
    history.push('/')
  }

  const handleSearch = async() =>{
    if(!search){
      toast({
        title:"Please Enter something in search",
        status:"error",
        isClosable:true,
        position:"top-right",
        duration:3000
      })
      return;
    }else{
      try {
        setLoading(true);
        const config={
          headers:
          {
            Authorization:`Bearer ${user.token}`
          }
        };

        const {data} = await axios.get(`/api/user?search=${search}`,config)
       
        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        toast({
          title:"Error Occured!",
          description:"Failed to load the search result",
          status:"error",
          isClosable:true,
          position:"top-right",
          duration:3000
        })
      }
    }
  }

  const accessChat = async(userId) =>{
    try {
      setLoadingChat(true);

      const config = {
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`
        },
      };
      const {data} = await axios.post('/api/chat',{userId},config);

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title:"Error Occured!",
        description:"Failed to load the chat result",
        status:"error",
        isClosable:true,
        position:"top-right",
        duration:3000
      })
    }
  }
  return (
   <>
    <Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    bg="white"
    w="100%"
    p="5px 10px 5px 10px"
    borderWidth="5px"
    >
      <Tooltip 
      label="Search Users to Chat"
      hasArrow
      placement='bottom-end'
      >
        <Button variant='ghost' onClick={onOpen}>
        <i className="fas fa-search"></i>
        <Text display={{base:"none" , md:"flex"}} px="4">
          Search User
        </Text>
        </Button>
      </Tooltip>

      <Text 
      fontSize="2x1"
      fontFamily="work sans"
      >
        Chat-App
      </Text>
      <div>
        <Menu>
          <MenuButton>
            <BellIcon/>
          </MenuButton>
          {/* <MenuList></MenuList> */}
        </Menu>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            <Avatar size="sm" cursor="pointer" name={user.name}/>
          </MenuButton>
          <MenuList>
            <ProfileModal user={user}>
            <MenuItem>
              My Profile
            </MenuItem>
            </ProfileModal>
            
            <MenuItem onClick={logoutHandler}>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>

    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
    <DrawerOverlay/>
    <DrawerContent>
      <DrawerHeader>
        Search Users
      </DrawerHeader>
      <DrawerBody>
      <Box display='flex'>
        <Input
        placeholder="Name or Email"
        value={search}
        onChange={((e)=>setSearch(e.target.value))}
        mr="5px"
        />
      <Button onClick={handleSearch}>Search</Button>
      </Box>
      {
  loading ? (
    <span>loading</span>
  ) : (
    searchResult?.map((user) => (
      <UserListItem
        key={user._id}
        user={user}
        handleFunction={() => accessChat(user._id)}
      />
    ))
  )
}
    {loadingChat && <Spinner ml="auto"/>}
    </DrawerBody>
    </DrawerContent>
 
    </Drawer>
   </>
  )
}

export default SideDrawer;