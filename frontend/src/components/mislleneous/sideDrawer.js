import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text, Tooltip } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../Context/ChatProvider';
const SideDrawer = () => {
  const [search,setSearch]=useState('');
  const [searchResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);
  const[loadingChat,setLoadingChat]=useState();
  const user = ChatState();
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
        <Button>
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
            <MenuItem>
              My Profile
            </MenuItem>
            <MenuItem>
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
   </>
  )
}

export default SideDrawer;