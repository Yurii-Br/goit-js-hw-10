'use strict'
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';


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
           
            const selectedBreedId = info[0].value;
            
            if (selectedBreedId) {
              fetchCatByBreed(selectedBreedId)
                .then((catData) => {
                  
                  
                    const breedInfo = catData[0].breeds[0];
                    const catInfoHtml = `
                     <img src="${catData[0].url}" alt="Cat" width = "600">
                     <div class = "wrap"> <h2>${breedInfo.name}</h2>
                      <p>Description: ${breedInfo.description}</p>
                      <p>Temperament: ${breedInfo.temperament}</p></div>
                    `;
                    box.innerHTML = catInfoHtml;
                  
                })
                .catch((error) => {
                  Notiflix.Notify.failure('Error fetching cat data !');
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
