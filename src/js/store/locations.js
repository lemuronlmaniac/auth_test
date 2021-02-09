import { getCountries } from '../services/country.service.js';
import { getCities } from '../services/city.service.js';

class Locations {
    constructor() { 
      this.countryApi = { countries : getCountries }
      this.cityApi = { cities : getCities }
      this.cities = null;
      this.countries = null;
    }
    async init() {
      const response = await Promise.all([
        this.countryApi.countries(),
       ]);
      
       this.countries = this.serializeCountries(response);
       this.shortCountries = this.createShortCountries(this.countries);
      return response;
    }
  
    serializeCountries(countries) {
      let countriesMas = [];
      for (let val of Object.entries(countries[0])){
        countriesMas.push({index: val[0], name: val[1]});
      }
       return countriesMas.reduce((acc, country) => {
        acc[country.name] = country;
        return acc;
      }, {});
    }

    createShortCountries(countries) {
      return Object.values(countries).reduce((acc, {index, name}) => {
        // console.log(name);
        acc[name] = null;
        return acc;
      }, {});
    }

    async initCities(country_name) {
      const response = await this.cityApi.cities(this.countries[country_name].index); 
      // console.log(response);
      this.cities = this.serializeCities(response);
      this.shortCities = this.createShortCities(this.cities);
      return response;
    }

    serializeCities(cities) {
      let i = 0;
      let citiesMas = [];
      // console.log(countries);
      for (let val of Object.values(cities)){
        citiesMas.push(val);
      }
      return citiesMas.reduce((acc, city) => {
        acc[i++] = city;
        return acc;
      }, {});
    }
    
    createShortCities(cities) {
      return Object.entries(cities).reduce((acc, [, city]) => {
        acc[city] = null;
        return acc;
      }, {});
    }
  }
  
  const locations = new Locations(); // {countryApi, cityApi}, { formateDate }
  
  export default locations;