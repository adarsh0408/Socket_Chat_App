import { Avatar, Box, Text } from "@chakra-ui/react";
import { color } from "framer-motion";
import React from "react";

const UserListItem = ({handleFunction,user}) =>{
    return(
        <>
        <Box 
        onClick={handleFunction}
        cursor='pointer'
        _hover={{
            background:"#38B2AC",
            color:"white"
        }}
        >
            <Avatar 
            cursor="pointer"
            name={user.name}
            src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text>Email:{user.email}</Text>
            </Box>
            
        </Box>
        </>
    )
}

export default UserListItem;