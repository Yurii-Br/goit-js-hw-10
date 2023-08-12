'use strict'

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

const box = document.querySelector('.cat-info');
const selectBox = document.querySelector('.breed-select');


function displayBreeds() {
  fetchBreeds()
    .then((breeds) => {
      const select = new SlimSelect({
        select: '#single',
        data: breeds.map((breed) => ({
          value: breed.id,
          text: breed.name
        })),
        events: {
          afterChange: (info) => {
            console.log(info);
            const selectedBreedId = info[0].value;
            console.log(selectedBreedId);
            if (selectedBreedId) {
              fetchCatByBreed(selectedBreedId)
                .then((catData) => {
                  console.log('catData',catData)
                  const catInfoHtml = `
      <img src="${catData.url}" alt="Cat">
      <h2>${info[0].text}</h2>
      <p>Description: ${info[0].breeds.description}</p>
      <p>Temperament: ${info[0].breeds.temperament}</p>
    `;
                  box.innerHTML = catInfoHtml;
                })
                .catch((error) => {
                  console.error('Error fetching cat data:', error);
                });
            }
          }
        }
      });
    })
    .catch((error) => {
      console.error('Error fetching breeds:', error);
    });
}

displayBreeds();