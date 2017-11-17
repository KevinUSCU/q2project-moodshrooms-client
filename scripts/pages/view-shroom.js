const shroomId = getShroomIdFromURL()
const container = document.querySelector('#shroom-view')
const messageBox = document.querySelector('#messagebox')

// Button Listeners
const share = document.querySelector('#share')
const edit = document.querySelector('#edit')
const del = document.querySelector('#delete')
share.addEventListener('click', () => shareWithAllUsers(shroomId))
edit.addEventListener('click', () => window.location=`edit.html#/shroom/${shroomId}`)
del.addEventListener('click', () => {
  deleteShroom(shroomId)
  .then(result => {
    // display success
    messageBox.innerHTML = `
      <div class="alert alert-info" role="alert">
        Moodshroom squashed!
      </div>
    `
    // wait 1 second then go to myshrooms page
    setTimeout(() => window.location=`view-myshrooms.html`, 1000)
  })
})

// Set shroom card image size
resizeShroomContainer() // on page load
window.onresize = resizeShroomContainer //on window resize

// Load shroom
getShroomFromDB(shroomId)
.then(shroom => {
  attachParts(shroom)
  .then(result => {
    container.innerHTML = makeShroomCard(result)
    if (shroomUser.id !== shroom.owner_id) { 
      // Add badge
      const shroomCard = document.querySelector('.shroom-card')
      const badge = makeSharedBadge()
      shroomCard.appendChild(badge)
    } else {
      // Enable share and delete buttons
      share.style.display = 'block'
      del.style.display = 'block'
    }
  })
})

function resizeShroomContainer() {
  const navbar = document.querySelector('.navbar')
  let winHeight = window.innerHeight - navbar.clientHeight
  let width = winHeight / 1.6
  container.style.width = `${width}px`
}