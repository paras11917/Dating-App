import { React, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faBan } from "@fortawesome/free-solid-svg-icons"
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons"
import { blockRoute, imageRoute, likeRoute, superlikeRoute } from "../utils/APIRoutes";
import axios from 'axios'
import { Buffer } from "buffer";
import { io } from "socket.io-client"
import Notification from "./Notification";

const fs = require('fs');


const Post = ({ loggeduser, user, socket }) => {
  const [notification, setNotification] = useState([])

  useEffect(() => {
    if (socket.current) {
      socket.current.on("like", (data) => {

        setNotification((prev) => [...prev, data]);
        console.log(data)
      });
      socket.current.on("superlike", (data) => {
        setNotification((prev) => [...prev, data]);
        console.log(data)
      });
    }
  }, []);

  useEffect(() => {
    if (notification) {
      notification.map((notification) => {
        return ( 
          <Notification data={notification} />
        )
      })
    }
  }, [notification]);

  const handleLike = () => {
    axios.post(likeRoute, { userId: loggeduser.email, likedUserId: user.email }).then((res, err) => {
      if (err) console.log(err)
     
      socket.current.emit("like", {
        to: user.email,
        from: loggeduser.email,
        message: `${loggeduser.name} liked your image!`
      });

    }).catch(err => {
      console.log(err)
    })
  }

  const handleSuperLike = () => {
    axios.post(superlikeRoute, { userId: loggeduser.email, superlikedUserId: user.email }).then((res) => {
      
      socket.current.emit("superlike", {
        to: user.email,
        from: loggeduser.email,
        message: `${loggeduser.name} superliked your image!`,
        image: `http://localhost:5000/api/auth/image/${user.name}`
      });
    }).catch(err => {
      console.log(err)
    })
  }

  const handleBlock = () => {
    axios.post(blockRoute, { userId: loggeduser.email, blockedUserId: user.email }).then((res) => {
      console.log('Block successful:', res.data);
    }).catch(err => {
      console.log(err)
    })
    console.log(`${loggeduser.name} blocked , ${user.name}`)
  }

  return (
    <div className="container m-5 ">
      {notification &&
        notification.map((notification) => {
          return (
            <Notification data={notification} />
          )
        })
      }
      <div className=" bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-4"
            src={`http://localhost:5000/api/auth/image/${user.name}`}
            alt="User Profile"
          />
          <div className="flex-1">
            <h2 className="text-lg font-medium">{user.name}</h2>
          </div>
        </div>

        <img
          className="mt-4 w-full rounded-lg"
          src={`http://localhost:5000/api/auth/image/${user.name}`}
          alt="Post Image"
        />
        <div className="mt-6">
          <button style={{ color: loggeduser.likes.includes(user.email)  ? "red" : "white" }} onClick={handleLike} className="px-4 py-2 rounded-full bg-indigo-500 ml-2">
            <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon> Like

          </button>
          <button style={{ color: loggeduser.superlikes.includes(user.email) ? "red" : "white" }} onClick={handleSuperLike} className="px-4 py-2 rounded-full bg-green-500 ml-2">
            <FontAwesomeIcon icon={faHeart}></FontAwesomeIcon> Superlike
          </button>
          <button onClick={handleBlock} className="px-4 py-2 rounded-full bg-red-500 text-white ml-2 mt-2">
            <FontAwesomeIcon icon={faBan}></FontAwesomeIcon> Block
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
