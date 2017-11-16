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

// Populate Form Menus then load initial preview image
populateFormMenus()
.then(() => {
  displayPreview()
  // Set shroom card image size
  resizeShroomCard() // on page load
})
// Update shroom preview on form change
form.addEventListener('change', displayPreview)
window.onresize = resizeShroomCard //on window resize
// Form submit listener
form.addEventListener('submit', event => {
  event.preventDefault()
  createShroom()
})

function createShroom() {
  // Collect data
  const newShroom = {
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
  axios.post(`${baseURL}/shrooms`, newShroom)
  .then(result => {
    // display success
    messageBox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Moodshroom spawned!
      </div>
    `
    // wait 1 second then go to shroom view page
    setTimeout(() => window.location=`view-shroom.html#/shroom/${result.data.id}`, 1000)
  })
}

function resizeShroomCard() {
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight
  let width = winHeight / 2
  preview.style.width = `${width}px`
}