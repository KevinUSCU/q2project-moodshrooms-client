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

// Populate Form Menus
populateFormMenus()
// Load initial preview image
.then(() => displayPreview())
// Update shroom preview on form change
form.addEventListener('change', () => displayPreview())

// Functions
function displayPreview() {
  getShroomFromForm()
  .then(shroom => {
    let shroomCard = makeShroomCard(shroom)
    preview.innerHTML = shroomCard
  })
}

function populateFormMenus() {
  // Get parts from database
  return axios.get(`${baseURL}/parts`)
  .then(result => {
    const parts = result.data
    parts.forEach(part => {
      let selection = document.createElement('option')
      selection.value = part.id
      selection.innerText = part.description
      switch(part.type) {
        case 'cap':
          cap.appendChild(selection)
          break
        case 'base':
          base.appendChild(selection)
          break
        case 'mouth':
          mouth.appendChild(selection)
          break
        case 'eyes':
          eyes.appendChild(selection)
          break
        case 'eyeballs':
          eyeballs.appendChild(selection)
          break
        case 'eyebrows':
          eyebrows.appendChild(selection)
          break
        case 'flourish':
          flourish.appendChild(selection)
          break
      }  
    })
  })
}
