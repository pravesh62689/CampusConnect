import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { AiOutlineMessage, AiOutlineSearch } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsCheckLg, BsQuestionLg } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import Context from "../Context/Context";
import Faq from "../Screen/Faq";
import Portfolio from "../Screen/Portfolio";

const Nav = ({ checkUser }) => {
  const history = useNavigate();
  const location = useLocation();
  const context = useContext(Context);
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const [displaySearch, setDisplaySearch] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="absolute">
        <Faq modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="bg-navyBlue text-grey flex items-center py-1 justify-between border-b border-gray-500">
        <img
          src="/logo.png"
          className="w-[15.5vw] ml-1 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            history("/home");
          }}
          alt="This is an logo"
        />
        {location.pathname === "/" ||
        location.pathname === "/register" ||
        location.pathname === "/Register" ? null : (
          <div className="flex items-center justify-end mr-3">
            {displaySearch ? (
              <input
                type="text"
                className="bg-transparent border outline-none px-3 py-1 rounded-full"
                placeholder="Enter Username"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            ) : null}
            <AiOutlineSearch
              size={38}
              onClick={(e) => {
                e.preventDefault();
                setDisplaySearch(!displaySearch);
              }}
              className="ml-2 border p-1.5 rounded-2xl cursor-pointer"
            />
            <img
              src="/playground.png"
              onClick={(e) => {
                e.preventDefault();
                history("/playground");
              }}
              className={`${
                displaySearch ? "w-[6%]" : "w-[8.5%]"
              } cursor-pointer ml-2`}
            />
            <div
              onClick={(e) => {
                e.preventDefault();
                history("/groupchat");
              }}
              className="cursor-pointer ml-2 text-[25px] font-medium border rounded-full flex justify-center items-center px-2.5"
            >
              C
            </div>
            <FiSettings
              size={36}
              className="ml-2 border p-1.5 rounded-2xl cursor-pointer"
            />
            <IoIosNotificationsOutline
              size={36}
              className="ml-2 border p-1.5 rounded-2xl cursor-pointer"
            />
            <BsQuestionLg
              size={35}
              className="ml-2 border p-1.5 rounded-2xl cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setIsOpen(true);
              }}
            />
            <AiOutlineUser
              size={36}
              onClick={(e) => {
                e.preventDefault();
                setShowProfile(!showProfile);
              }}
              className="ml-2 border p-1.5 rounded-2xl cursor-pointer"
            />
          </div>
        )}
      </div>
      {showProfile ? (
        <div className="w-[10vw] py-1.5 bg-navyBlue absolute right-5 rounded-lg border text-grey top-[8.5%] flex flex-col items-center justify-center">
          <button className="bg-blue my-2 text-navyBlue px-4 rounded-full border border-transparent transition-all hover:border-blue hover:text-blue hover:bg-transparent">
            Edit Profile
          </button>
          <button
            className="bg-blue mb-2 text-navyBlue px-4 rounded-full border border-transparent transition-all hover:border-blue hover:text-blue hover:bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              localStorage.clear();
              alert("Logged out successfully");
              setShowProfile(false);
              checkUser();
            }}
          >
            Logout
          </button>
        </div>
      ) : null}
      {search.length > 0 ? (
        <div className="w-[15vw] z-10 h-[15vh] overflow-y-scroll bg-navyBlue absolute right-[24%] rounded-lg border text-grey top-[8.5%] flex flex-col items-center justify-center">
          {context?.allUsers
            .filter((e) => {
              return e.userName.includes(search.toLowerCase());
            })
            .map((e) => {
              return (
                <div
                  className="w-full"
                  onClick={(e) => {
                    e.preventDefault();
                    setSearch("");
                  }}
                >
                  <Block data={e} />
                </div>
              );
            })}
        </div>
      ) : null}
    </>
  );
};

const Block = ({ data }) => {
  const context = useContext(Context);
  const history = useNavigate();

  return (
    <>
      <div
        onClick={(e) => {
          e.preventDefault();
          context.setClickedUser(data);
          context.setIsOpen(!context.modalIsOpen);
        }}
        className="bg-navyBlue ml-1 my-1 text-grey border p-1 rounded-lg cursor-pointer flex items-center justify-between transition-all border-transparent hover:border-gray-600"
      >
        <div className="flex items-center">
          <img
            className="w-[7vh] h-[7vh] object-cover object-center rounded-full"
            src={
              data?.profile
                ? data?.profile
                : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
            }
          />
          <div className="ml-2">
            <h1 className="font-semibold text-sm">{data?.name}</h1>
            <p className="text-gray-300 text-sm">{data?.userName}</p>
          </div>
        </div>
        <div>
          <AiOutlineMessage
            size={22}
            onClick={(e) => {
              e.stopPropagation();
              history("/playground");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Nav;
