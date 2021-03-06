function getShroomFromDB(id) {
  return axios.get(`${baseURL}/shrooms/${id}`)
  .then(shroom => shroom.data)
}

function getShroomsOwnedByUser(userId) {
  return axios.get(`${baseURL}/shrooms?owner=${userId}`)
  .then(shrooms => shrooms.data)
}

function getShroomsSharedWithUser(userId) {
  return axios.get(`${baseURL}/shrooms?shared=${userId}`)
  .then(shrooms => shrooms.data)
}

function getShroomFromForm() {
  return {
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
}

function attachParts(shroom) {
  const promises = [
    axios.get(`${baseURL}/parts/${shroom.cap}`),
    axios.get(`${baseURL}/parts/${shroom.base}`),
    axios.get(`${baseURL}/parts/${shroom.mouth}`),
    axios.get(`${baseURL}/parts/${shroom.eyes}`),
    axios.get(`${baseURL}/parts/${shroom.eyeballs}`),
    axios.get(`${baseURL}/parts/${shroom.eyebrows}`),
    axios.get(`${baseURL}/parts/${shroom.flourish}`)
  ]
  return Promise.all(promises)
  .then(result => {
    mergedShroom = {
      id: shroom.id,
      user_id: shroom.user_id, // these values are needed for displaying myshrooms
      owner_id: shroom.owner_id, // these values are needed for displaying myshrooms
      name: shroom.name,
      cap: result[0].data.path,
      base: result[1].data.path,
      mouth: result[2].data.path,
      eyes: result[3].data.path,
      eyeballs: result[4].data.path,
      eyebrows: result[5].data.path,
      flourish: result[6].data.path,
      cap_color_1: shroom.cap_color_1,
      cap_color_2: shroom.cap_color_2,
      updated_at: shroom.updated_at
    }
    return mergedShroom
  })
}

function displayPreview() {
  attachParts(getShroomFromForm())
  .then(shroom => {
    let shroomCard = makeShroomCard(shroom)
    preview.innerHTML = shroomCard
  })
}

function getShroomIdFromURL() {
  return window.location.hash.replace('#/shroom/', '')
}

function deleteShroom(id) {
  return axios.delete(`${baseURL}/shrooms/${id}`)
}