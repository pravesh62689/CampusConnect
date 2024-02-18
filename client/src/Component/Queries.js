import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import { QUERY_URI } from "../Utils/index";
import axios from "axios";
import Context from "../Context/Context";
import { format } from "timeago.js";
import { LOGIN_URI } from "../Utils/index";

const Queries = () => {
  const [showAddQuery, setShowAddQuery] = useState(false);
  const context = useContext(Context);
  const [details, setDetails] = useState({
    question: "",
  });
  return (
    <div className="w-full bg-navyBlue  rounded-md">
      <div className="flex items-center justify-between px-6">
        <div></div>
        <h1 className="text-xl text-center py-2">
          {showAddQuery ? "Ask a Query" : "Queries"}
        </h1>
        <div className="cursor-pointer">
          <CgAdd
            onClick={(e) => {
              e.preventDefault();
              setShowAddQuery(!showAddQuery);
            }}
            size={22}
          />
        </div>
      </div>
      <div className="overflow-y-scroll h-[76vh]">
        {showAddQuery ? (
          <div className="mx-2 flex flex-col justify-center items-center">
            <textarea
              name=""
              className="bg-transparent border outline-none my-2 rounded-xl px-2 py-1"
              cols="30"
              rows="4"
              value={details.question}
              onChange={(e) => {
                setDetails({ ...details, question: e.target.value });
              }}
              placeholder="Write a question..."
            ></textarea>
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                axios
                  .post(`${QUERY_URI}/addQuery`, {
                    question: details.question,
                    userName: context?.user?.userName,
                    token: localStorage.getItem("token"),
                  })
                  .then((res) => {
                    console.log(res.data);
                    if (res.data === "Post saved successfully!") {
                      context.getQueries();
                    }
                    setShowAddQuery(false);
                    setDetails({ question: "" });
                  });
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <>
            {context.queries.map((e, i) => {
              return <Block data={e} key={i} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

const Block = ({ data }) => {
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const context = useContext(Context);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLikes([...data.like]);

    if (data?.like.includes(context?.user?._id)) {
      setLike(true);
    }
  }, []);

  const [user, setuser] = useState();
  useEffect(() => {
    setComments([...data.comment]);

    axios
      .post(`${LOGIN_URI}/getUserById`, { id: data?.userId })
      .then((response) => {
        setuser(response.data);
      });
  }, [data]);

  return (
    <div className="border border-gray-600 mx-3 mb-3 rounded-xl">
      <div className="flex justify-between items-center w-full">
        <div className="flex pl-2 pt-2 pb-1 items-center">
          <img
            className="w-[6vh] h-[6vh] object-cover object-center rounded-full"
            src={
              user?.profile
                ? user?.profile
                : "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
            }
            alt=""
          />
          <div className="ml-3">
            <h1 className="text-lg font-semibold">{data?.userName}</h1>
          </div>
        </div>
        {data?.userId === context?.user?._id ? (
          <div className="mr-3">
            <AiOutlineDelete
              onClick={(e) => {
                e.preventDefault();
                axios
                  .delete(`${QUERY_URI}/deleteQueries`, {
                    data: {
                      id: data?._id,
                    },
                  })
                  .then((response) => {
                    console.log(response);
                    if (response.data.deletedCount > 0) {
                      const queries = context.queries.filter((e) => {
                        return e._id !== data?._id;
                      });
                      context.setQueries([...queries]);
                      context?.getQueries();
                    }
                  });
              }}
              className="cursor-pointer"
              size={25}
            />
          </div>
        ) : null}
      </div>
      <p className="px-2 pb-1">{data?.question}</p>
      <div className="p-1.5">
        <div className="flex pb-1.5">
          <div
            onClick={(e) => {
              e.preventDefault();
              if (likes.includes(context?.user?._id)) {
                const index = likes.indexOf(context?.user?._id);
                const tempLikes = likes;
                tempLikes.splice(index, 1);
                setLikes([...tempLikes]);
                setLike(false);
              } else {
                setLike(true);
                setLikes([...likes, context?.user?._id]);
              }
              axios
                .put(`${QUERY_URI}/updateVote`, {
                  id: data?._id,
                  like: context?.user?._id,
                })
                .then((res) => {
                  console.log(res.data);
                });
            }}
          >
            {like ? (
              <AiFillLike size={24} className="ml-1 cursor-pointer" />
            ) : (
              <AiOutlineLike size={24} className="ml-1 cursor-pointer" />
            )}
          </div>
          <BiComment
            size={24}
            onClick={(e) => {
              e.preventDefault();
              setShowComments(!showComments);
            }}
            className="mx-2 cursor-pointer"
          />
        </div>
        <p className="px-2 text-sm">
          {likes.length} votes and {data.comment.length} answer...
        </p>
        <p className="text-xs pt-1 pl-2">{format(data.time)}</p>
      </div>
      {showComments ? (
        <div className="h-[20vh] py-1 px-2">
          <div className="overflow-y-scroll h-[67%] mb-1">
            {comments.map((e) => {
              return <Comment data={e} />;
            })}
          </div>
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="Enter a comment"
              className="w-10/12 bg-transparent outline-none border border-grey py-0.5 px-2 rounded-full"
              name=""
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              id=""
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                axios
                  .put(`${QUERY_URI}/addComments`, {
                    token: localStorage.getItem("token"),
                    message,
                    queryId: data?._id,
                    userName: context?.user?.userName,
                  })
                  .then((res) => {
                    setMessage("");
                    context?.getQueries();
                  });
              }}
              className="bg-blue my-1 text-navyBlue px-3 rounded-full border border-transparent transition-all hover:border-blue hover:text-blue hover:bg-transparent"
            >
              Post
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const Comment = ({ data }) => {
  return (
    <div className="border mb-1.5 w-full text-grey border-gray-600 rounded-md flex justify-start items-start pl-2 py-1">
      {" "}
      <div className="flex items-start">
        <img
          className="w-[10%] rounded-full mt-0.5"
          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhARBxAREBUVFRUTFRASDRIPERUTFRUWFyAWExMYHSggJBolHRMYITEhJSkuMjAuFx83ODMtOigtLisBCgoKDQ0NDg8QDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABgQFAgMBB//EADMQAQABAgEJBgUEAwAAAAAAAAABAgQDBREUITFBUVOREiJhcaHRFSMygZITUsHwQrHh/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAEQH/2gAMAwEAAhEDEQA/AP60AqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM93d4VrR8yde6mNsg0PyZiNqfuMp3GNPdnsRwp2/edrHVVNU96ZnznOQqsiYnZrfqSiZjY1W+ULnBn6u1HCrX67VhVGMllfYV1GaO7V+2Z/1LWgAAAAAAAAAAAAAAAAAAAAAA+F7c02uBNU652RHGU3i4leNiTViTnmWvK+POLdzEbKdX33/wB8GFUAAAAftNU0VRNM5pjXEwosm3cXWD3vqjb7pxpsMebe6pndsnykFKAigAAAAAAAAAAAAAAAAABG0I2gk66prrmZ3zM9Xl6qpmiqYndMx0eVQAAAAABVW9Xbt6JnfTTPWH0fO3p7FvRE7qaY9H0RQAAAAAAAAAAAAAAAAAAAE9lfB/SvJmNlWuP5/vixKW+tYusDNvjXE+PsnMSirDrmK4zTG2FR5AAAAaLHB0i6pp3Z88+UPhETM6lBkyz0XCz1/VO3wjgDaAigAAAAAAAAAAAAAAAAAAADNeWWHd097VO6qNv38GkBOXGT7nAnXT2o406/TayK55roor+uInziJWkSbRgWVxj/AEUzm/dOqFHTh4dE92mI8qYh7KkY7HJ+Ha6571XHNqjyhsBFAAAAAAAAAAAAAAAAAAAYco38W0dnD11ekefsDTj3GFb058aqI8N8+UOdjZZpifk0Z/Gqc3pDlYmJXiV58SZmeMvCxHRnLFxuinpPufF7nhR+M+7nAOj8XueFH4z7nxe54UfjPu5wDo/F7nhR+M+58XueFH4z7ucA6Pxe54UfjPufGLnhR0n3c4B18LLWv51H3pn+JdG3usG5j5U/bZV0S79pqmmrPTOaeMapIVWjmZNyl+tMUXG3dVx8J8XTRQAAAAAAAAAAAAAHwvbiLa3mrfsiPFNVVVV1TNU55nXMuhlzF7VxFMf4x6z/AMzOauJoAAAAAAAAAAAD9UOTLrSbfv8A1U6p8eEp1syTi/pXscKu712eoYogEUAAAAAAAAAAABNZRmar7Ez8c3TV/DOpqrS3rqmaqKZmd+Z+aFa8unotSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJoUuhWvLp6GhWvLp6FImhS6Fa8unoaFa8unoUiaFLoVry6ehoVry6ehSJp6wp7OLTMbpiekqPQrXl09DQrXl09CkaAEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//9k="
        />
        <div className="ml-2.5">
          <p className="text-gray-300 text-sm font-semibold">
            {data?.userName}
          </p>
          <p className="text-gray-300 text-sm">{data?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default Queries;
