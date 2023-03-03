import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { unAuthenticate } from "../../features/authentication/authSlice";
import avatar from "../../assets/man.png";
import { Popover, Transition } from "@headlessui/react";
import {
  showModal,
  setProfile,
} from "../../features/modalDisplay/matchingProfileSlice";
import Notification from "../../assets/Notification.svg";

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);
  function userLogout() {
    localStorage.removeItem("token");
    dispatch(unAuthenticate());
    navigate("/", { replace: true });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // when user click view profile in notification
  const handleViewProfile = (profile) => {
    dispatch(setProfile(profile));
    dispatch(showModal());
  };

  return (
    <>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={classNames(
                open ? "text-lightBlue" : "text-darkBlue",
                "group bg-white text-base font-medium hover:text-lightBlue focus:outline-none"
              )}
            >
              <img src={Notification} width={30} alt="noficication" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm -translate-x-3/4 transform px-2 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid gap-y-3 bg-white px-3 py-4">
                    {!notifications.length && (
                      <div className="flex justify-center items-center">
                        <p className="text-darkBlue">
                          There is no notification for you.
                        </p>
                      </div>
                    )}
                    {notifications.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => handleViewProfile(item.sender)}
                        className="flex cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                      >
                        <img
                          src={item.sender?.profilePhoto || avatar}
                          alt="profilePhoto"
                          className="h-10 w-10 object-cover rounded-full"
                        />
                        <div className="ml-4">
                          <p className="text-gray-900">
                            {item?.sender?.userName}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {item?.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      <Popover className="relative">
        {() => (
          <>
            <Popover.Button
              className={classNames(
                "group bg-white focus:outline-none"
              )}
            >
              <img
                src={avatar}
                className="rounded-full"
                width={35}
                alt="profile"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 mt-2 w-[10rem] -translate-x-3/4 transform px-2 sm:px-0">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="relative grid bg-white px-3 py-4">
                    <li
                      key={"message"}
                      className="text-[#326789] hover:text-lightBlue my-1.5"
                    >
                      <Link to={"/messages"}>Messages</Link>
                    </li>
                    <li
                      key={"account"}
                      className="text-[#326789] hover:text-lightBlue my-1.5"
                    >
                      <Link to={"/account"}>Account</Link>
                    </li>
                    <hr />
                    <button
                      onClick={userLogout}
                      className="text-[#326789] hover:text-lightBlue my-1"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
      {/* <div className="dropdown">
        <img width={35} className="rounded-full" src={avatar} alt="profile" />
        <div className="dropdown-content">
          <li
            key={"message"}
            className="text-[#326789] hover:text-lightBlue my-1.5"
          >
            <Link to={"/messages"}>Messages</Link>
          </li>
          <li
            key={"account"}
            className="text-[#326789] hover:text-lightBlue my-1.5"
          >
            <Link to={"/account"}>Account</Link>
          </li>
          <hr />
          <button
            onClick={userLogout}
            className="text-[#326789] hover:text-lightBlue my-1"
          >
            Logout
          </button>
        </div>
      </div> */}
    </>
  );
};
