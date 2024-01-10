import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'
export const SignUp = () => {
    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
  const [pic,setPic] = useState('');

  const submitHandler = () =>{}
  return (
   <VStack>
    <FormControl id='name'>
      <FormLabel>
        Name
        <Input placeholder="Enter your name" onChange={(e)=>setName(e.target.value)}/>
      </FormLabel>
    </FormControl>

    <FormControl id='email'>
      <FormLabel>
        Email
        <Input placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)}/>
      </FormLabel>
    </FormControl>

    <FormControl id='password'>
      <FormLabel>
      Password
        <Input placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)}/>
      </FormLabel>
    </FormControl>

    <FormControl id='confirmPassword'>
      <FormLabel>
        Confirm Password
        <Input placeholder="Enter Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
      </FormLabel>
    </FormControl>

    <FormControl id='pic'>
      <FormLabel>
        Upload Profile pic
        <Input type='file' accept='image/' onChange={(e)=>setPic(e.target.value)}/>
      </FormLabel>
    </FormControl>

    <Button 
    colorScheme='blue'
    width='100%'
    style={{marginTop:15}}
    onClick={submitHandler}
    >
      Sign Up
    </Button>
   </VStack>
  )
}
