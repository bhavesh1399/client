import axiosInstance from "./AxiosInstance";

export const getUsersListApi = () => axiosInstance.get("users/get-users-list");
