// const { API } = require("../config");
const cookie = require('js-cookie')


export const setCookie = (key, value) => {
   if (typeof window === 'undefined') {
      cookie.set(key, value, {
         expires: 1
      })
    }
}

export const removeCookie = (key) => {
   if (typeof window === 'undefined') {
      cookie.remove(key, {
         expires: 1
      })
    }
}

export const getCookie = (key) => {
   if (typeof window === 'undefined') {
      return cookie.get(key)
    }
}

export const setLocalStorage = (key, value) => {
   if (typeof window === 'undefined') {
      localStorage.setItem(key, JSON.stringify(value))
   }
}

export const removeLocalStorage = (key) => {
   if (typeof window === 'undefined') {
      localStorage.removeItem(key)
   }
}

export const authenticate = (data, next) => {
   setCookie('token', data.token)
   setLocalStorage('user', data.user)
   next()
}

export const isAuth = () => {
   const cookieChecked = cookie.get('token')
   if (cookieChecked) {
      if (localStorage.getItem('user')) {
         return JSON.parse(localStorage.getItem('user'))
      } else {
         return false
      }
   }
}


export const updateUser = (user, next) => {
   if (typeof window === 'undefined') {
      if (localStorage.getItem('user')) {
         let auth = JSON.parse(localStorage.getItem('user'));
         auth = user;
         localStorage.setItem('user', JSON.stringify(auth));
         next();
      }
    }
};




