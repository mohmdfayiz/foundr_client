import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { showModal } from "../../app/slices/matchingProfileSlice";
import avatar from "../../assets/man.png";
import linkedIn from "../../assets/linkedin.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setConnectionRequests } from "../../app/slices/loggedUserSlice";
import { setChatUser } from "../../app/slices/currentChatSlice";
import { useNavigate } from "react-router-dom";
import { setNotification } from "../../app/slices/notificationSlice";
import profileBackground from "../../assets/profile-background.jpg"
export const ProfileModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cancelButtonRef = useRef(null);
  const { show, profile } = useSelector((state) => state.profileModal);
  const { connectionRequests } = useSelector((state) => state.loggedUser);
  const [action, setAction] = useState(false);

  // modal close
  function onClick() {
    dispatch(showModal());
  }

  // taking token form local storage
  const token = localStorage.getItem("token");
  const { userId } = useSelector((state) => state.loggedUser);

  // Check if the selected user has an existing request with the logged user
  const existingRequest = connectionRequests.find(
    (request) =>
      request.sender === profile._id || request.receiver === profile._id
  );

  // when user click connect button
  const handleConnection = async (user) => {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const data = {
      receiver: user._id,
      type: "request",
      message: "sent you a connection request",
    };
    const { status } = await axios.post(
      `/api/user/connectionRequest`,
      data,
      config
    );
    if (status === 201) {
      setAction(!action);
      toast.success("Request sent successfully");
    }
  };

  // handle response of a rquest came to logged user
  const handleResponse = async (reqFrom, response) => {
    const data = {
      reqFrom,
      response,
      type: "response",
      message: response
        ? "Request accepted, Send a message now!"
        : "Request rejected, They missed the opportunity!",
    };
    const { status } = await axios.post(
      "/api/user/updateConnectionResponse",
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (status === 201) {
      setAction(!action);
      response
        ? toast.success(`Connection made successfully`)
        : toast.success("Connection rejected.");
    }
  };

  // fetch all the connection requests of logged users
  const fetchRequests = async (token) => {
    const { data } = await axios.get("/api/user/getRequests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data.connectionRequests);
  };

  // fetch all notification from database
  const fetchNotifications = async (token) => {
    const { data } = await axios.get("/api/user/getNotifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data.notifications);
  };

  // navigate to chat with Connection
  const chatWithConnection = (profile) => {
    dispatch(setChatUser(profile));
    dispatch(showModal());
    navigate("/messages");
  };

  useEffect(() => {
    fetchRequests(token).then((data) => {
      dispatch(setConnectionRequests(data));
    });
  }, [profile._id, action]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchNotifications(token).then((data) => {
      dispatch(setNotification(data));
    });
  }, [action]);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={onClick}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-50 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-gray-100 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-5xl">
                <div
                  className="flex justify-end mr-2 mt-2 text-gray-600 cursor-pointer"
                  onClick={onClick}
                  ref={cancelButtonRef}
                >
                  <CloseIcon />
                </div>
                <div className="sm:px-16 py-10">
                  <div className="bg-white rounded-lg shadow-xl pb-5">
                    <div className="w-full h-[200px]">
                      <img
                        src={profileBackground}
                        className="w-full h-full rounded-tl-lg rounded-tr-lg"
                      />
                    </div>
                    <div className="flex flex-col items-center -mt-20">
                      <img
                        src={profile.profilePhoto || avatar}
                        className="w-40 h-40 object-cover border-4 border-white rounded-full"
                      />
                      <div className="flex items-center space-x-2 mt-2">
                        <p className="text-2xl">{profile.userName}</p>
                      </div>
                      <p className="text-md text-gray-500 flex gap-2">
                        {`${profile?.location?.country}, ${profile?.location?.city}`}{" "}
                        |
                        <a href="#" target={"_blank"}>
                          <img
                            src={linkedIn}
                            alt="linkedInLogo"
                            className="w-5 h-5"
                          />
                        </a>
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
                      <div className="flex items-center space-x-4 mt-2">
                        {!existingRequest && (
                          <button
                            onClick={() => handleConnection(profile)}
                            className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                            </svg>
                            <span>Connect</span>
                          </button>
                        )}
                        {connectionRequests.map((request) => {
                          if (
                            request.sender === profile._id &&
                            request.status === "pending"
                          ) {
                            // Request is towards logged user and is pending
                            return (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleResponse(profile._id, true)
                                  }
                                  className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                  >
                                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
                                  </svg>
                                  <span>Accept</span>
                                </button>
                                <button
                                  onClick={() =>
                                    handleResponse(profile._id, false)
                                  }
                                  className="flex items-center bg-gradient-to-r from-rose-400 to-red-500 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100"
                                >
                                  <span>Reject</span>
                                </button>
                              </div>
                            );
                          } else if (
                            request.receiver === profile._id &&
                            request.status === "pending"
                          ) {
                            // Request is sent by logged user and is pending
                            return (
                              <button className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100">
                                <span>Requested</span>
                              </button>
                            );
                          } else if (
                            (request.receiver === profile._id ||
                              request.sender === profile._id) &&
                            request.status === "accepted"
                          ) {
                            // Request has been accepted
                            return (
                              <button
                                onClick={() => chatWithConnection(profile)}
                                className="flex items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg text-sm space-x-2 transition duration-100"
                              >
                                <span>Message</span>
                              </button>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="my-4 p-5 bg-white rounded-lg shadow-xl flex flex-col gap-3">
                    <div>
                      <h2 className="text-sm font-semibold">About</h2>
                      <p className="text-sm text-gray-400">{profile?.intro}</p>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">
                        Impressive Accomplishments
                      </h2>
                      <p className="text-sm text-gray-400">
                        {profile?.accomplishments}
                      </p>
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold">Education</h2>
                      <p className="text-sm text-gray-400">
                        {profile?.education}
                      </p>
                    </div>
                    {profile.employment && (
                      <div>
                        <h2 className="text-sm font-semibold">Employment</h2>
                        <p className="text-sm text-gray-400">
                          {profile?.employment}
                        </p>
                      </div>
                    )}
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Is Technical
                      </p>
                      <span className="bg-slate-100 col-span-2 sm:col-span-1 text-gray-500 text-sm text-center m-1 rounded-md py-1 px-2">
                      {profile?.isTechnical ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Has Idea
                      </p>
                      <span className="bg-slate-100 col-span-2 sm:col-span-1 text-gray-500 text-sm text-center m-1 rounded-md py-1 px-2">
                        {profile?.haveIdea ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Interests
                      </p>
                      <span className="py-1 col-span-6 flex flex-wrap text-sm">
                        {profile?.interests?.map((interest) => (
                          <span key={interest} className="bg-slate-100  text-gray-500 m-1 rounded-md py-1 px-2">
                            {interest}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Responsibilities
                      </p>
                      <span className="py-1 col-span-6 flex flex-wrap text-sm">
                        {profile?.responsibilities?.map((responsibility) => (
                          <span key={responsibility} className="bg-slate-100  text-gray-500 m-1 rounded-md py-1 px-2">
                            {responsibility}
                          </span>
                        ))}
                      </span>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
