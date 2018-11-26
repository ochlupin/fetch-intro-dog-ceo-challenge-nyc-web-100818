console.log(`%c Sup dawg`, `color: cyan`);
console.log('%c Ready to get DAWGED?', 'color: cyan')

// Challenge 1 - ✅
// on page load - `DOMContentLoaded`
// fetch the images using the url above ⬆️
// parse the response as `JSON`
// add image elements to the DOM **for each **🤔 image in the array


// Challenge 2 - ✅
// on page load - 'DOMContentLoaded'
// fetch all the dog breeds using the url above ⬆️
// add the breeds to the page in an`<ul>`(take a look at the included`index.html`)

// Challenge 3 ✅
// Once all of the breeds are rendered in the`<ul>`, add javascript so that the font color of a particular`<li>` changes _on click_.This can be a color of your choosing.
// When the user clicks any of the dog breed list items, the color the text should change.

// Challenge 4 
// Once we are able to load _all_ of the dog breeds onto the page, add javascript so that the user can filter breeds that start with a particular letter using a dropdown.

// For example, if the user selects 'a' in the dropdown, only show the breeds with names that start with the letter a.For simplicity, the dropdown only includes the letters a - d.However, we can imagine expanding this to include the entire alphabet



document.addEventListener('DOMContentLoaded', function () {

  const imageURL = "https://dog.ceo/api/breeds/image/random/4"
  const breedURL = "https://dog.ceo/api/breeds/list/all"
  const dogImageContainer = document.querySelector("#dog-image-container");
  const breedContainer = document.querySelector("#dog-breeds");
  breedContainer.addEventListener('click', function (event) {
    event.target.style.color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
    // if (event.target.style.color === 'blue') {
    //   event.target.style.color = 'black';
    // } else {
    //   event.target.style.color = 'blue';
    // };
  });
  let allBreeds = [];

  // Challenge 1 
  fetch(imageURL, {
      method: 'GET'
    })
    .then(function (r) {
      console.log(r);
      if (r.ok) {
        return r.json();
      }
    })
    .then(function (dogImageData) {
      return dogImageData.message.forEach(function (imageURL) {
        dogImageContainer.innerHTML += `<img src ="${imageURL}">`
      });
    });

  //Challenge 2
  fetch(breedURL, {
      method: 'GET'
    })
    .then(function (r) {
      console.log(r);
      if (r.ok) {
        return r.json();
      }
    })
    .then(function (breedData) {
      //allBreeds is converted into a long array comma separated containing all the breeds.
      allBreeds = Object.keys(breedData.message);
      console.table(allBreeds);
      // breedContainer.innerHTML += `<li>${allBreeds}</li>` - UGLY 🤢
      breedContainer.innerHTML = createDogLis(allBreeds);
    });
});


//helper functions
function createDogLis(breedArray) {
  const dogLiArray = breedArray.map(function (breed) {
    return `<li>${breed}</li>`;
  });
  return dogLiArray.join('');
}

// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }