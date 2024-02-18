import React, { useContext, useEffect, useState } from "react";
import { AiOutlineLike, AiFillLike, AiOutlineDelete } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { CgAdd } from "react-icons/cg";
import axios from "axios";
import { POST_URI } from "../Utils/index";
import Context from "../Context/Context";
import { format } from "timeago.js";
import ScrollToBottom from "react-scroll-to-bottom";
import { LOGIN_URI } from "../Utils/index";

const Feed = () => {
  const context = useContext(Context);
  const [addPost, setAddPost] = useState(false);
  const [details, setDetails] = useState({
    caption: "",
    location: "",
  });
  const [file, setfile] = useState();
  return (
    <div className="w-full bg-navyBlue  rounded-md">
      <div className="flex items-center justify-between px-6">
        <div></div>
        <h1 className="text-xl text-center py-2">
          {!addPost ? "Feed" : "Add New Post"}
        </h1>
        <div className="cursor-pointer">
          <CgAdd
            size={22}
            onClick={(e) => {
              e.preventDefault();
              setAddPost(!addPost);
            }}
          />
        </div>
      </div>
      <div className="overflow-y-scroll h-[76vh]">
        {addPost ? (
          <div className="mx-2 flex flex-col justify-center items-center">
            <input
              type="file"
              onChange={(e) => {
                setfile(e.target.files[0]);
              }}
              className="w-7/12 mt-2 mb-1"
            />
            <p>{file ? file.name : "No file is selected"}</p>
            <textarea
              name=""
              className="bg-transparent border outline-none my-2 rounded-xl px-2 py-1"
              cols="30"
              rows="4"
              value={details.caption}
              onChange={(e) => {
                setDetails({ ...details, caption: e.target.value });
              }}
              placeholder="Caption"
            ></textarea>
            <input
              value={details.location}
              onChange={(e) => {
                setDetails({ ...details, location: e.target.value });
              }}
              type="text"
              placeholder="Location"
              className="w-8/12 bg-transparent outline-none border rounded-xl px-3 py-0.5"
            />
            <button
              className="button"
              onClick={(e) => {
                e.preventDefault();
                const formData = new FormData();
                formData.append("photo", file);
                formData.append("caption", details.caption);
                formData.append("location", details.location);
                formData.append("userName", context?.user?.userName);
                formData.append("token", localStorage.getItem("token"));
                axios.post(`${POST_URI}/addPost`, formData).then((res) => {
                  console.log(res.data);
                  if (res.data === "Post saved successfully!") {
                    setTimeout(() => {
                      context.getPosts();
                    }, 2000);
                  }
                  setAddPost(false);
                });
              }}
            >
              Submit
            </button>
          </div>
        ) : (
          <div>
            {context?.posts.map((e, i) => {
              return <Block data={e} key={i} />;
            })}
          </div>
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
  const [message, setMessage] = useState("");
  const context = useContext(Context);
  const [user, setuser] = useState();

  useEffect(() => {
    setLikes([...data.like]);

    if (data?.like.includes(context?.user?._id)) {
      setLike(true);
    }
  }, []);

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
            <p className="-mt-1">{data?.location}</p>
          </div>
        </div>
        {data?.userId === context?.user?._id ? (
          <div className="mr-3">
            <AiOutlineDelete
              onClick={(e) => {
                e.preventDefault();
                axios
                  .delete(`${POST_URI}/deletePost`, {
                    data: {
                      id: data?._id,
                    },
                  })
                  .then((res) => {
                    if (res.data.deletedCount > 0) {
                      const posts = context.posts.filter((e) => {
                        return e._id !== data?._id;
                      });
                      context.setPosts([...posts]);
                      context?.getPosts();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className="cursor-pointer"
              size={25}
            />
          </div>
        ) : null}
      </div>
      <img className="w-full" src={data?.photo} />
      <div>
        <div className="flex p-2">
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
                .put(`${POST_URI}/updateLike`, {
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
          {likes.length} likes and {data.comment.length} comments...
        </p>
        <p className="px-2 text-sm">{data?.caption}</p>
        <p className="text-xs px-2 pb-1.5">{format(data?.time)}</p>
      </div>
      {showComments ? (
        <div className="h-[20vh] py-1 px-2">
          <ScrollToBottom className="overflow-y-scroll h-[67%] mb-1">
            {comments.map((e) => {
              return <Comment data={e} />;
            })}
          </ScrollToBottom>
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
                  .put(`${POST_URI}/addComments`, {
                    token: localStorage.getItem("token"),
                    message,
                    queryId: data?._id,
                    userName: context?.user?.userName,
                  })
                  .then((res) => {
                    setMessage("");
                    context?.getPosts();
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

export default Feed;
