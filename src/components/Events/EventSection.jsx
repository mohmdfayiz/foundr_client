import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";
import axios from "axios";

export const EventSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const { data, status } = await axios.get("/api/user/getEvents");
      if (status === 200) {
        setEvents(data.events);
        setLoading(false);
      }
    };
    getEvents();
  }, []);

  console.log(events);

  return (
    <div className="mx-[3rem] my-[3rem]" id="events">
      <div className="text-center my-[3rem]">
        <h1 className="md:text-3xl text-xl font-bold text-darkBlue">
          GAME-CHANGING ADVICE FROM
          <br />
          FOUNDERS WHO HAVE MADE MILLIONS
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        {loading ? (
          <div class="border border-blue-300 shadow eventCard p-3 rounded-md ">
            <div class="animate-pulse flex flex-col space-x-4">
              <div class="bg-slate-700 h-[180px] w-full"></div>
              <div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="space-y-3">
                  <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                  </div>
                  <div class="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          events.map((event, index) => (
            <EventCard
              key={index}
              mentorImage={event.mentorImage}
              mentorName={event.mentorName}
              dateAndTime={event.dateAndTime}
            />
          ))
        )}
      </div>
    </div>
  );
};
