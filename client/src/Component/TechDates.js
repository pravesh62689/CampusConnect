import React from "react";
import { results } from "./newsData";

const TechDates = () => {
  return (
    <div className="bg-navyBlue h-[45vh] m-1 text-grey w-[18vw] py-2 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold pb-1">TechDates</h1>
      <div className="overflow-y-scroll">
        {results?.articles.map((e, i) => {
          return <Block key={i} data={e} />;
        })}
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        window.open(data?.url);
      }}
      className="flex items-center py-1 my-0.5 ml-1 justify-between px-0.5 cursor-pointer border transition-all rounded-md border-transparent hover:border-gray-600"
    >
      <img
        src={data?.urlToImage}
        className="w-2/5 h-full object-cover object-center ml-1 rounded-md"
        alt=""
      />
      <div className="ml-2">
        <p className="font-semibold text-sm">
          {data.title.slice(0, 15) + "..."}
        </p>
        <p className="text-sm">{data.description.slice(0, 30) + ".."}</p>
      </div>
    </div>
  );
};

export default TechDates;
