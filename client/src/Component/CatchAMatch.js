import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import { AiOutlineMessage } from "react-icons/ai";
import { useNavigate } from "react-router";
import Portfolio from "../Screen/Portfolio";

const TechDates = () => {
  const context = useContext(Context);
  return (
    <div className="bg-navyBlue h-[43.5vh] m-1 text-grey w-[18vw] py-2 rounded-md flex flex-col justify-center items-center">
      <h1 className="text-xl font-semibold pb-1">Catch A Match</h1>
      <div className="overflow-y-scroll h-[95%]">
        {context?.allUsers.map((e) => {
          return <Block data={e} />;
        })}
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  const context = useContext(Context);
  const history = useNavigate();

  return (
    <>
      <div>
        <Portfolio
          modalIsOpen={context.modalIsOpen}
          setIsOpen={context.setIsOpen}
        />
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          context.setClickedUser(data);
          context.setIsOpen(!context.modalIsOpen);
        }}
        className="bg-navyBlue my-2 text-grey border w-[17vw] px-2 py-1 rounded-lg cursor-pointer justify-between flex items-center transition-all border-transparent hover:border-gray-600"
      >
        <div className="flex items-center">
          <img
            className="w-[6.5vh] h-[6.5vh] object-cover object-center rounded-full"
            src={
              data?.profile
                ? data?.profile
                : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
            }
          />
          <div className="ml-1.5">
            <h1 className="font-semibold">{data?.name}</h1>
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

export default TechDates;
