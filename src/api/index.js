import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://covid19.mathdro.id/api";

//const BASE_URL = "https://covid19.mathdro.id/api";
const BASE_URL_2nd = "https://api.covid19api.com";

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    //!Forth Way and the best way
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };

    //console.log(response);
  } catch (err) {
    console.log(err);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
    //console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const fetchCountries = async () => {
  try {
    const {
      data: { countries },
    } = await axios.get(`${url}/countries`);
    //console.log(response);
    return countries.map((country) => country.name);
  } catch (err) {
    console.log(err);
  }
};

//Global-Summary
/*export const fetchGlobalSummaryData = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL_2nd}/summary`);
    return data;
    //console.log(data);
  } catch (err) {
    return err.data;
  }
};*/

//Global-Summary
export const fetchGlobalSummaryData = createAsyncThunk(
  "global-summary/fetchGlobalSummaryData",
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL_2nd}/summary`);
      return response.data;
    } catch (error) {
      return error.data;
    }
  }
);

/*
    
    !One Way
    const data = await axios.get(url);
    console.log(data);

    !Second Way
    const { data } = await axios.get(url);    

    const modifiedData = {
      confirmed: data.confirmed,
      recovered: data.recovered,
      deaths: data.deaths,
      lastUpdate: data.lastUpdate,
    };

    console.log(modifiedData);

    !Third Way
    const {
        data: { confirmed, recovered, deaths, lastUpdate },
      } = await axios.get(url);    
  
      const modifiedData = {
        confirmed,
        recovered,
        deaths,
        lastUpdate,
      };
    */
