import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setChatUser } from "../../app/slices/currentChatSlice";
import messageIcon from "../../assets/comment.png";
import { toast } from "react-hot-toast";
import InputEmoji from "react-input-emoji";
import dateFormat from "dateformat";
import avatar from "../../assets/man.png";

const Messages = () => {
  const [connections, setConnections] = useState([]);
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const { userId } = useSelector((state) => state.loggedUser);
  const { chatUser } = useSelector((state) => state.currentChat);
  const scrolRef = useRef();
  const socket = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getConnections = async () => {
      const { data } = await axios.get("/api/user/getConnections", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setConnections(data.connections);
    };
    getConnections();
  }, []);

  useEffect(() => {
    const fetchMessages = async (user) => {
      if (user) {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`/api/user/getMessages?to=${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(data);
      }
    };
    fetchMessages(chatUser._id);
  }, [chatUser._id]);

  useEffect(() => {
    scrolRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const handleSelect = (user) => {
    dispatch(setChatUser(user));
  };

  useEffect(() => {
    if (chatUser._id !== "") {
      socket.current = io(import.meta.env.VITE_SERVER_DOMAIN);
      socket.current.emit("addUser", userId);
    }
  }, [userId]);

  const sendmsg = async () => {
    if (!inputMessage) {
      return toast.error("Message should not be empty!");
    }
    const messages = {
      myself: true,
      message: inputMessage,
      time: Date.now(),
    };

    socket.current.emit("send-msg", {
      to: chatUser._id,
      message: inputMessage,
    });

    let token = localStorage.getItem("token");
    let data = {
      to: chatUser._id,
      message: inputMessage,
    };

    await axios.post("/api/user/sendMessage", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setInputMessage("");
    setMessage(message.concat(messages));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg, time: Date.now() });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  function groupMessagesByDay(message) {
    const groups = {};
    message.forEach((message) => {
      const date = new Date(message.time);
      const dateString = date.toLocaleDateString();
      if (groups[dateString]) {
        groups[dateString].push(message);
      } else {
        groups[dateString] = [message];
      }
    });
    return groups;
  }
  const groups = groupMessagesByDay(message);

  return (
    <div className="m-4 sm:m-[3rem]">
      <div className="flex h-[80vh] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full rounded-md bg-white overflow-x-scroll overflow-y-hidden scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center h-10 w-10">
                <img src={messageIcon} alt="profile" />
              </div>
              <div className="ml-2 text-[#91AABA] font-bold text-2xl">
                Messages
              </div>
            </div>
            <div className="flex flex-col items-center border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                {chatUser.profilePhoto ? (
                  <img src={chatUser.profilePhoto} alt="profilePhoto" />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-indigo-200 rounded-full">
                    {/* {chatUser.userName && chatUser.userName[0]} */}
                    <img src={avatar} alt="profilePhoto" />
                  </div>
                )}
              </div>
              <div className="text-sm font-semibold mt-2">
                {chatUser.userName && chatUser.userName}
              </div>
              <div className="text-xs text-gray-500">
                {chatUser.location && chatUser.location.country}
              </div>
            </div>

            <div className="flex flex-col mt-8">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                  {connections.length}
                </span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
                {connections.map((user) => (
                  <button
                    key={user._id}
                    onClick={() => handleSelect(user)}
                    className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                  >
                    <div className="flex items-center justify-center overflow-hidden h-8 w-8 bg-blue-100 rounded-full">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="profilePhoto" />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-blue-100 rounded-full">
                          {user.userName && user.userName[0]}
                        </div>
                      )}
                    </div>
                    <div className="ml-2 text-sm font-semibold">
                      {user?.userName}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-auto h-full p-6 min-w-[380px]">
            <div className="flex flex-col flex-auto rounded-2xl bg-gray-100 h-full p-4">
              <div className="flex flex-col h-full overflow-x-auto scrollbar-hide mb-4">
                <div className="flex flex-col h-full">
                  <div className="grid grid-cols-12 gap-y-2">
                    {Object.keys(groups).map((date) => (
                      <>
                        <div
                          key={date}
                          className="col-span-12 text-center mt-2"
                        >
                          <span className="bg-darkBlue text-white rounded-md py-1 px-2 text-xs ">
                            {dateFormat(date, "longDate")}
                          </span>
                        </div>
                        {groups[date].map((msg) =>
                          msg.myself ? (
                            <div
                              key={msg.time}
                              className="col-start-6 col-end-13 p-3 rounded-lg"
                            >
                              <div className="flex items-center justify-start flex-row-reverse">
                                <div className="relative min-w-[100px] mr-3 text-sm bg-blue-100 py-2 px-4 shadow rounded-xl">
                                  <p>{msg.message}</p>
                                  <div className="flex justify-end">
                                    <p className="text-[10px] text-gray-400">
                                      {dateFormat(msg.time, "shortTime")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                              key={msg.time}
                              className="col-start-1 col-end-8 p-3 rounded-lg"
                            >
                              <div className="flex flex-row items-center">
                                <div className="relative min-w-[100px] ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                  <p>{msg.message}</p>
                                  <div className="flex justify-end">
                                    <p className="text-[10px] text-gray-400">
                                      {dateFormat(msg.time, "shortTime")}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    ))}
                    <div ref={scrolRef} />
                  </div>
                </div>
              </div>

              {!chatUser._id ? (
                <div className="flex justify-center items-center text-lightBlue">
                  <p>Select an active conversation</p>
                </div>
              ) : (
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div className="flex-grow">
                    <div className="relative w-full">
                      <InputEmoji
                        value={inputMessage}
                        onChange={setInputMessage}
                        theme={"light"}
                        placeholder="Type a message"
                      />
                    </div>
                  </div>
                  <div className="ml-2">
                    <button
                      onClick={sendmsg}
                      className="flex items-center justify-center bg-darkBlue hover:bg-lightBlue rounded-xl text-white h-8 w-12 sm:h-10 sm:w-16 flex-shrink-0"
                    >
                      <span className="">
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
