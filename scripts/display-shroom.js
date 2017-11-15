function makeShroomCard(id) {
  return axios.get(`${baseURL}/shrooms/${id}`)
    .then(shroom => {
      const { name, cap, base, mouth, eyes, eyeballs, eyebrows, flourish, cap_color_1, cap_color_2 } = shroom.data
      // Check for no cap color, single cap color, or gradient cap color
      if (cap_color_1 && cap_color_2) color = `linear-gradient(${cap_color_1}, ${cap_color_2})`
      else if (cap_color_1) color = cap_color_1
      else color = '#ffffff'
      // Create card element
      return `
        <div id=${id} class="shroom-card card border-secondary">  
          <img class="card-img-top" src="${cap}" style="background: ${color}">
          <img class="card-img-top" src="${base}" style="position: absolute">
          <img class="card-img-top" src="${mouth}" style="position: absolute">
          <img class="card-img-top" src="${eyes}" style="position: absolute">
          <img class="card-img-top" src="${eyeballs}" style="position: absolute">
          <img class="card-img-top" src="${flourish}" style="position: absolute">
          <img class="card-img-top" src="${eyebrows}" style="position: absolute">
          <div class="card-body bg-secondary text-white">
            <h4 class="card-title text-center">${name}</h4>
          </div>
        </div>
      `
    })
}
