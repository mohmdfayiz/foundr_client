import React, { useEffect, useState } from "react";
import axios from "axios";
import { modalVisiblity, setEvent } from "../../features/modalDisplay/eventSlice";
import { useDispatch } from "react-redux";
import EventModal from "./EventModal";

export const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const times = Array.from({ length: 4 });

  useEffect(() => {
    const getEvents = async () => {
      // const { data } = await axios.get("/api/user/getEvents");
      const data = 0
      if (data) {
        setEvents(data.events);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  const dispatch = useDispatch()
  const handleClick = (event) => {
    dispatch(setEvent(event))
    dispatch(modalVisiblity())
  }

  console.log(events);

  return (
    <div className="mx-[3rem] my-[3rem]" id="events">
      <EventModal />
      <div className="text-center my-[3rem]">
        <h1 className="md:text-3xl text-xl font-bold text-darkBlue">
          GAME-CHANGING ADVICE FROM
          <br />
          FOUNDERS WHO HAVE MADE MILLIONS
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {loading
          ? times.map((item, index) => (
              <div
                key={index}
                className="border border-blue-300 shadow eventCard p-3 rounded-md "
              >
                <div className="animate-pulse flex flex-col">
                  <div className="bg-slate-700 h-[180px] w-full"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-700 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                      </div>
                      <div className="h-5 bg-slate-700 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : events.map((event, index) => (
              <div key={index} className="eventCard p-3 rounded-md shadow-md ">
                <img
                  className="coverImage"
                  src={event.mentorImage}
                  alt="coverImg"
                />
                <h2 className="font-bold text-darkBlue text-center my-1">
                  {event.mentorName}
                </h2>
                <div className="flex justify-center items-center">
                  <img
                    src="\src\assets\schedule.png"
                    alt="Calender"
                    width={20}
                  />
                  <p className="text-xs text-gray-400 text-center ml-1">
                    {event.dateAndTime}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    onClick={ ()=> handleClick(event)}
                    className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black"
                  >
                    Join Now
                  </button>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
