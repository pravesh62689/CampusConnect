import React from "react";
import { AiOutlineLink, AiFillGithub } from "react-icons/ai";

const Projects = () => {
  return (
    <div className="bg-navyBlue m-1 text-grey w-[18vw] py-2 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-lg font-semibold">Projects</h1>
      <div className="text-center h-[23.5vh] overflow-y-scroll w-[100%] px-1">
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
        <Block />
      </div>
    </div>
  );
};

const Block = () => {
  return (
    <div className="flex border cursor-pointer text-center my-1.5 rounded-md px-2 py-0.5 justify-between transition-all border-transparent hover:border-gray-600">
      <h1 className="font-semibold">SocioPath</h1>
      <div className="flex items-center">
        <AiFillGithub size={20} className="mx-1" />
        <AiOutlineLink size={20} className="mx-1" />
      </div>
    </div>
  );
};

export default Projects;
