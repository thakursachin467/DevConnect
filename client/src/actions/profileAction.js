import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  GET_ERRORS,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";
import { showLoading, hideLoading } from "react-redux-loading-bar";

/**
 * ? GET CURRENT PROFILE
 */

export const getCurrentProfile = () => dispatch => {
  dispatch(showLoading());
  dispatch(setProfileLoading());
  axios
    .get("/api/profiles")
    .then(res => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
    });
};

// PROFILE LOADING
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

/**
 * ! clear profile
 */
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

/**
 * ! create a profile
 */

export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("api/profiles", profileData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete entire account

export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure? this action cannot be reversed!")) {
    axios
      .delete("/api/profiles")
      .then(res => {
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        });
      })
      .catch(err => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
      });
  }
};

//add experience

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("api/profiles/experience", expData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//add education

export const addEducation = (eduData, history) => dispatch => {
  axios
    .post("api/profiles/education", eduData)
    .then(res => {
      history.push("/dashboard");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`api/profiles/experience/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`api/profiles/education/${id}`)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//get all profiles

export const getProfiles = () => dispatch => {
  dispatch(showLoading());
  dispatch(setProfileLoading());
  axios
    .get("api/profiles/users")
    .then(res => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILES,
        payload: null
      });
    });
};

//get profile by handle

export const getProfileByHandle = handle => dispatch => {
  dispatch(showLoading());
  dispatch(setProfileLoading());
  axios
    .get(`/api/profiles/${handle}`)
    .then(res => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};

//get profile by handle

export const getProfileById = id => dispatch => {
  console.log("here");
  dispatch(showLoading());
  dispatch(setProfileLoading());
  axios
    .get(`/api/profiles/user/${id}`)
    .then(res => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(setProfileLoading());
      dispatch(hideLoading());
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
    });
};
