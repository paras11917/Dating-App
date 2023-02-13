import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { registerRoute } from "../utils/APIRoutes";
import axios from "axios"
import { isAuth } from "../actions/auth";
import { Buffer } from 'buffer'
const cookie = require('js-cookie')

const Register = () => {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [values, setValues] = useState({
    formData: '',
    error: '',
    sizeError: '',
    success: '',
    formData: '',
    title: '',
  });
  const { error, sizeError, success, formData, title, hidePublishButton } = values;

  // useEffect(() => {
  //   isAuth() && navigate('/')
  // }, [])

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  },[])


  const handleImageChange = name =>(e) => {
    if (e.target.files) {
      formData.set(name, e.target.files[0])
      setValues({ ...values, formData });
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  
  
  const handleInputChange = name => (e) => {
    formData.set(name, e.target.value);
    setValues({ ...values, [name]: e.target.value, formData });
	};

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData)

    axios.post(registerRoute, formData).then((data, err) => {
        if (err || !data) {
          console.log("error then")
        }
        cookie.set("token", data.data.token)
      localStorage.setItem("user", JSON.stringify(data.data.user))
        
        navigate("/");
      }).catch((err) => {
        console.log(err)
      })
      console.log("axios")
    
  };

  return (
    <div className="flex container py-40 justify-center">
    <div className="container w-1/2" >
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-medium mb-7">Sign Up</h2>
        <div className="mb-4">
          <label
            className="block font-medium mb-2 text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            placeholder="Name"
            type="text"
            name="name"
            id="name"
            onChange={handleInputChange('name')}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>
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
            onChange={handleInputChange('email')}
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
            onChange={handleInputChange('password')}
            className="w-full border border-gray-400 p-2 rounded-lg"
          />
        </div>

        <div className="m-10 w-1/2 container">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-medium mb-4">Image Upload</h2>
            {previewImage ? (
              <>
                <img src={previewImage} alt="Preview" className="w-full mb-4" />

              </>
            ) : (
              <>
                <div className="flex items-center justify-center h-64 bg-gray-200 mb-5">
                  <p className="text-gray-500">No image selected</p>
                </div>

                <label
                  className=" bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"

                >
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                      onChange={handleImageChange('image')}
                  />
                </label>
              </>
            )}
          </div>
        </div>




        <button
          type="submit"
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600"
        >
          Sign Up
        </button>
      </form>
      </div>
    </div>
  );
};

export default Register;
