import React, { useContext } from "react";
import Context from "../Context/Context";

const Profile = () => {
  const context = useContext(Context);
  return (
    <div className="bg-navyBlue m-1 text-grey w-[18vw] py-2 rounded-md flex flex-col justify-center items-center">
      <img
        className="w-[18vh] h-[18vh] rounded-full mt-1 object-cover object-center"
        src={
          context?.user?.profile
            ? context?.user?.profile
            : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
        }
      />
      <h1 className="font-semibold text-2xl">{context?.user?.name}</h1>
      <p className="text-gray-300 text-sm">{context?.user?.userName}</p>
      <p className="text-center text-sm px-3.5 pt-2">
        Experienced coder. Problem solving skills. Passionate about coding,
        sharing knowledge. Ready to collaborate and mentor
      </p>
    </div>
  );
};

export default Profile;
