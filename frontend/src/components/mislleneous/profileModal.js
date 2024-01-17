import { useDisclosure } from "@chakra-ui/hooks";
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from "@chakra-ui/react";
import React from "react";
import { ViewIcon } from "@chakra-ui/icons";
const ProfileModal = ({user,children}) =>{
    const {isOpen, onOpen, onClose} = useDisclosure();
    return(

        <>
       {
        children?(<span onClick={onOpen}> {children}</span>):(
            <IconButton
            d={{base:"flex"}}
            icon={<ViewIcon/>}
            onClick={onOpen}
            />
        )}

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image
            src={user.pic}
            />
           <Text>
            {user.email}
           </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </>
    )
}

export default ProfileModal;