import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { showModal } from "../../features/modalDisplay/matchingProfileSlice";
import avatar from "../../assets/man.png";
import linkedIn from "../../assets/linkedin.png";
import axios from "axios";
import { toast } from "react-hot-toast";

export const ProfileModal = () => {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const { show } = useSelector((state) => state.profileModal);
  const { profile } = useSelector((state) => state.profileModal);
  console.log(profile);
  async function onClick() {
    dispatch(showModal());
  }

  const handleConnection = async (user) => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const { status } = await axios.post(
      `/api/user/connectionRequest?to=${user}`,
      {},
      config
    );
    if (status === 201) {
      toast.success("Request sent successfully");
    }
  };

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
                <div className="px-16 py-10">
                  <div className="bg-white rounded-lg shadow-xl pb-5">
                    <div className="w-full h-[200px]">
                      <img
                        src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
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
                        <button
                          onClick={() => handleConnection(profile._id)}
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
                      </div>
                    </div>
                  </div>
                  <div className="my-4 p-5 bg-white  rounded-lg shadow-xl flex flex-col gap-3">
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
                      <span className="py-1 border text-center border-gray-600 text-sm rounded-md">
                        {profile?.isTechnical ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Has Idea
                      </p>
                      <span className="py-1 border text-center border-gray-600 text-sm rounded-md">
                        {profile?.haveIdea ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Interests
                      </p>
                      <span className="py-1 border text-center col-span-6 border-gray-600 text-sm rounded-md">
                        {profile?.interests?.map((interest)=> interest + ", ") }
                      </span>
                    </div>
                    <div className="grid grid-cols-8">
                      <p className="col-span-2 text-sm font-semibold">
                        Responsibilities
                      </p>
                      <span className="py-1 border text-center col-span-6 border-gray-600 text-sm rounded-md">
                        {profile?.responsibilities?.map((interest)=> interest + ", ") }
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
