function getShroomFromDB(id) {
  return axios.get(`${baseURL}/shrooms/${id}`)
    .then(shroom => shroom.data)
}

function getShroomFromForm() {
  // Get data from form, then populate part image paths from database
  const promises = [
    axios.get(`${baseURL}/parts/${cap.value}`),
    axios.get(`${baseURL}/parts/${base.value}`),
    axios.get(`${baseURL}/parts/${mouth.value}`),
    axios.get(`${baseURL}/parts/${eyes.value}`),
    axios.get(`${baseURL}/parts/${eyeballs.value}`),
    axios.get(`${baseURL}/parts/${eyebrows.value}`),
    axios.get(`${baseURL}/parts/${flourish.value}`)
  ]
  return Promise.all(promises)
  .then(result => {
    const shroom = {
      name: name.value,
      cap: result[0].data.path,
      base: result[1].data.path,
      mouth: result[2].data.path,
      eyes: result[3].data.path,
      eyeballs: result[4].data.path,
      eyebrows: result[5].data.path,
      flourish: result[6].data.path,
      cap_color_1: color1.value,
      cap_color_2: color2.value
    }
    return shroom
  })
}

function makeShroomCard(shroom) {
  const { name, cap, base, mouth, eyes, eyeballs, eyebrows, flourish, cap_color_1, cap_color_2 } = shroom
  // Check for no cap color, single cap color, or gradient cap color
  if (cap_color_1 && cap_color_2) color = `linear-gradient(${cap_color_1}, ${cap_color_2})`
  else if (cap_color_1) color = cap_color_1
  else color = '#ffffff'
  // Create card element
  let shroomCard = ''
  // If shroom has an id (from database) add it as id tag
  if (shroom.id) shroomCard += `<div id=${shroom.id} class="shroom-card card border-secondary">`
  else shroomCard += `<div class="shroom-card card border-secondary">`
  // Add rest of template
  shroomCard += `
      <img class="card-img-top" src="${cap}" style="background: ${color}">
      <img class="card-img-top" src="${base}" style="position: absolute">
      <img class="card-img-top" src="${mouth}" style="position: absolute">
      <img class="card-img-top" src="${eyes}" style="position: absolute">
      <img class="card-img-top" src="${eyeballs}" style="position: absolute">
      <img class="card-img-top" src="${flourish}" style="position: absolute">
      <img class="card-img-top" src="${eyebrows}" style="position: absolute">
      <div class="card-body bg-secondary text-white">
        <h4 class="card-title text-center" style="margin: 0;">${name}</h4>
      </div>
    </div>
  `
  return shroomCard
}
