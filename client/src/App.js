import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router";
import "./index.css";

import Login from "./Screen/Login";
import Register from "./Screen/Register";
import Main from "./Screen/Main";
import Playground from "./Screen/Playground";
import Nav from "./Component/Nav";
import Context from "./Context/Context";
import axios from "axios";
import { BACKEND_URI, LOGIN_URI, POST_URI, QUERY_URI } from "./Utils/index";
import GroupChatSection from "./Screen/GroupChatSection";

const App = () => {
  const [user, setUser] = useState();
  const [idUser, setIdUser] = useState();
  const history = useNavigate();
  const location = useLocation();
  const [allUsers, setAllUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState();
  const [posts, setPosts] = useState([]);
  const [queries, setQueries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [groupChats, setGroupChats] = useState([]);

  const getUserById = (id) => {
    axios.post(`${LOGIN_URI}/getUserById`, { id }).then((response) => {
      setIdUser(response.data);
    });
  };

  const checkUser = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.post(`${LOGIN_URI}/checkUser`, { token }).then((response) => {
        if (response.data._id) {
          setUser(response.data);
          if (location.pathname === "/") {
            history("/home");
          } else {
            history(location.pathname);
          }
        } else {
          alert("Token expired");
          localStorage.clear();
        }
      });
    } else {
      history("/");
    }
  };

  const getUsers = () => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post(`${LOGIN_URI}/getUser`, { token })
        .then((response) => {
          setAllUsers(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getMessages = (userId) => {
    const token = localStorage.getItem("token");
    axios
      .post(`${BACKEND_URI}/getMessages/${userId}`, { token })
      .then((res) => {
        setMessages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getGroupMessages = () => {
    axios
      .get(`${BACKEND_URI}/getGroupChat`)
      .then((res) => {
        setGroupChats(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPosts = () => {
    axios.get(`${POST_URI}/getPosts`).then((res) => {
      setPosts(res.data);
    });
  };

  const getQueries = () => {
    axios.get(`${QUERY_URI}/getQueries`).then((res) => {
      setQueries(res.data);
    });
  };

  useEffect(() => {
    if (
      location.pathname !== "/Register" &&
      location.pathname !== "/register"
    ) {
      checkUser();
    }
  }, [history, localStorage]);

  useEffect(() => {
    getPosts();
    getUsers();
    getQueries();
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        allUsers,
        clickedUser,
        setClickedUser,
        getMessages,
        messages,
        posts,
        setPosts,
        idUser,
        getUserById,
        getPosts,
        getQueries,
        queries,
        setQueries,
        modalIsOpen,
        setIsOpen,
        getGroupMessages,
        groupChats,
      }}
    >
      <Nav checkUser={checkUser} />
      <Routes>
        <Route path="/" element={<Login checkUser={checkUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Main />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/groupchat" element={<GroupChatSection />} />
      </Routes>
    </Context.Provider>
  );
};

export default App;
