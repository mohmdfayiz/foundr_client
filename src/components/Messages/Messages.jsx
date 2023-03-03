import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setChatUser } from "../../features/currentChat/currentChatSlice";
import EmojiPicker from "emoji-picker-react";
import messageIcon from "../../assets/comment.png";

const Messages = () => {
  const [connections, setConnections] = useState([]);
  const [message, setMessage] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showEmogies, setShowEmogies] = useState(false);
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const { userId } = useSelector((state) => state.loggedUser);
  const { chatUser } = useSelector((state) => state.currentChat);
  const scrolRef = useRef();
  const socket = useRef();
  const dispatch = useDispatch();

  const onEmojiClick = (event, emojiObject) => {
    setInputMessage(emojiObject)
  };

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
    if (chatUser !== "") {
      socket.current = io(import.meta.env.VITE_SERVER_DOMAIN);
      socket.current.emit("addUser", userId);
    }
  }, [userId]);

  const sendmsg = async () => {
    const messages = {
      myself: true,
      message: inputMessage,
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
    setInputMessage('')
    setMessage(message.concat(messages));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ myself: false, message: msg });
      });
    }
  }, [arrivalMessage]);

  useEffect(() => {
    arrivalMessage && setMessage((pre) => [...pre, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <div className="m-[3rem]">
      <div className="flex h-[80vh] antialiased text-gray-800">
        <div className="flex flex-row h-full w-full rounded-md bg-white overflow-x-hidden justify-center">
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
                    {chatUser.userName && chatUser.userName[0]}
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
                    <div className="flex items-center justify-center overflow-hidden h-8 w-8 bg-indigo-200 rounded-full">
                      {user.profilePhoto ? (
                        <img src={user.profilePhoto} alt="profilePhoto" />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-indigo-200 rounded-full">
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

              {!chatUser._id ? (
                <div className="flex justify-center items-center text-lightBlue">
                  <p>Select an Active conversation</p>
                </div>
              ) : (
                <div>
                  {showEmogies && (
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      height={"400px"}
                      autoFocusSearch={false}
                      previewConfig={{ showPreview: false }}
                      skinTonesDisabled={true}
                    />
                  )}
                  <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  <div className="flex-grow">
                    <div className="relative w-full">
                      <input
                        onChange={(e) => setInputMessage(e.target.value)}
                        value={inputMessage}
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                      />
                      <button
                        onClick={() => setShowEmogies(!showEmogies)}
                        className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                      >
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
                
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
