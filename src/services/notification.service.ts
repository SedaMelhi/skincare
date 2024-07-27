import axios from "axios";

export const getNotificationsService = {
  async getNotifications(token: string): Promise<any> {
    const { data } = await axios.post(
      "https://b.skincareagents.com/local/api/v1/user.php",
      {
        type: "getNotifications",
        token,
      }
    );
    console.log("getNotifications", data);
    return data;
  },
};
