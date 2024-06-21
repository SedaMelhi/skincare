import axios from "axios";

const API_URL = "https://b.skincareagents.com/local/api/v1/";
axios.defaults.baseURL = API_URL;

export const getNotificationsService = {
  async getNotifications(token: string): Promise<any> {
    const { data } = await axios.post("/user.php", {
      type: "getNotifications",
      token,
    });
    return data;
  },
};
