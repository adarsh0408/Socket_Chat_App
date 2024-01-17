import { Avatar, Box, Button, Drawer, DrawerContent, DrawerHeader, DrawerOverlay, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './profileModal';
import { useHistory } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/hooks";
const SideDrawer = () => {
  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);
  const[loadingChat,setLoadingChat]=useState();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {user} = ChatState();
  const history = useHistory();
  const logoutHandler = () =>{
    sessionStorage.removeItem("userInfo");
    history.push('/')
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
        <i class="fas fa-search"></i>
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
    </DrawerContent>
    </Drawer>
   </>
  )
}

export default SideDrawer;