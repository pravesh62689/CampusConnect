import React, { useContext, useEffect, useState } from "react";
import Context from "../Context/Context";
import { io } from "socket.io-client";
import { format } from "timeago.js";
import { SOCKET_URI } from "../Utils";
import ScrollToBottom from "react-scroll-to-bottom";

const ChatSection = () => {
  const socket = io(SOCKET_URI);
  const context = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [messagegetInput, setMessageInput] = useState("");

  useEffect(() => {
    socket.emit("connection");
    socket.emit("join", { userId: context?.user?._id });
  }, [context?.user]);

  const handleMessageSubmit = (e) => {
    if (messagegetInput.trim() === "") {
      return;
    }
    //send message to the server
    if (context?.user?._id && messagegetInput && context?.clickedUser?._id) {
      socket.emit("message", {
        from: context?.user?._id,
        message: messagegetInput,
        to: context?.clickedUser?._id,
      });
    } else {
      alert("Internal server error");
    }
  };

  useEffect(() => {
    if (context?.clickedUser?._id) {
      context.getMessages(context?.clickedUser?._id);
    }
  }, [context?.clickedUser]);

  useEffect(() => {
    socket.on("message", (saveMessage) => {
      console.log(saveMessage);
      setMessages((prevMessage) => [...prevMessage, saveMessage]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  return (
    <div className="w-[62.65vw] bg-navyBlue my-1 h-[89.5vh] rounded-lg text-grey">
      <div className="flex py-2 px-3 items-center border-b border-gray-600">
        <img
          className="w-[8vh] h-[8vh] object-cover object-center rounded-full"
          src={
            context?.clickedUser?.profile
              ? context?.clickedUser?.profile
              : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
          }
        />
        <div className="ml-2">
          <h1 className="font-semibold text-lg -mt-1">
            {context?.clickedUser?.name}
          </h1>
          <p className="text-gray-300 -mt-1 text-sm">
            {context?.clickedUser?.userName}
          </p>
        </div>
      </div>
      <div className="h-[78.5vh]">
        {context?.clickedUser ? (
          <ScrollToBottom className="h-[90%] overflow-y-scroll p-0">
            {context?.messages.map((e) => {
              return <Chat data={e} />;
            })}
            {messages
              ?.filter((e) => {
                return (
                  (e.sender === context?.user?._id &&
                    e.receiver === context?.clickedUser?._id) ||
                  (e.receiver === context?.user?._id &&
                    e.sender === context?.clickedUser?._id)
                );
              })
              .map((e) => {
                return <Chat data={e} />;
              })}
          </ScrollToBottom>
        ) : (
          <div className="h-[91%] flex justify-center items-center text-2xl">
            Select a chat
          </div>
        )}
        <div className="w-full flex items-center justify-evenly">
          <input
            value={messagegetInput}
            type="text"
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                handleMessageSubmit();
                setMessageInput("");
              }
            }}
            className="bg-transparent outline-none border border-gray-400 w-[90%] pl-4 py-1 rounded-full"
            placeholder="Enter your message"
          />
          <button
            className="button"
            onClick={(e) => {
              handleMessageSubmit(e);
              setMessageInput("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

const Chat = ({ data }) => {
  const context = useContext(Context);
  return (
    <div
      className={`flex flex-col m-2 p-1.5 rounded-xl ${
        data?.sender === context?.user?._id
          ? "bg-blue text-grey float-right clear-both items-end"
          : "bg-grey text-navyBlue float-left clear-both"
      } w-[45%]`}
    >
      <p>{data?.message}</p>
      <p
        className={`text-sm ${
          data?.sender === context?.user?._id
            ? "text-left self-start"
            : "text-end"
        }`}
      >
        {format(data?.time)}
      </p>
    </div>
  );
};

export default ChatSection;
