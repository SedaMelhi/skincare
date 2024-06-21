import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface IAddress {
  city: { id: boolean; name: string };
  street: { id: boolean; name: string };
  apartment: string;
  intercom: string;
  entrance: string;
  floor: string;
  full_address: string;
}

interface IAddressState {
  isAddressOpen: boolean;
  type: string;
  mapData: any[];
  cities: any[];
  pochtaMapData: ISuggestionFeature[];
  pochtaCities: ICity[];
  selectedCityCode: number;
  cdekToken: string | null;
  address: IAddress;
}

interface ISuggestionFeature {
  geometry: {
    coordinates: number[];
    type: string;
  };
  id: string;
  properties: {
    balloonContentBody: string;
    balloonContentFooter: string;
    balloonContentHeader: string;
  };
  type: string;
  work_time_list: WorkTime[];
  address: string;
  city_code: string;
}

interface WorkTime {
  day: number;
  time: string;
}

interface ICity {
  id: string;
  name: string;
  coordinates: number[];
  code: string;
}

interface ISuggestion {
  data: {
    geo_lat: number;
    geo_lon: number;
    postal_code: string;
    address_str: string;
    schedule_mon: string;
    schedule_tue: string;
    schedule_wed: string;
    schedule_thu: string;
    schedule_fri: string;
    schedule_sat: string;
    schedule_sun: string;
    address_kladr_id: string;
  };
  value: string;
}

const initialState: IAddressState = {
  isAddressOpen: false,
  type: "courier",
  mapData: [],
  cities: [],
  pochtaMapData: [],
  pochtaCities: [],
  selectedCityCode: 441,
  cdekToken: null,
  address: {
    city: { id: false, name: "" },
    street: { id: false, name: "" },
    apartment: "",
    intercom: "",
    entrance: "",
    floor: "",
    full_address: "",
  },
};

interface IFetchAddressesArgs {
  city: string;
  code: string | number;
}

const api_key = "677d53bc2930feca03704fee6c3f9d7bd3395461";

export const fetchAddresses = createAsyncThunk<
  ISuggestion[],
  IFetchAddressesArgs,
  { rejectValue: any }
>("address/fetchAddresses", async ({ city, code }, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/postal_unit",
      {
        query: city,
        filters: [
          {
            address_kladr_id: code,
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${api_key}`,
        },
      }
    );
    return data.suggestions || [];
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const fetchAddressesList = createAsyncThunk<
  ISuggestion[],
  string,
  { rejectValue: any }
>("address/fetchAddressesList", async (city, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/postal_unit",
      {
        query: city,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${api_key}`,
        },
      }
    );
    return data.suggestions || [];
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    setIsAddressOpen: (state, { payload }) => {
      state.isAddressOpen = payload;
    },
    setType: (state, { payload }) => {
      state.type = payload;
    },
    setMapData: (state, { payload }) => {
      state.mapData = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = { ...state.address, ...payload };
    },
    setCities: (state, { payload }) => {
      state.cities = payload;
    },
    setSelectedCityCode: (state, { payload }) => {
      state.selectedCityCode = payload;
    },
    setCdekToken: (state, { payload }) => {
      state.cdekToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.fulfilled, (state, { payload }) => {
        state.pochtaMapData = payload.map((suggestion, index) => ({
          geometry: {
            coordinates: [suggestion.data.geo_lat, suggestion.data.geo_lon],
            type: "Point",
          },
          id: suggestion.value + index.toString(),
          properties: {
            balloonContentBody: `${suggestion.data.postal_code}, ${suggestion.data.address_str}`,
            balloonContentFooter: suggestion.data.address_str,
            balloonContentHeader: suggestion.data.address_str,
          },
          type: "Feature",
          work_time_list: [
            { day: 1, time: suggestion.data.schedule_mon },
            { day: 2, time: suggestion.data.schedule_tue },
            { day: 3, time: suggestion.data.schedule_wed },
            { day: 4, time: suggestion.data.schedule_thu },
            { day: 5, time: suggestion.data.schedule_fri },
            { day: 6, time: suggestion.data.schedule_sat },
            { day: 7, time: suggestion.data.schedule_sun },
          ],
          address: suggestion.data.address_str,
          city_code: suggestion.data.address_kladr_id,
        }));
      })

      .addCase(fetchAddressesList.fulfilled, (state, { payload }) => {
        state.pochtaCities = payload.map((suggestion, index) => ({
          id: suggestion.data.postal_code + index.toString(),
          name: suggestion.data.address_str,
          coordinates: [suggestion.data.geo_lat, suggestion.data.geo_lon],
          code: suggestion.data.address_kladr_id,
        }));
      });
  },
});

export const {
  setIsAddressOpen,
  setType,
  setMapData,
  setAddress,
  setCities,
  setSelectedCityCode,
  setCdekToken,
} = addressSlice.actions;
export default addressSlice.reducer;
