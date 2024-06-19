import axios from "axios";

// interface IUserData {
//   birthday: string;
//   email: string;
//   lastName: string;
//   loginPhone: string;
//   name: string;
//   secondName: string;
//   userId: number;
// }

const client_id = "kTEd7L8tcvklItLg9XTQf5lkXiyYVfbg"; //account
const client_secret = "JcG3doDHAn3xEzvs2sbwqG8qfDvj1Uae"; //secure_password

export const getCdekTokenService = {
  async getCdekToken(): Promise<any> {
    const { data } = await axios.post(
      `https://api.cdek.ru/v2/oauth/token?client_id=${client_id}&client_secret=${client_secret}&grant_type=client_credentials`,
      {}
    );
    return data;
  },
};

export const getAddressesService = {
  async getAddresses(token: any): Promise<any> {
    //?region_code=71
    const { data } = await axios.get("https://api.cdek.ru/v2/deliverypoints", {
      headers: { Authorization: "Bearer " + token },
    });
    return data;
  },
};

export const getAllAddressService = {
  async getAddresses(token: any): Promise<any> {
    const { data } = await axios.get(`https://api.cdek.ru/v2/location/cities`, {
      headers: { Authorization: "Bearer " + token },
    });
    return data;
  },
};
