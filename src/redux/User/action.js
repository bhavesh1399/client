// src/redux/actions.js
import axios from "axios";
import toast from "react-hot-toast";
import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  SET_LOGGEDOUT_USER,
} from "./type";
import { getUsersListApi } from "../../services/UserServices";
const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API URL

export const setLoggedOutUser = () => {
  return {
    type: SET_LOGGEDOUT_USER,
  };
};
export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};
export const fetchUsersSuccess = (users, totalpage) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: { users },
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

export const login = (email, password, role, onSuccess) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/users/login`, {
      email,
      password,
      role,
    });
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    localStorage.setItem("token", data.data.token);
    localStorage.setItem("role", data.data.userDetail.role);
    localStorage.setItem("user", JSON.stringify(data.data.userDetail));
    toast.success(data.message);
    onSuccess();
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};
export const signup =
  (email, password, name, onSuccess) => async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/users/register`, {
        email,
        password,
        name,
      });
      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      onSuccess();
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

export const loggingOutUserThunkAction = (onSuccess) => {
  return async (dispatch) => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      onSuccess();
    } catch (error) {}
  };
};

export const fetchUsersthunkAction = (onSuccess, onError) => {
  return async (dispatch) => {
    try {
      dispatch(fetchUsersRequest());
      const { data } = await getUsersListApi();

      if (data.success !== true) {
        throw new Error(data.message);
      }
      dispatch(fetchUsersSuccess(data?.data?.userDetail));

      onSuccess();
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
      onError(error?.response?.data?.message || error.message);
    }
  };
};
