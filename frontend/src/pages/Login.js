import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { loginRoute } from "../utils/APIRoutes";
import axios from "axios";
import cookie from "js-cookie";
import { isAuth } from "../actions/auth";

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // useEffect(() => {
  //   isAuth() && navigate('/')
  // }, [])

  const validateForm = () => {
    const { email, password } = formData;
    if (email === "") return false;
    else if (password === "") return false;
    return true;
  };

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("valid")
      const { email, password } = formData;
      axios.post(loginRoute, {
        email,
        password,
      }).then((data, err) => {
        console.log(err)
        console.log('login', data.data.token)
        
      cookie.set("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))

        navigate("/");
      }).catch(err => {
        console.log(err)
      })

    }
  };

  return (
    <div className="py-40 container flex justify-center items-center  " >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-7">Sign In</h2>

        <div className="mb-4">
          <label
            className="block font-medium mb-2 text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <div className="mb-4">
          <label
            className="block font-medium mb-2 text-gray-700"
            htmlFor="password"
          >
            Password
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Login;
