function makeShroomCard(shroom) {
  const { name, cap, base, mouth, eyes, eyeballs, eyebrows, flourish, cap_color_1, cap_color_2 } = shroom
  color = `linear-gradient(${cap_color_1}, ${cap_color_2})`
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
      <div class="card-header bg-secondary text-white text-center">${name}</div>
    </div>
  `
  return shroomCard
}
