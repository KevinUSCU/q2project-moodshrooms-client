const shroomId = getShroomIdFromURL()
const container = document.querySelector('#shroom-view')

// Set shroom card image size
resizeLargeShroomContainer() // on page load
window.onresize = resizeLargeShroomContainer //on window resize

// Load shroom
getShroomFromDB(shroomId)
.then(shroom => {
  attachParts(shroom)
  .then(result => {
    container.innerHTML = makeShroomCard(result)
  })
})

function resizeLargeShroomContainer() {
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight
  let width = winHeight / 1.6
  container.style.width = `${width}px`
}