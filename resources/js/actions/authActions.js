import { SET_CURRENT_USER,SET_CURRENT_USER_EXIST,SET_CURRENT_USER_NOT_FOUND } from './user_types';
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user:user,
  };
}

export function logout() {
  return dispatch => {
    
  }
}

export function setCurrentUserExist(user) {
  return {
    type: SET_CURRENT_USER_EXIST,
    user:user,
  };
}

export function checkValidUser(type,msg) {
  return {
    type: type,
    user:msg,
  };
}

export function isPropCheck(){
  
  return dispatch => {
   return {
     type : "hello"
   }
  }
}

export function login(data) {
  return dispatch => {
    dispatch(setCurrentUser(999));
  }

}
