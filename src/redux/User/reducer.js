import {
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  REFRESH_STATE,
  RESET_IS_SIGNING,
  SET_IS_SIGNING,
  SET_LOGGEDIN_USER,
  SET_LOGGEDOUT_USER,
  SET_IS_SUBMITING,
  RESET_IS_SUBMITING,
} from "./type.js";

const initialState = {
  loggedInUser: null,
  token: null,
  isLoading: false,
  error: "",
  isSigning: false,
  isSubmiting: false,
  users: [],
  selecteduser: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: action.payload.users,
        selecteduser: null,
        totalPage: action.payload.totalpage,
        error: "",
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        users: [],
        selecteduser: null,
        error: action.payload,
      };

    case SET_LOGGEDIN_USER:
      return {
        ...state,
        loggedInUser: action.payload.user,
        token: action.payload.token,
        error: "",
        isSigning: false,
      };
    case SET_LOGGEDOUT_USER:
      return {
        ...state,
        ...initialState,
      };
    case SET_IS_SIGNING:
      return {
        ...state,
        isSigning: true,
      };
    case RESET_IS_SIGNING:
      return {
        ...state,
        isSigning: false,
      };
    case SET_IS_SUBMITING:
      return {
        ...state,
        isSubmiting: true,
      };
    case RESET_IS_SUBMITING:
      return {
        ...state,
        isSubmiting: false,
      };
    case REFRESH_STATE:
      return {
        ...state,
        token: action.payload.token,
        loggedInUser: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
