// DOG CEO Refactored

// create logic in separate functions and invoke those functions as callback to 'DOMContentLoaded' listener on the document object

console.log(`%c Welcome to the DOGG HOUZE`, `color:firebrick`)


document.addEventListener('DOMContentLoaded', () => {
  //Global Variables
  let allBreeds = [];
  const imageURL = "https://dog.ceo/api/breeds/image/random/5";
  const breedURL = "https://dog.ceo/api/breeds/list/all";
  // Elements
  const breedUL = document.querySelector("#dog-breeds")
  const breedDropdown = document.querySelector("#breed-dropdown")
  const dogImageContainer = document.querySelector("#dog-image-container");
  // Function invocations
  fetchDogImg();
  fetchDogBreeds();
  changeBreedLiColor();
  filterBreed();

  // ******************FUNCTIONS********************
  // fetchDogImg
  // Makes a fetch to the correct URL
  // Parses the response as json
  // Parses the JSON, and extracts the image urls as strings from the .message attribute and saves them as an array of image tags with src as the urls in dogImgStringURL
  // sets the dogImageContainer.innerHTML equal to that array and removes the commas

  function fetchDogImg() {
    //fetch & parse resources
    fetch(imageURL)
      .then(r => {
        console.log(r)
        if (r.ok) {
          return r.json();
        }
      })
      .then(dogImgData => {
        console.log(dogImgData)
        const dogImgStringURL = dogImgData.message.map((url) => `<img src="${url}">`);
        dogImageContainer.innerHTML = dogImgStringURL.join('')
      })
  }

  //fetchDogBreeds
  // Makes a fetch to the correct URL
  // Parses response as JSON
  // Parses the JSON, and extracts the dog breeds. Dog breeds are nested as keys under the messages attribute (which is an object) i.e. json=>parsed.message=>message.keys => return as array
  // Sets the innerHTML of breedUL to the array of dog breeds
  // .join('') to get rid of commas
  function fetchDogBreeds() {
    //fetch & parse resources
    fetch(breedURL)
      .then(r => {
        console.log(r)
        if (r.ok) {
          return r.json();
        }
      })
      .then(parsedBreedData => {
        console.log(parsedBreedData);
        // parsedBreedData is a an object with two keys status and message, message is an object with  breed names stored as object keys => parsedBreedData.message
        // Object.keys(object.)
        allBreeds = Object.keys(parsedBreedData.message);
        console.table(allBreeds);
        breedUL.innerHTML = allBreeds.map(function (breed) {
          return `<li>${breed}</li>`
        }).join('');
      })
  }

  // Using event.target /delegation we can have the child li elements inherit the event listener callback on click i.e. change color
  function changeBreedLiColor() {
    breedUL.addEventListener('click', function (e) {
      event.target.style.color = getRandomRGB();
    })
  }

  //filterBreed
  // attach 'change' event listener to breedDropdown - When the user commits the change explicitly (e.g. by selecting a value from a <select>'s dropdown with a mouse click

  function filterBreed() {
    breedDropdown.addEventListener('change', function (e) {
      const selectedLetter = event.target.value;
      const filteredBreeds = allBreeds.filter(function (breed) {
        return breed[0] === (selectedLetter);
      })
      breedUL.innerHTML = filteredBreeds.map(function (breed) {
        return `<li>${breed}</li>`
      }).join('')
    })
  }
}) // end of document.DOMContentLoad


// *******************HELPER FUNCTIONS*********************************

// getRandomRGB - Self Explanatory 
function getRandomRGB() {
  let rgbCharacters = '0123456789ABCDEF';
  let rgbColor = '#';
  for (let i = 0; i < 6; i++) {
    rgbColor += rgbCharacters[Math.floor(Math.random() * 16)];
  }
  return rgbColor;
}