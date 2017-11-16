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