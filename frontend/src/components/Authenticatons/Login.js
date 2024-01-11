import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, VStack, useToast } from '@chakra-ui/react'

import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export const Login = () => {
  const toast = useToast();
  const history = useHistory();
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[loading,setLoading]=useState(false);
  const submitHandler = async() =>{
    setLoading(true);
    if( !email || !password ){
      toast({
        title:"Please fill all the fields",
        status:"warning",
        isClosable:true,
        position:"top-right",
        duration:3000
      });
      setLoading(false);
      return
    }try {
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
      const {data} = await axios.post(
        "/api/user/login",
        {email,password},
        config
      )
      toast({
        title:"Login Successful",
        status:"success",
        isClosable:true,
        position:"top-right",
        duration:3000
      })
      sessionStorage.setItem('userInfo',JSON.stringify(data));
      
      setLoading(false);
      history.push('/chats')
    } catch (error) {
      
      toast({
        title:"Error Occured",
        description:error.response.data.message,
        status:"error",
        isClosable:true,
        position:"top-right",
        duration:3000
      })
      setLoading(false);
    }
   
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
        <Input placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} value={password} type='password'/>
      </FormLabel>
    </FormControl>

    <Button 
    colorScheme='blue'
    width='100%'
    style={{marginTop:15}}
    onClick={submitHandler}
    isLoading={loading}
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
