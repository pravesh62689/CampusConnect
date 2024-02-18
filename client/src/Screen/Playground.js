import React from "react";
import Profile from "../Component/Profile";
import MainFeed from "../Component/MainFeed";
import TechDates from "../Component/TechDates";
import Skills from "../Component/Skills";
import Projects from "../Component/Projects";
import CatchAMatch from "../Component/CatchAMatch";
import ChatSection from "./ChatSection";

const Main = () => {
  return (
    <div className="flex justify-between bg-cgreen h-[90vh] overflow-y-hidden">
      <div>
        <Profile />
        <Skills />
        <Projects />
      </div>
      <div>
        <ChatSection />
      </div>
      <div>
        <TechDates />
        <CatchAMatch />
      </div>
    </div>
  );
};

export default Main;
