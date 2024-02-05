const images = document.getElementsByClassName('imageFilter');
const form = document.getElementById('filters');
const animalRadios = document.getElementsByName('animalType');
const search = document.getElementById('search');
let selectedAnimal = 'all';

const shouldShowImage = (image) => {
  if (selectedAnimal !== 'all' && selectedAnimal !== image.getAttribute('animal')) {
    return false;
  }

  if (!search.value) {
    return true;
  }

  return image.alt.toLowerCase().includes(search.value.toLowerCase());
}

const filterAnimals = () => {
  for (const image of images) {
    if (shouldShowImage(image)) {
      image.classList.remove('hidden');
    }
    else {
      image.classList.add('hidden');
    }
  }  
}

updateSummary = () => {
	// This is getting the label of the select radio button
  const filterLabel = form.querySelector(`label[for=${selectedAnimal}]`).textContent;
  // checking if there is text in the search input
	const searchTitle = search.value ? 
	`Showing animals that match the filter "${filterLabel}" and the search "${search.value}".` : 
	`Showing animals that match the filter "${filterLabel}".`

	document.getElementById('summary').innerHTML = searchTitle
}

updateSummary()

update = () => {
  selectedAnimal = document.querySelector('input[name="animalType"]:checked').value;
  filterAnimals();
	updateSummary()
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
});

for (const animalRadio of animalRadios) {
  animalRadio.addEventListener('change', update);
}

search.addEventListener('keyup', update);