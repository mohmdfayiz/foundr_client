import React from "react";

export const Events = () => {
  return (
    <div className="mx-[3rem] my-[5rem]" id="events">
      <div className="text-center my-[3rem]">
        <h1 className="md:text-3xl text-xl font-bold text-darkBlue">
          GAME-CHANGING ADVICE FROM
          <br />
          FOUNDERS WHO HAVE MADE MILLIONS
        </h1>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="eventCard p-3 rounded shadow">
          <img
            className="coverImage"
            src="src\assets\pexels-igreja-dimensão-10401268.jpg"
            alt=""
          />
          <h2 className="font-bold text-darkBlue text-center my-1">Mentor</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              {" "}
              21 January, 10:00 AM
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
        <div className="eventCard p-3 rounded shadow">
          <img
            className="coverImage"
            src="src\assets\pexels-karolina-grabowska-4491461.jpg"
            alt=""
          />
          <h2 className="font-bold text-darkBlue text-center my-1">Mentor</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              {" "}
              21 January, 10:00 AM
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
        <div className="eventCard p-3 rounded shadow">
          <img
            className="coverImage"
            src="src\assets\pexels-matheus-bertelli-3321793.jpg"
            alt=""
          />
          <h2 className="font-bold text-darkBlue text-center my-1">Mentor</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              {" "}
              21 January, 10:00 AM
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
        <div className="eventCard p-3 rounded shadow">
          <img
            className="coverImage"
            src="src\assets\pexels-igreja-dimensão-10401268.jpg"
            alt=""
          />
          <h2 className="font-bold text-darkBlue text-center my-1">Mentor</h2>
          <div className="flex justify-center items-center">
            <img src="\src\assets\schedule.png" alt="Calender" width={20} />
            <p className="text-xs text-gray-400 text-center ml-1">
              {" "}
              21 January, 10:00 AM
            </p>
          </div>
          <div className="flex items-center justify-center">
            <button className="bg-darkBlue py-2 px-3 rounded-3xl text-white font-medium mt-2 hover:shadow-lg,border border-black">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
