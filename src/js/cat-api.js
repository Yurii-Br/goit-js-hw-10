'use strict'

import axios from 'axios';
import Notiflix from 'notiflix';


const apiKey = 'live_Pg1SMlRkPUyTAJW6pHj4rK1JIju9XYPMfc5cWkpI4dUYtj7g5Y9l82Ndf6uFaGid';
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios.get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      
      if (response.status !== 200) {
        throw new Error('Error fetching breeds');
      }
      return response.data;
    })
    .catch(error => {
      console.error(error);
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!',{
        position: 'center-center',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  width: '400px',
  borderRadius: '10px',
  rtl: false,
  backOverlay: true,
  backOverlayColor: 'rgba(0, 0, 0, 0.8)',
  messageFontSize: '24px',
  fontFamily: 'Quicksand',
  cssAnimation: true,
  cssAnimationDuration: 300,
  cssAnimationStyle: 'fade', 
  plainText: true,
  showOnlyTheLastOne: false,
  clickToClose: true,
  pauseOnHover: true,
      });
    });
}

export function fetchCatByBreed(breedId) {
  Notiflix.Loading.standard('Loading data, please wait...');
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
    headers: {
      'x-api-key': 'live_Pg1SMlRkPUyTAJW6pHj4rK1JIju9XYPMfc5cWkpI4dUYtj7g5Y9l82Ndf6uFaGid'
    }
  })
    .then(response => {
      
      if (response.status !== 200) {
        Notiflix.Notify.failure('Error fetching cat data');
        throw new Error('Error fetching cat data');
      }
      Notiflix.Loading.remove('Loading data, please wait...');
      return response.data;
    })
    .catch(error => {
      Notiflix.Notify.failure('Error fetching breeds');
      throw error;
    });
}
  