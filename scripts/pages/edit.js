// DOM References
const name = document.querySelector('#name')
const cap = document.querySelector('#cap')
const base = document.querySelector('#base')
const mouth = document.querySelector('#mouth')
const eyes = document.querySelector('#eyes')
const eyeballs = document.querySelector('#eyeballs')
const eyebrows = document.querySelector('#eyebrows')
const flourish = document.querySelector('#flourish')
const color1 = document.querySelector('#color1')
const color2 = document.querySelector('#color2')
const preview = document.querySelector('.shroom-preview')
const form = document.querySelector('#create-shroom-form')
const messageBox = document.querySelector('#submit-message')

// Get shroom to edit
const shroomId = getShroomIdFromURL()
// If no id is present, redirect to create page
if (!shroomId) window.location='create.html'

// Populate Form Menus then load shroom from database and preview
const promises = [
  populateFormMenus(),
  getShroomFromDB(shroomId)
]
Promise.all(promises)
.then(result => {
  const shroomToEdit = result[1]
  name.value = shroomToEdit.name
  cap.value = shroomToEdit.cap
  base.value = shroomToEdit.base
  mouth.value = shroomToEdit.mouth
  eyes.value = shroomToEdit.eyes
  eyeballs.value = shroomToEdit.eyeballs
  eyebrows.value = shroomToEdit.eyebrows
  flourish.value = shroomToEdit.flourish
  color1.value = shroomToEdit.cap_color_1
  color2.value = shroomToEdit.cap_color_2
  displayPreview()
  // Check user to see if they own this shroom
  if (shroomUser.id !== shroomToEdit.owner_id) {
    // display error instead of update button
    messageBox.innerHTML = `
    <div class="alert alert-danger" role="alert">
      This is not your moodshroom; you may experiment, but you can't save!
    </div>
  `
  }
})
.catch(error => window.location='create.html')

// Update shroom preview on form change
form.addEventListener('change', displayPreview)
// Form submit listener
form.addEventListener('submit', event => {
  event.preventDefault()
  editShroom()
})

function editShroom() {
  // Collect data
  const editedShroom = {
    owner_id: shroomUser.id,
    name: name.value,
    cap: cap.value,
    base: base.value,
    mouth: mouth.value,
    eyes: eyes.value,
    eyeballs: eyeballs.value,
    eyebrows: eyebrows.value,
    flourish: flourish.value,
    cap_color_1: color1.value,
    cap_color_2: color2.value
  }
  // Post
  axios.put(`${baseURL}/shrooms/${shroomId}`, editedShroom)
  .then(result => {
    // display success
    messageBox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Moodshroom modified!
      </div>
    `
    // wait 1 second then go to shroom view page
    setTimeout(() => window.location=`shroom.html#/shroom/${shroomId}`, 1000)
  })
}