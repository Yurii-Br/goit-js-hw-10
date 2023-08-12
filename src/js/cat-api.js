'use strict'

import axios from "axios";
axios.defaults.headers.common["x-api-key"] = "live_Pg1SMlRkPUyTAJW6pHj4rK1JIju9XYPMfc5cWkpI4dUYtj7g5Y9l82Ndf6uFaGid";

export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error fetching breeds');
        }
        return response.json();
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  export function fetchCatByBreed(breedId) {
    return fetch(`https://api.thecatapi.com/v1/images/search?breed_id=${breedId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error fetching cat data');
        }
        console.log(response);
        return response.json();
        
      })
      .then((data) => {
        if (data && data.length > 0) {
          return data;
        } else {
          throw new Error('No cat data available');
        }
      })
      .catch((error) => {
        console.error('Error fetching cat data:', error);
        throw error; 
      });
  } 