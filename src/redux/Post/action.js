import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api"; // Replace with your actual API URL

export const addSubscription =
  (title, startDate, endDate, token, onSuccess) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/subscription/create-subscription`,
        {
          title,
          startDate,
          endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
