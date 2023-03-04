import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { modalVisiblity } from "../../features/modalDisplay/eventSlice";
import microphone from "../../assets/microphone.png";
import discord from "../../assets/discord.png";
import calendar from "../../assets/schedule.png";
import dateFormat from "dateformat";
import { Link } from "react-router-dom";
import Paypal from "./Paypal";

export default function EventModal() {
  const dispatch = useDispatch();
  const { visible, event } = useSelector((state) => state.eventModal);
  const { authenticated } = useSelector((state) => state.auth);
  const { userId } = useSelector((state) => state.loggedUser);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    authenticated && setRegistered(event?.attendees?.includes(userId));
  }, []);

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => dispatch(modalVisiblity())}
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
          <div className="fixed inset-0 hidden bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl">
                <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => dispatch(modalVisiblity())}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  <div className="grid w-full grid-cols-1 items-start gap-y-8 gap-x-6 sm:grid-cols-12 lg:gap-x-8">
                    <div className="aspect-w-2 aspect-h-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
                      <img
                        src={event.mentorImage}
                        alt="speaker img"
                        className="object-cover object-center"
                      />
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-darkBlue sm:pr-12">
                        {event.title}
                      </h2>

                      <section
                        aria-labelledby="information-heading"
                        className="mt-2"
                      >
                        <h3 id="information-heading" className="sr-only">
                          Event information
                        </h3>

                        <p className="text-xs text-gray-900">
                          {event.description}
                        </p>
                        <div className="mt-6">
                          <h4 className="sr-only">Talk</h4>
                          <div className="flex items-center">
                            <img src={microphone} alt="mike" width={25} />
                            <h2 className="ml-2 text-gray-500">
                              {event.mentorName}
                            </h2>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="sr-only">Venue</h4>
                          <div className="flex items-center">
                            <img src={discord} alt="Discord" width={25} />
                            <h2 className="ml-2 text-gray-500">
                              {event.venue}
                            </h2>
                          </div>
                        </div>
                        <div className="mt-2">
                          <h4 className="sr-only">Date</h4>
                          <div className="flex items-center">
                            <img src={calendar} alt="Calender" width={25} />
                            <h2 className="ml-2 text-gray-500">
                              {dateFormat(
                                event.dateAndTime,
                                "dddd, mmmm d, h:MM TT"
                              )}
                            </h2>
                          </div>
                        </div>
                      </section>

                      <section
                        aria-labelledby="options-heading"
                        className="mt-5"
                      >
                        {!registered && (
                          <div>
                            <p
                              id="options-heading"
                              className="text-md text-darkBlue font-bold"
                            >
                              Join now for just ${event.enrollmentFee}{" "}
                              dollars!
                            </p>
                            <span className="text-sm text-darkBlue">
                              Get the invitation link to your registered Email.
                            </span>
                          </div>
                        )}
                        {authenticated && !registered ? (
                          <Paypal event={event} />
                        ) : (
                          <Link
                            to={"/signin"}
                            className="border rounded-sm px-3 py-1 text-darkBlue border-darkBlue text-sm"
                          >
                            Signin for Join
                          </Link>
                        )}
                      </section>
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
}
