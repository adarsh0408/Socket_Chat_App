import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react'

export const Login = () => {
  
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');

  const submitHandler = () =>{
    console.log(email);
  }
  return (
    <VStack>


    <FormControl id='email'>
      <FormLabel>
        Email
        <Input placeholder="Enter your Email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
      </FormLabel>
    </FormControl>

    <FormControl id='password'>
      <FormLabel>
      Password
        <Input placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      </FormLabel>
    </FormControl>

    <Button 
    colorScheme='blue'
    width='100%'
    style={{marginTop:15}}
    onClick={submitHandler}
    >
      Login
    </Button>

    <Button 
    colorScheme='red'
    width='100%'
    style={{marginTop:15}}
    onClick={()=>{
      setEmail("guest@example.com");
      setPassword('123456');
      
    }}
    >
      Get Guest User Credential
    </Button>
   </VStack>
  )
}
