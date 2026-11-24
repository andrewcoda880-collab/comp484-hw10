$(function () { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.

  // Called function to update the name, happiness, and weight of our pet in our HTML
  checkAndUpdatePetInfoInHtml();

  // When each button is clicked, it will "call" function for that button (functions are below)
  $('.treat-button').click(clickedTreatButton);
  $('.play-button').click(clickedPlayButton);
  $('.exercise-button').click(clickedExerciseButton);
  $('.sleep-button').click(clickedSleepButton);
  $('.pet-button').click(clickedPetButton);
  $('.table-button').click(clickedTableButton);
  $('.group-stats-button').click(clickedStatsButton);
  $('.special-button').click(clickedSpecialButton);
  $('.type-error-button').click(clickedTypeErrorButton);
  $('.violation-button').click(clickedViolationButton);
  $('.invalid-image-button').click(clickedInvalidImageButton);
  $('.cause-error-button').click(clickedCauseErrorButton);


})

// Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
var pet_info = { name: "Pikachu", weight: 50, happiness: 60, energy: 100, image: "images/pikachu.png", message: "Hi there!" };

function clickedCauseErrorButton() {
  console.error('You clicked the error button!');
}
function clickedInvalidImageButton() {
  const badImage = "/img/nothere";
  pet_info.image = badImage;
  updatePetInfoInHtml();
  console.error('Image cannot be found!');
}

function clickedViolationButton() {
  const duration = 3000;
  const start = new Date().getTime();
  while (new Date().getTime() < start + duration) {
    // Block the main thread for 3 seconds.
  }
}

function clickedTypeErrorButton() {
  const user = null;
  console.log(user.name);
}

function clickedTableButton() {
  console.table(pet_info);
}

function clickedStatsButton() {
  console.group();
  console.log('happiness: ' + pet_info.happiness);
  console.log('weight: ' + pet_info.weight);
  console.log('energy: ' + pet_info.energy);
  console.groupEnd();
}

function clickedSpecialButton() {
  const spacing = '5px';
  const styles = 
        `padding: ${spacing}; 
        background-color: darkblue; color: white;
        font-size: 2em;`;
  console.log('%chi! ', styles);
}

function clickedTreatButton() {
  // Increase pet happiness
  pet_info.happiness = pet_info.happiness + 5;
  // Increase pet weight
  pet_info.weight = pet_info.weight + 15;
  pet_info.image = "images/pikachu-eating.gif"
  pet_info.message = "Yum!"

  checkAndUpdatePetInfoInHtml();
  addTextToLog(pet_info.name + " ate some food. Weight: " + pet_info.weight + " ⬆");

  console.log('Pikachu was fed');
}

function clickedPlayButton() {
  pet_info.happiness = pet_info.happiness + 5;
  pet_info.weight = pet_info.weight - 5;
  pet_info.energy = pet_info.energy - 5;
  pet_info.image = "images/pikachu-chilling.gif";
  pet_info.message = ":D";
  checkAndUpdatePetInfoInHtml();
  addTextToLog(pet_info.name + " played. Happiness: " + pet_info.happiness + " ⬆");

  console.log('Pikachu played');
}

function clickedExerciseButton() {
  pet_info.happiness = pet_info.happiness - 10;
  pet_info.weight = pet_info.weight - 5;
  pet_info.energy = pet_info.energy - 5;
  pet_info.image = "images/pikachu-exercise.gif"
  pet_info.message = "no pain no gain";
  checkAndUpdatePetInfoInHtml();
  addTextToLog(pet_info.name + " exercised. Weight: " + pet_info.weight + " ⬆" + ", Energy: " + pet_info.energy + " ⬆");

  console.log('Pikachu exercised');
}

function clickedSleepButton() {
  pet_info.energy = 100;
  pet_info.image = "images/pikachu-sleeping.gif";
  pet_info.message = "Zzzzzzzz";
  checkAndUpdatePetInfoInHtml();
  addTextToLog(pet_info.name + " slept. Energy: " + pet_info.energy + " ⬆");

  console.log('Pikachu Slept');
}

function clickedPetButton() {
  // Read how much happiness petting gives from the button's data-boost attribute
  var boost = Number($('.pet-button').attr('data-boost'));
  pet_info.happiness = pet_info.happiness + boost;
  pet_info.message = "That feels nice!";
  checkAndUpdatePetInfoInHtml();
  addTextToLog(pet_info.name + " was petted. Happiness: " + pet_info.happiness + " ⬆");

  console.log('Pikachu was petted');
}

function checkAndUpdatePetInfoInHtml() {
  checkFieldsBeforeUpdating();
  updatePetInfoInHtml();
}

function checkFieldsBeforeUpdating() {
  // Add conditional if weight is lower than 1 or over 100.
  if (pet_info.weight <= 1) {
    pet_info.weight = 1;
    pet_info.image = "images/pikachu-hungry.gif";
    pet_info.message = "feed me bro";

    console.warn('Pikachu is having issues');
  }

  if (pet_info.weight >= 100) {
    pet_info.weight = 100;
    pet_info.image = "images/pikachu-fat.gif";
    pet_info.message = "stop feeding me bro";

    console.warn('Pikachu is having issues');
  }

  // Add conditional if happiness is lower than 1 or over 100.
  if (pet_info.happiness <= 1) {
    pet_info.happiness = 1;
    pet_info.image = "images/pikachu-crying.gif";
    pet_info.message = "Im so sad rn";

    console.warn('Pikachu is having issues');
  }

  if (pet_info.happiness >= 100) {
    pet_info.happiness = 100;
    //pet_info.image = "images/pikachu-happy.gif"
  }

  // Add conditional for energy level under/over 1/100
  if (pet_info.energy >= 100) {
    pet_info.energy = 100;

  }

  if (pet_info.energy <= 1) {
    pet_info.energy = 1;
    pet_info.image = "images/pikachu-sleeping-2.gif";
    pet_info.message = "please...let me sleep"

    console.warn('Pikachu is having issues');
  }
}

// Updates your HTML with the current values in your pet_info object
function updatePetInfoInHtml() {
  $('.name').text(pet_info['name']);
  $('.weight').text(pet_info['weight']);
  $('.happiness').text(pet_info['happiness']);
  $('.energy').text(pet_info['energy']);
  $('.pet-image').attr('src', pet_info.image);
  $('.pet-message').text(pet_info['message']);

  

  // checks if the pet has energy left. If not, uses toggle() to remove the play and exercise buttons
  var hasEnergy = pet_info.energy > 1;
  var notHungry = pet_info.weight > 1;
  var notSad = pet_info.happiness > 1;

  // Play lowers weight and energy (but raises happiness)
  $('.play-button').toggle(hasEnergy && notHungry);
  // Exercise lowers weight, energy, and happiness
  $('.exercise-button').toggle(hasEnergy && notHungry && notSad);
}


function addTextToLog(text) {
  $('.activity-log').append('<li>' + text + '</li>');
}
