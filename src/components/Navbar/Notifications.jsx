import { Popover, Transition } from "@headlessui/react";
import { showModal, setProfile } from "../../app/slices/matchingProfileSlice";
import Notification from "../../assets/Notification.svg";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import avatar from "../../assets/man.png";

function Notifications() {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => state.notification);

  // when user click view profile in notification
  const handleViewProfile = (profile) => {
    dispatch(setProfile(profile));
    dispatch(showModal());
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <img
              src={Notification}
              className="w-6 md:w-8"
              alt="Noficications"
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
            <Popover.Panel className="absolute z-10 mt-3 w-screen max-w-sm -translate-x-3/4 transform px-2 sm:px-0">
              <div className="overflow-hidden  max-h-96 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
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
  );
}

export default Notifications;
