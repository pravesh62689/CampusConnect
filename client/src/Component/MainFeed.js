import React from "react";
import Topbar from "./Topbar";
import Feed from "./Feed";
import Queries from "./Queries";

const MainFeed = () => {
  return (
    <div className="flex flex-col">
      <Topbar />
      <div className="w-[62.5vw] flex">
        <div className="text-grey w-[50%] flex flex-col mr-1 justify-center items-center">
          <Feed />
        </div>
        <div className="text-grey w-[50%] flex flex-col justify-center items-center">
          <Queries />
        </div>
      </div>
    </div>
  );
};

export default MainFeed;
