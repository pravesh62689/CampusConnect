import React, { useState } from "react";
import { useNavigate } from "react-router";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import { LOGIN_URI } from "../Utils/index";

const Login = ({ checkUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(true);
  const history = useNavigate();
  return (
    <div className="bg-navyBlue h-[90vh] flex pb-14">
      <div className="flex justify-center items-center flex-col w-1/2 mb-10">
        <img src="/people.png" className="w-2/12" alt="" />
        <img src="/logoText.png" alt="" className="mt-2" />
        <p className="text-grey text-xl font-semibold mt-1 flex">
          Create Learn and Engage
        </p>
      </div>
      <div class="w-1/2 flex flex-col justify-center items-center text-grey">
        <h2 className="text-4xl font-bold mb-4">Login</h2>
        <input
          type="text"
          placeholder="Email or Username"
          className="input"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <div className="flex items-center justify-between w-5/12">
          <input
            type={showPass ? "password" : "text"}
            placeholder="Password *"
            className="input relative"
            style={{ width: "100%", paddingRight: "2.5rem" }}
            value={user.password}
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
            }}
          />
          <div className="absolute left-[83%]">
            {showPass ? (
              <AiOutlineEye
                size={25}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                size={25}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPass(!showPass);
                }}
              />
            )}
          </div>
        </div>
        <button
          className="button"
          onClick={(e) => {
            e.preventDefault();
            if (user.password && user.email) {
              axios
                .post(`${LOGIN_URI}/sign-in`, user)
                .then((response) => {
                  if (response.data.length > 0) {
                    alert(response.data);
                  } else {
                    localStorage.setItem("token", response.data.token);
                    alert("Login Success!");
                    checkUser();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert("Please fill all the fields");
            }
          }}
        >
          Login Now
        </button>
        <p
          className="underline cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            history("/register");
          }}
        >
          Create new account
        </p>
      </div>
    </div>
  );
};

export default Login;
