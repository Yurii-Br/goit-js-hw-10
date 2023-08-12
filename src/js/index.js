'use strict'

import { fetchBreeds } from './cat-api.js';
import { fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';

const box = document.querySelector('.cat-info');
const selectBox = document.querySelector('.breed-select');


function displayBreeds() {
    fetchBreeds()
      .then((breads) => {
        const html = breads.map((el) => {
          return `<option value="${el.id}" id="${el.id}">${el.name}</option>`;
        }).join('');
        selectBox.insertAdjacentHTML("afterbegin", html);
        const select = new SlimSelect({
          select: '#single',
          events: {
            afterChange: (info) => {
              console.log(info);
              const selectedBreed = info[0].id;
              console.log(selectedBreed);
              if (selectedBreed) {
                
                fetchCatByBreed(selectedBreed)
                  .then((catData) => {
                    
                      const catInfoHtml = `
                        <img src="${catData[0].url}" alt="Cat">
                        <h2>${catData[0].name}</h2>
                        <p>Description: ${catData[0].description}</p>
                        <p>Temperament: ${catData[0].temperament}</p>
                      `;
                      box.innerHTML = catInfoHtml;
                    }
                  )
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