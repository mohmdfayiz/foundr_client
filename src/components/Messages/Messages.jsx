import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {io} from "socket.io-client";
import jwt_decode from 'jwt-decode'

const Messages = () => {
  const [connections, setConnections] = useState([]);
  const [currentChat, setCurrentCaht] = useState({});
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const token = localStorage.getItem('token')
  const {userId} = jwt_decode(token)

  const scrolRef = useRef();
  const socket = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getConnections = async () => {
      const { data } = await axios.get("/api/user/getConnections", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnections(data.connections);
    };
    getConnections();
  },[]);

  useEffect(() => {
    const fetchMessages = async (user) => {
      if(user) {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/api/user/getMessages?to=${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(data);
    }
    };
    fetchMessages(currentChat._id);
  }, [currentChat._id]);

  useEffect(()=>{
    scrolRef.current.scrollIntoView({behavior:"smooth"})
  })

  const handleSelect = (user) => {
    setCurrentCaht(user);
  };

  useEffect(()=>{
    if(currentChat !== ""){
      socket.current = io(import.meta.env.VITE_SERVER_DOMAIN)
      socket.current.emit("addUser", userId);
    }
  },[userId]);

  const sendmsg = async () => {
    const messages = {
      myself:true,
      message:inputMessage
    }

    socket.current.emit("send-msg",{
      to:currentChat._id,
      message:inputMessage
    });

    let token = localStorage.getItem('token')
    let data = {
      to:currentChat._id,
      message:inputMessage
    }

    await axios.post('/api/user/sendMessage', data, {headers:{Authorization: `Bearer ${token}`}})
    setMessage(message.concat(messages))
  }

  useEffect(()=>{
    if(socket.current){
      socket.current.on("msg-receive", (msg)=>{
        setArrivalMessage({myself:false, message: msg})
      })
    }
  },[arrivalMessage])


  useEffect(()=>{
    arrivalMessage && setMessage((pre)=> [...pre, arrivalMessage] )
  },[arrivalMessage])

  return (
    <div className="m-[3rem]">
      <div className="flex h-[80vh] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full rounded-md bg-white overflow-x-hidden justify-center">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center h-10 w-10">
                <img src="\src\assets\comment.png" alt="profile" />
              </div>
              <div className="ml-2 text-[#91AABA] font-bold text-2xl">
                Messages
              </div>
            </div>
            <div className="flex flex-col items-center border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <div className="flex items-center justify-center h-full w-full bg-indigo-200 rounded-full">
                  {currentChat.userName && currentChat.userName[0]}
                </div>
              </div>
              <div className="text-sm font-semibold mt-2">
                {currentChat.userName ? currentChat.userName : ""}
              </div>
              <div className="text-xs text-gray-500">
                {currentChat.location && currentChat.location.country}
              </div>
            </div>

            <div className="flex flex-col mt-8 ">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {connections.length}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                {connections.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => handleSelect(user)}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  >
                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                      {user?.userName[0]} {console.log(user)}
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {user?.userName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="md:flex flex-col flex-auto h-full p-6 hidden">
            <div className="flex flex-col flex-auto rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto scrollbar-hide mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {message.map((msg) =>
                      msg.myself ? (
                        <div
                          key={msg._id}
                          className="col-start-6 col-end-13 p-3 rounded-lg"
                        >
                          <div className="flex items-center justify-start flex-row-reverse">
                            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                              <div>{msg.message}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          key={msg.message}
                          className="col-start-1 col-end-8 p-3 rounded-lg"
                        >
                          <div className="flex flex-row items-center">
                            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                              <div>{msg.message}</div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                    <div ref={scrolRef} />
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                <div className="flex-grow">
                  <div className="relative w-full">
                    <input
                      onChange={(e) => setInputMessage(e.target.value)}
                      type="text"
                      className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                    />
                    <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="ml-4">
                  <button
                    onClick={sendmsg}
                    className="flex items-center justify-center bg-darkBlue hover:bg-lightBlue rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Send</span>
                    <span className="ml-2">
                      <svg
                        className="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
