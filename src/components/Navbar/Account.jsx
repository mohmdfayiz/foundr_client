import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { unAuthenticate } from "../../app/slices/authSlice";
import avatar from "../../assets/man.png";
import { Popover, Transition } from "@headlessui/react";

export const Account = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function userLogout() {
    localStorage.removeItem("token");
    dispatch(unAuthenticate());
    navigate("/", { replace: true });
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button
            className={classNames("group bg-white focus:outline-none")}
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
                  <div
                    onClick={userLogout}
                    className="text-[#326789] hover:text-lightBlue my-1 cursor-pointer`"
                  >
                    Logout
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
