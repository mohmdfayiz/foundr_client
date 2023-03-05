import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import { useSelector } from "react-redux";

export const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const times = Array.from({ length: 4 });
  const { paymentStatus } = useSelector((state) => state.eventModal);

  useEffect(() => {
    const getEvents = async () => {
      const { data } = await axios.get("/api/user/getEvents");
      if (data) {
        setEvents(data.events);
        setLoading(false);
      }
    };
    getEvents();
  }, [paymentStatus]);

  return (
    <div className="mx-auto container my-[3rem]" id="events">
      <EventModal />
      <div className="text-center my-[3rem]">
        <h1 className="sm:text-3xl text-lg font-bold text-darkBlue">
          GAME-CHANGING ADVICE FROM
        </h1>
        <h1 className="sm:text-3xl text-lg font-bold text-darkBlue">
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
              <EventCard event={event} key={index} />
            ))}
      </div>
    </div>
  );
};
