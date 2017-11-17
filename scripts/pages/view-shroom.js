const shroomId = getShroomIdFromURL()
const container = document.querySelector('#shroom-view')

// Set shroom card image size
resizeShroomContainer() // on page load
window.onresize = resizeShroomContainer //on window resize

// Load shroom
getShroomFromDB(shroomId)
.then(shroom => {
  attachParts(shroom)
  .then(result => {
    container.innerHTML = makeShroomCard(result)
    if (shroomId !== shroom.owner_id) { //add badge
      const shroomCard = document.querySelector('.shroom-card')
      const badge = makeSharedBadge()
      shroomCard.appendChild(badge)
    }
  })
})

function resizeShroomContainer() {
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight
  let width = winHeight / 1.6
  container.style.width = `${width}px`
}