import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  useToast,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvtar/UserListItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setgroupChatName] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [search, setsearch] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [loading, setloading] = useState(false);

  const toast = useToast();

  const { user, chats, setChats } = ChatState();

  const handleSearch = async(query) => {
    setsearch(query);
    if(!query){
      return
    }
    try {
      setloading(true);

      const config ={
        headers:{
          "Content-type":"application/json",
          Authorization:`Bearer ${user.token}`
        },
      }
      const {data} = await axios.get(`/api/user?search=${search}`,config);
      console.log(data);
      setloading(false);
      setsearchResult(data);
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
  };
  const handleSubmit = () => {};
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chat</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => setgroupChatName(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <Input
                placeholder="Add users eg: Ashish, Adarsh"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {/* Selected Users */}
            {loading ? <div>loading</div> : (
              searchResult?.slice(0,4).map(user=>(
                <UserListItem/>
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
