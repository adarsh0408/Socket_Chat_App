import React, { useEffect } from "react";
import axios from "axios";

const ChatPage = () => {

    const fetchData = async () => {
        const data = await fetch("/api/chat");
        console.log(data);
    }

    useEffect(()=>{
        fetchData()
    },[])
    return(
        <>
        Chat Page
        </>
    )
}

export default ChatPage;