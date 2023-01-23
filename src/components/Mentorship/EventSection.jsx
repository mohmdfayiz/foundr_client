import React from "react";
import EventCard from "./EventCard";
import EventModal from "./EventModal";

export const EventSection = () => {
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
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventCard/>
        <EventModal/>
      </div>
    </div>
  );
};
