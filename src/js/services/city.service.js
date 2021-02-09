import axios from '../plugins/axios';

export async function getCities(countryCode) {
    try {
      const response = await axios.get(`/location/get-cities/${countryCode}`);
      // console.log(response);
      return response;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }