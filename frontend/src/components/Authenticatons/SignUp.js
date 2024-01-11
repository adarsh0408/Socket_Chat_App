import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, Toast, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
export const SignUp = () => {

  const toast = useToast();
  const history = useHistory();

    const[name,setName] = useState('');
    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const [pic,setPic] = useState('');
    const [loading,setLoading]=useState(false);

    const submitHandler = async() =>{
    setLoading(true);
    if(!name || !email || !password || !confirmPassword){
      toast({
        title:"Please fill all the fields",
        status:"warning",
        isClosable:true,
        position:"top-right",
        duration:3000
      });
      setLoading(false);
    return
    }
          
    if(password != confirmPassword){
      toast({
        title:"Password and Confirm Password must be same",
        status:"warning",
        isClosable:true,
        position:"top-right",
        duration:3000
      });
      setLoading(false);
      return
    }
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }
     
      const {data} = await axios.post(
        "/api/user",
      {name,email,password,pic},
      config
      );
      // console.log(data);
      toast({
        title:"Registration Successful",
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
        status:"error",
        description:error.response.data.message,
        isClosable:true,
        position:"top-right",
        duration:3000
      })
      setLoading(false);
    }
   
  }
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
        <Input placeholder="Enter your Password" onChange={(e)=>setPassword(e.target.value)} type='password'/>
      </FormLabel>
    </FormControl>

    <FormControl id='confirmPassword'>
      <FormLabel>
        Confirm Password
        <Input placeholder="Enter Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} type='password'/>
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
    isLoading={loading}
    >
      Sign Up
    </Button>
   </VStack>
  )
}
