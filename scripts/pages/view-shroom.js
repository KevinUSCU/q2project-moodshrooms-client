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

// Button Listeners
const share = document.querySelector('#share')
const edit = document.querySelector('#edit')
const del = document.querySelector('#delete')
share.addEventListener('click', () => {})
edit.addEventListener('click', () => window.location=`edit.html#/shroom/${shroomId}`)
del.addEventListener('click', () => deleteShroom(shroomId))

function resizeShroomContainer() {
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight
  let width = winHeight / 1.6
  container.style.width = `${width}px`
}