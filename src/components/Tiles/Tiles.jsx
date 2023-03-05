import React from "react";
import { tileData } from "../../constants/index";

export const Tiles = () => {
  return (
    <div className="grid gap-4 max-w-7xl container md:grid-cols-3 sm:grid-cols-1 mx-auto px-[3rem]">
      {tileData.map((data, index) => (
        <div key={index} className="rounded bg-white justify-between px-3 py-5 shadow">
          <img src={data.icon} alt="icon" width={35} />
          <h3 className="text-darkBlue font-bold my-2">{data.title}</h3>
          <p className="text-lightBlue">{data.text}</p>
        </div>
      ))}
    </div>
  );
};
