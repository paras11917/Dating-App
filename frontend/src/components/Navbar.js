import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuth } from '../actions/auth';
import { logoutRoute } from '../utils/APIRoutes';
import cookie from 'js-cookie';

const Navbar = () => {
   const navigate = useNavigate()
   // const [showPopup,setShowpopup] = useState(false)

   // const handleShowPopup = () => {
   //    setShowpopup(!showPopup)
   // }
   

   const logout = () => {
      axios.get(logoutRoute)
      localStorage.removeItem("user")
      cookie.remove("token")
      navigate("/login")
   }
   return (
      <nav className="fixed w-full flex items-center justify-between p-4 bg-gray-900">
         <div className="flex items-center">
            
            <h1 className="text-white font-medium ml-4">Dating App</h1>
         </div>
         <div className="flex items-center">
            {/* <button onClick={handleShowPopup}>
            <div class="mr-5 inline-flex relative w-fit">
               <div class="absolute inline-block top-0 right-0 bottom-auto left-auto translate-x-2/4 -translate-y-1/2 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 p-2.5 text-xs bg-red-700 rounded-full z-10"></div>
               <div class="px-2 py-1 bg-indigo-400 flex items-center justify-center text-center rounded-lg shadow-lg">
                  <div>
                     <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="mx-auto text-white w-7" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path>
                     </svg>
                  </div>
               </div>
               </div>
            </button>
            {showPopup && <div style={{minWidth:300,maxWidth:350}} class="absolute top-20 right-10 bg-blue-100 rounded-lg py-4 px-4 mb-4 mr-3 text-base text-blue-700 " role="alert">
                <img
                  className="w-12 h-12 rounded-full mr-4"
                  src={`http://localhost:5000/api/auth/image/paraspipre`}
               />
               message message message message message message message 
            </div>} */}
            {!isAuth() && 
               <>
            <Link to="/login" className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded">
               Sign In
            </Link>
            <Link to="/register" className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded ml-4">
               Sign Up
               </Link>
               </>
            }
            {isAuth() &&
               <>
                  <button onClick={logout} className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded">
                     LogOut
                  </button>
               </>
            }
         </div>
      </nav>
   );
};

export default Navbar;