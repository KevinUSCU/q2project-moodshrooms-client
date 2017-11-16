const userId = shroomUser.id
const container = document.querySelector('#shroom-bento')

// Get shrooms owned by user



// Get shrooms shared with user and add badge

const getShroomsPromises = [
  getShroomsOwnedByUser(2),
  getShroomsSharedWithUser(2)
]
Promise.all(getShroomsPromises)
.then(result => {
  const allShrooms = result[0].concat(result[1])
  const attachPartsPromises = allShrooms.map(shroom => attachParts(shroom))
  Promise.all(attachPartsPromises)
  .then(result => {
    console.log(result)
  })
})