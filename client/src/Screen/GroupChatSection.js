import React from "react";
import Profile from "../Component/Profile";
import GroupChat from "./GroupChat";
import TechDates from "../Component/TechDates";
import Skills from "../Component/Skills";
import Projects from "../Component/Projects";
import CatchAMatch from "../Component/CatchAMatch";

const GroupChatSection = () => {
  return (
    <div className="flex justify-between bg-cgreen h-[90vh] overflow-y-hidden">
      <div>
        <Profile />
        <Skills />
        <Projects />
      </div>
      <div>
        <GroupChat />
      </div>
      <div>
        <TechDates />
        <CatchAMatch />
      </div>
    </div>
  );
};

export default GroupChatSection;
