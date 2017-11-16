const userId = shroomUser.id
const container = document.querySelector('#shroom-bento')

// Display all shrooms
const getShroomsPromises = [
  getShroomsOwnedByUser(1),
  getShroomsSharedWithUser(2)
]
Promise.all(getShroomsPromises)
.then(result => {
  const allShrooms = result[0].concat(result[1])
  const attachPartsPromises = allShrooms.map(shroom => attachParts(shroom))
  Promise.all(attachPartsPromises)
  .then(result => {
    const sortedShrooms = sortShroomsByDate(result)
    sortedShrooms.forEach(shroom => {
      let newCard = document.createElement('div')
      newCard.style = 'position: relative; display: inline-block; margin: auto; padding: 10px; width: 20%; min-width: 120px;'
      newCard.innerHTML = makeShroomCard(shroom)
      // Add badge to shrooms shared with user. These are those whose owner_id does not match the user.
      if (shroom.owner_id !== userId) {
        const badge = document.createElement('div')
        badge.classList = 'badge badge-pill badge-success'
        badge.style = 'position: absolute; top: 20px; right: 20px;'
        badge.innerText = 's'
        newCard.appendChild(badge)
      }
      container.appendChild(newCard)
      // Add click listener to go to view-shroom page
      newCard.addEventListener('click', () => window.location=`view-shroom.html#/shroom/${shroom.id}`)
    })
  })
})
