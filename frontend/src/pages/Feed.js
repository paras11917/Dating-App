import axios from "axios";
import React, { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../actions/auth";
import Post from "../components/Post";
import { getAllRoute, userRoute } from "../utils/APIRoutes";
import {io} from "socket.io-client"

const Feed = () => {
   const [users, setUsers] = useState(null)
   const [loggeduser, setloggeduser] = useState(null)
   const [loggeduserID, setloggeduserID] = useState("")
   var Id = JSON.parse(localStorage.getItem("user"))._id;

   const navigate = useNavigate()
   
   
   const [socketUser, setsocketUser] = useState("")
   
   
   
   const socket = useRef();
   useEffect(() => {
      if (loggeduser) {
         socket.current = io("http://localhost:8000/")
         socket.current.emit("newUser", loggeduser.email)
      }
   }, [loggeduser])





   useEffect(() => {
      !isAuth() && navigate('/login')
   },[])

   useEffect(() => {
      if (Id) {

         axios.get(`${getAllRoute}${Id}`).then((users, err) => {
            if (err || !users) console.log("err users")
            else {
               setUsers(users.data.usersdata)
               setloggeduser(users.data.loggeduser)
            }
         }).catch((err) => {
            console.log(err)
         })
      }
      
   },[loggeduser])

   



   return (
      <div className="h-screen flex justify-center overflow-y-scroll bg-white rounded-lg shadow-lg">
         <div style={{minWidth:350}} className="py-20 p-6 w-1/2 mr-9">
            
            {(users && loggeduser) ?
               (
                  users.map((user) => {
                     return (
                        <Post key={user._id} user={user} loggeduser={loggeduser} socket={socket} />
                     )
                  })
               ) : ( 
                  <>
                  <h1 className="text-6xl" >Loading... </h1>
                     <p className="py-5" >fetching data may take time</p>
                  </>
               )
            }
         </div>
      </div>
   );
};

export default Feed;