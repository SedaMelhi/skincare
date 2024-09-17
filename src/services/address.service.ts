import axios from "axios";
import { API_URL } from ".";

// export const getCityService = {
//     async getCity(query: string): Promise<any> {
//       const { data } = await axios.get('https://kladr-api.ru/api.php', {
//        params: {
//         token: "K226ee2G5A9BBGeTENyf7BENnKArzadA",
//         query,
//         contentType: 'city',
//         withParent: 1,
//         limit: 15
//        }
//       });
//       return data.result.filter(({id}:any) => id !== "Free");
//     },
// };

axios.defaults.baseURL = API_URL;

export const getCityService = {
  async getCity(query: string): Promise<any> {
    const { data } = await axios.post("v1/user.php", {
      type: "searchCity",
      typeId: "courier",
      city: query,
    });
    return data;
  },
};

export const getStreetService = {
  async getStreet(query: string, city: string): Promise<any> {
    const { data } = await axios.post("v1/user.php", {
      type: "searchStreet",
      street: query,
      city: "Москва",
    });
    return data;
  },
};

// export const getStreetService = {
//   async getStreet(query: string, cityId: string): Promise<any> {
//     const { data } = await axios.get("https://kladr-api.ru/api.php", {
//       params: {
//         token: "K226ee2G5A9BBGeTENyf7BENnKArzadA",
//         query,
//         contentType: "street",
//         withParent: 1,
//         limit: 15,
//         cityId,
//         oneString: 1,
//       },
//     });
//     return data.result?.filter(
//       ({ id, contentType }: any) => id !== "Free" && contentType === "street"
//     );
//   },
// };
