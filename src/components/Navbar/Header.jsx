import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Account } from "./Account";
import foundrLogo from "../../assets/logo.svg";
import { navigation } from "../../constants";
import { ProfileModal } from "../Profiles/ProfileModal";
import { Toaster } from "react-hot-toast";
import { unAuthenticate } from "../../app/slices/authSlice";
import Notifications from "./Notifications";

export default function Header() {
  const { authenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // logout
  function userLogout() {
    localStorage.removeItem("token");
    dispatch(unAuthenticate());
    navigate("/", { replace: true });
  }
  return (
    <Popover className="relative bg-white">
      {authenticated && <ProfileModal />}
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="mx-auto container max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/">
              <img className="h-8 w-auto sm:h-12" src={foundrLogo} alt="logo" />
            </Link>
          </div>
          <div className="-my-2 -mr-2 flex gap-2 items-center md:hidden">
            {authenticated && <Notifications />}
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
              {authenticated && <Notifications />}
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
                  <img className="h-8 w-auto" src={foundrLogo} alt="logo" />
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
              {authenticated ? (
                <div
                  onClick={userLogout}
                  className="text-base cursor-pointer font-medium text-gray-900 hover:text-gray-700"
                >
                  Logout
                </div>
              ) : (
                <Link
                  to={'/signin'}
                  className="text-base cursor-pointer font-medium text-gray-900 hover:text-gray-700"
                >
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
