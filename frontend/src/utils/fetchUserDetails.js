import Api from "../config/Api";
import Axios from './Axios';

export const fetchUserDetails = async () => {
  try {
    const response = await Axios(Api.userDetails);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user details with Axios:", error);
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
    throw error;
  }
};

export default fetchUserDetails;
