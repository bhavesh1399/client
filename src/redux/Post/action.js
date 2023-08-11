import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API URL

export const addpost = (formData, onSuccess) => async (dispatch) => {
  console.log(formData, "API CALL data");
  try {
    const { data } = await axios.post(
      `${API_BASE_URL}/post/create-post`,
      formData
    );
    if (!data.success) {
      toast.error(data.message);
      return;
    }

    onSuccess();
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.message || error?.message);
  }
};
