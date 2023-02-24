import { Fragment, useEffect } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../../features/notification/notificationSlice";
import {
  showModal,
  setProfile,
} from "../../features/modalDisplay/matchingProfileSlice";
import axios from "axios";
import { Account } from "./Account";
import avatar from "../../assets/man.png";
import { navigation } from "../../constants";
import { setConnectionRequests } from "../../features/loggedUser/loggedUserSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { authenticated } = useSelector((state) => state.auth);
  const { notifications } = useSelector((state) => state.notification);

  const dispatch = useDispatch();
  const fetchNotifications = async (token) => {
    const { data } = await axios.get("/api/user/getNotifications", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data.notifications);
  };

  const fetchRequests = async (token) => {
    const { data } = await axios.get("/api/user/getRequests", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return Promise.resolve(data.connectionRequests);
  };

  useEffect(() => {
    if (authenticated) {
      const token = localStorage.getItem("token");
      fetchNotifications(token).then((data) => {
        dispatch(setNotification(data));
      });
      fetchRequests(token).then((data) => {
        dispatch(setConnectionRequests(data));
      });
    }
  }, [authenticated]);

  const handleViewProfile = (profile) => {
    dispatch(setProfile(profile));
    dispatch(showModal());
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-3 max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <img
                className="h-8 w-auto sm:h-12"
                src="\src\assets\logo.svg"
                alt="logo"
              />
            </Link>
          </div>
          <div className="-my-2 -mr-2 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>

          <div className="hidden items-centerx md:flex md:flex-1 lg:w-0 justify-end">
            <Popover.Group
              as="nav"
              className="hidden space-x-10 md:flex items-center"
            >
              <Link
                to="/"
                className="text-base font-medium text-darkBlue hover:text-lightBlue"
              >
                Home
              </Link>
              <Link
                to="/articles"
                className="text-base font-medium text-darkBlue hover:text-lightBlue"
              >
                Articles
              </Link>
              <Link
                to="/events"
                className="text-base font-medium text-darkBlue hover:text-lightBlue"
              >
                Events
              </Link>

              {authenticated && (
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={classNames(
                          open ? "text-lightBlue" : "text-darkBlue",
                          "group inline-flex items-center rounded-md bg-white text-base font-medium hover:text-lightBlue focus:outline-none"
                        )}
                      >
                        <span>Notifications</span>
                        <ChevronDownIcon
                          className={classNames(
                            open ? "text-lightBlue" : "text-darkBlue",
                            "ml-2 h-5 w-5 group-hover:text-gray-500"
                          )}
                          aria-hidden="true"
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
                        <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-md -translate-x-1/2 transform px-2 sm:px-0">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative grid gap-3 bg-white px-3 py-4">
                              {notifications.map((item, index) => (
                                <div
                                  key={index}
                                  className="flex p-2 rounded-lg hover:bg-gray-50"
                                >
                                  <img
                                    src={item.sender?.profilePhoto || avatar}
                                    alt="profilePhoto"
                                    className="h-14 w-14 object-cover rounded-full"
                                  />
                                  <div className="ml-4">
                                    <p className="text-gray-900">
                                      {item?.sender?.userName}
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {item?.message}
                                    </p>
                                  </div>
                                  <div className="flex justify-end items-center ml-6">
                                    <button
                                      onClick={() =>
                                        handleViewProfile(item.sender)
                                      }
                                      className="text-darkBlue font-semibold text-sm"
                                    >
                                      View Profile
                                    </button>
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
              )}
              {authenticated && <Account />}
            </Popover.Group>
          </div>
        </div>
      </div>

      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute z-10 inset-x-0 top-0 origin-top-right transform p-2 transition md:hidden"
        >
          <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="px-5 pt-5 pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <img
                    className="h-8 w-auto"
                    src="/src/assets/logo.svg"
                    alt="logo"
                  />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-darkBlue">
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-m-3 flex items-center rounded-md p-2 hover:bg-gray-50"
                    >
                      <span className="ml-3 text-base font-medium text-gray-900">
                        {item.name}
                      </span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
            <div className="py-3 px-8">
              <Link
                to="/"
                className="text-base font-medium text-gray-900 hover:text-gray-700"
              >
                Logout
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
