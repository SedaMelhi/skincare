import axios from "axios";


export const getCityService = {
    async getCity(query: string): Promise<any> {
      const { data } = await axios.get('https://kladr-api.ru/api.php', {
       params: {
        token: "K226ee2G5A9BBGeTENyf7BENnKArzadA",
        query,
        contentType: 'city',
        withParent: 1,
        limit: 15
       }
      });
      return data.result.filter(({id}:any) => id !== "Free");
    },
};
  
export const getStreetService = {
    async getStreet(query: string, cityId:string): Promise<any> {
      const { data } = await axios.get('https://kladr-api.ru/api.php', {
       params: {
        token: "K226ee2G5A9BBGeTENyf7BENnKArzadA",
        query,
        contentType: 'street',
        withParent: 1,
        limit: 15,
        cityId,
        oneString: 1
       }
      });
      return data.result?.filter(({id, contentType}:any) => id !== "Free" && contentType === 'street'    );
    },
  };


  

